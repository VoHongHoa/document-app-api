import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { Document, DocumentSchema } from 'src/document/schemas/document.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import {
  EPointHistory,
  EPointHistorySchema,
} from 'src/epoint-history/schemas/epoint-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EPointHistory.name, schema: EPointHistorySchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Document.name, schema: DocumentSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
