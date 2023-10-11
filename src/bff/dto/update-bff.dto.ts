import { PartialType } from '@nestjs/swagger';
import { CreateUserIdentifyWithoutFamilyDto } from './create-bff.dto';

export class UpdateBffDto extends PartialType(CreateUserIdentifyWithoutFamilyDto) {}
