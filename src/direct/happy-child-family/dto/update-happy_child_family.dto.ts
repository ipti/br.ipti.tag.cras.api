import { PartialType } from '@nestjs/swagger';
import { CreateFamilyOnHcDto } from './create-happy_child_family.dto';

export class UpdateFamilyOnHcDto extends PartialType(CreateFamilyOnHcDto) {}
