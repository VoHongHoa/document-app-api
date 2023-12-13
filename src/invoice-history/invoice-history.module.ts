import { Module } from '@nestjs/common';
import { InvoiceHistoryService } from './invoice-history.service';
import { InvoiceHistoryController } from './invoice-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceHistorySchema } from './schemas/invoice-history.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { Document, DocumentSchema } from 'src/document/schemas/document.schema';
import {
  EPointHistory,
  EPointHistorySchema,
} from 'src/epoint-history/schemas/epoint-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'InvoiceHistory', schema: InvoiceHistorySchema },
      { name: 'User', schema: UserSchema },
      { name: Document.name, schema: DocumentSchema },
      { name: EPointHistory.name, schema: EPointHistorySchema },
    ]),
  ],
  providers: [InvoiceHistoryService],
  controllers: [InvoiceHistoryController],
})
export class InvoiceHistoryModule {}
