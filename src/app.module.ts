import { Module } from '@nestjs/common';
import { MongooseConfigModule } from './mongoose-config/mongoose-config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './document/document.module';
import { InvoiceHistoryModule } from './invoice-history/invoice-history.module';

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
  ],
})
export class AppModule {}
