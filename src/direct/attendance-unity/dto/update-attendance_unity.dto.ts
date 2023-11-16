import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceUnityDto } from './create-attendance_unity.dto';

export class UpdateAttendanceUnityDto extends PartialType(CreateAttendanceUnityDto) {}
