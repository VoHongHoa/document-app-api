import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceHistorySchema } from 'src/invoice-history/schemas/invoice-history.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { DocumentSchema } from 'src/document/schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'InvoiceHistory', schema: InvoiceHistorySchema },
      { name: 'User', schema: UserSchema },
      { name: 'Document', schema: DocumentSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
