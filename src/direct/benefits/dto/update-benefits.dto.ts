import { PartialType } from '@nestjs/swagger';
import { CreateBenefitsDto } from './create-benefits.dto';

export class UpdateBenefitsDto extends PartialType(CreateBenefitsDto) {}
