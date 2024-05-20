import { PartialType } from '@nestjs/swagger';
import { CreateHappyChildFamilyDto } from './create-happy_child_family.dto';

export class UpdateFamilyBenefitsDto extends PartialType(CreateHappyChildFamilyDto) {}
