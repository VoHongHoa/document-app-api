import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Collection } from 'src/collection/schemas/collection.schema';
import { SearchKeyResponse } from './response';
import { Document } from 'src/document/schemas/document.schema';

import { Document as MongooseDocument } from 'mongoose';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<Document>,
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async getSearchKey(): Promise<SearchKeyResponse[]> {
    const documentKeySearch = await this.getSearchKeyForModel(
      this.documentModel,
      {},
    );

    const collectionsKeySearch = await this.getSearchKeyForModel(
      this.collectionModel,
      {},
    );

    const categoriesKeySearch = await this.getSearchKeyForModel(
      this.categoryModel,
      {},
    );

    return [
      ...documentKeySearch,
      ...collectionsKeySearch,
      ...categoriesKeySearch,
    ];
  }

  async searchDocument(keySeach: SearchKeyResponse[]): Promise<Document[]> {
    const filterCondition: string[] = keySeach.map((item) => {
      return item.value;
    });
    const documents = await this.documentModel
      .find({
        $or: [
          { _id: { $in: filterCondition } },
          { category_id: { $in: filterCondition } },
          { collection_id: { $in: filterCondition } },
        ],
      })
      .populate('category_id')
      .populate('collection_id')
      .select('-url_download')
      .exec();
    return documents;
  }

  private async getSearchKeyForModel(
    model: Model<MongooseDocument & { title: string; status: string }>, // Update the type accordingly
    filter: Record<string, any>,
  ): Promise<SearchKeyResponse[]> {
    const documents = await model
      .find({
        ...filter,
        status: 'Active',
      })
      .select('_id title')
      .exec();

    return documents.map((item) => ({
      label: item.title,
      value: item._id,
    }));
  }
}
