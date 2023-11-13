import { PartialType } from '@nestjs/swagger';
import { CreateFamilyBenefitsDto } from './create-family_benefits.dto';

export class UpdateFamilyBenefitsDto extends PartialType(CreateFamilyBenefitsDto) {}
