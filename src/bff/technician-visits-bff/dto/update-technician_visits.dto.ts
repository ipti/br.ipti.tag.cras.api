import { PartialType } from '@nestjs/swagger';
import { CreateTechnicianVisitsDto } from './create-technician_visits.dto';

export class UpdateTechnicianVisitsDto extends PartialType(CreateTechnicianVisitsDto) {}
