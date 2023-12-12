import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from 'src/document/schemas/document.schema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';
import {
  Collection,
  CollectionSchema,
} from 'src/collection/schemas/collection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
