import { Module } from '@nestjs/common';
import { MongooseConfigModule } from './mongoose-config/mongoose-config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './document/document.module';
import { InvoiceHistoryModule } from './invoice-history/invoice-history.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { CollectionModule } from './collection/collection.module';
import { CommentModule } from './comment/comment.module';
import { EpointHistoryModule } from './epoint-history/epoint-history.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseConfigModule,
    UserModule,
    AuthModule,
    DocumentModule,
    InvoiceHistoryModule,
    DashboardModule,
    CategoryModule,
    CollectionModule,
    CommentModule,
    EpointHistoryModule,
    NotificationModule,
  ],
})
export class AppModule {}
