import { PartialType } from '@nestjs/swagger';
import { CreateCondicionalitiesBffDto } from './create-condicionalities_bff.dto';

export class UpdateCondicionalitiesBffDto extends PartialType(CreateCondicionalitiesBffDto) {}
