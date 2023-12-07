import { Module } from '@nestjs/common';
import { InvoiceHistoryService } from './invoice-history.service';
import { InvoiceHistoryController } from './invoice-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceHistorySchema } from './schemas/invoice-history.schema';
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
  providers: [InvoiceHistoryService],
  controllers: [InvoiceHistoryController],
})
export class InvoiceHistoryModule {}
