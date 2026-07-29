import {
  Injectable,
  BadRequestException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient } from '@azure/storage-blob';
import { randomUUID } from 'crypto';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

@Injectable()
export class FileUploadBffService {
  private blobServiceClient: BlobServiceClient | null = null;
  private readonly containerName: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.containerName = this.config.get<string>(
      'AZURE_STORAGE_CONTAINER_NAME',
      'cras-uploads',
    );
    const connectionString = this.config.get<string>(
      'AZURE_STORAGE_CONNECTION_STRING',
    );
    if (connectionString) {
      try {
        this.blobServiceClient =
          BlobServiceClient.fromConnectionString(connectionString);
      } catch {
        console.warn(
          '[FileUpload] AZURE_STORAGE_CONNECTION_STRING inválida — upload de arquivos desativado.',
        );
      }
    } else {
      console.warn(
        '[FileUpload] AZURE_STORAGE_CONNECTION_STRING ausente — upload de arquivos desativado.',
      );
    }
  }

  private ensureAzure(): BlobServiceClient {
    if (!this.blobServiceClient) {
      throw new BadRequestException(
        'Serviço de armazenamento não configurado. Verifique AZURE_STORAGE_CONNECTION_STRING.',
      );
    }
    return this.blobServiceClient;
  }

  async uploadFile(file: Express.Multer.File, folder = 'logos') {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo não permitido. Use: ${ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 5 MB');
    }

    const ext = path.extname(file.originalname).toLowerCase() || '.png';
    const blobName = `${folder}/${randomUUID()}${ext}`;

    const containerClient = this.ensureAzure().getContainerClient(
      this.containerName,
    );
    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return this.prisma.file_upload.create({
      data: {
        blob_url: blockBlobClient.url,
        blob_name: blobName,
        original_name: file.originalname,
        mime_type: file.mimetype,
        size_bytes: file.size,
        container: this.containerName,
      },
    });
  }

  async getFile(id: number) {
    const record = await this.prisma.file_upload.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException('Arquivo não encontrado');
    }
    return record;
  }

  async streamFile(id: number, res: Response): Promise<StreamableFile> {
    const record = await this.prisma.file_upload.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Arquivo não encontrado');

    const containerClient = this.ensureAzure().getContainerClient(record.container);
    const blobClient = containerClient.getBlobClient(record.blob_name);
    const buffer = await blobClient.downloadToBuffer();

    res.setHeader('Content-Type', record.mime_type);
    res.setHeader('Cache-Control', 'private, max-age=3600');

    return new StreamableFile(buffer);
  }

  async deleteFile(id: number) {
    const record = await this.prisma.file_upload.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException('Arquivo não encontrado');
    }

    const containerClient = this.ensureAzure().getContainerClient(
      record.container,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(record.blob_name);
    await blockBlobClient.deleteIfExists();

    await this.prisma.file_upload.delete({ where: { id } });
    return { deleted: true };
  }
}
