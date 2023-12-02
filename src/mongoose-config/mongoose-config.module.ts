import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbroot:dbroot@cluster0.k1e2t.mongodb.net/document-app',
    ),
  ],
})
export class MongooseConfigModule {}
