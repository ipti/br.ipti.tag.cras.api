import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import CRASRMAService from './shared/cras.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@ApiTags('CRASRMA')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export default class CRASRMAController {
  constructor(private readonly crasRMAService: CRASRMAService) {}

  @Get()
  @ApiQuery({ name: 'month', type: Number, required: true })
  @ApiQuery({ name: 'year', type: Number, required: true })
  async getCRASRMA(
    @Req() req: Request,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return await this.crasRMAService.getCRASRMA(month, year);
  }
}
