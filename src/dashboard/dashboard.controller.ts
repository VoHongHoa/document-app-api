import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private service: DashboardService) {}
  @Get('/overview')
  async OverViewData() {
    return this.service.overViewData();
  }
}
