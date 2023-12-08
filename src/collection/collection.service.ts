import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/category/dtos';
import { Collection } from './schemas/collection.schema';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
  ) {}

  async createCollection(collection: CreateCategoryDto): Promise<Collection> {
    const createdCollection = new this.collectionModel(collection);
    return createdCollection.save();
  }

  async getAllCollections(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
  }

  async getCollectionById(id: string): Promise<Collection> {
    const collection = await this.collectionModel.findById(id).exec();
    if (!collection) {
      throw new NotFoundException('Collection not found');
    }
    return collection;
  }

  async updateCollection(
    id: string,
    updatedCollection: UpdateCategoryDto,
  ): Promise<Collection> {
    return await this.collectionModel
      .findByIdAndUpdate(id, updatedCollection, { new: true })
      .exec();
  }

  async deleteCollection(id: string): Promise<any> {
    const collection = await this.collectionModel.findByIdAndDelete(id);
    return collection;
  }
}
