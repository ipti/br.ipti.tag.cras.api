import { PartialType } from '@nestjs/swagger';
import { CreateForwardingDto } from './create-forwarding.dto';

export class UpdateForwardingDto extends PartialType(CreateForwardingDto) {}
