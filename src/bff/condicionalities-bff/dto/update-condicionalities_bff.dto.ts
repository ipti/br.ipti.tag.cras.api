import { PartialType } from '@nestjs/swagger';
import { CreateCondicionalitiesBffDto } from './create-condicionalities_bff.dto';

export class UpdateCondicionalitiesDto extends PartialType(CreateCondicionalitiesBffDto) {}
