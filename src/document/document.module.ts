import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schemas/document.schema';
import { DocumentController } from './document.controller';
import {
  Notification,
  NotificationSchema,
} from 'src/notification/schemas/notification.schema';
import { NotificationService } from 'src/notification/notification.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import {
  EPointHistory,
  EPointHistorySchema,
} from 'src/epoint-history/schemas/epoint-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EPointHistory.name, schema: EPointHistorySchema },
      { name: Document.name, schema: DocumentSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [DocumentService, NotificationService],
  controllers: [DocumentController],
})
export class DocumentModule {}
