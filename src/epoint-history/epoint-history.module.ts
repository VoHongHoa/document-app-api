import { Module } from '@nestjs/common';
import { EpointHistoryController } from './epoint-history.controller';
import { EpointHistoryService } from './epoint-history.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EPointHistory,
  EPointHistorySchema,
} from './schemas/epoint-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EPointHistory.name, schema: EPointHistorySchema },
    ]),
  ],
  controllers: [EpointHistoryController],
  providers: [EpointHistoryService],
})
export class EpointHistoryModule {}
