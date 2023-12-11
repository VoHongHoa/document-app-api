import { Module } from '@nestjs/common';
import { EpointHistoryController } from './epoint-history.controller';
import { EpointHistoryService } from './epoint-history.service';

@Module({
  controllers: [EpointHistoryController],
  providers: [EpointHistoryService]
})
export class EpointHistoryModule {}
