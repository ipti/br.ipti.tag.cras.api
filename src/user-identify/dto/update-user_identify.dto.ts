import { PartialType } from '@nestjs/swagger';
import { CreateUserIdentifyDto } from './create-user_identify.dto';

export class UpdateUserIdentifyDto extends PartialType(CreateUserIdentifyDto) {}
