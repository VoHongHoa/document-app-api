import { Controller, Get, UseGuards } from '@nestjs/common';
import { EpointHistoryService } from './epoint-history.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@UseGuards(JwtGuard)
@Controller('epoint-history')
export class EpointHistoryController {
  constructor(private service: EpointHistoryService) {}

  @Get()
  getUserEpointHistory(@GetUser() user: User) {
    return this.service.getUserEpoint(user);
  }
}
