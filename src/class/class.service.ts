import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './schemas/class.schema';
import { CreateClassDto, UpdateClassDto } from './dtos';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private collectionModel: Model<Class>,
  ) {}

  async createClass(collection: CreateClassDto): Promise<Class> {
    const createdClass = new this.collectionModel(collection);
    return createdClass.save();
  }

  async getAllClasss(): Promise<Class[]> {
    return this.collectionModel.find().exec();
  }

  async getClassById(id: string): Promise<Class> {
    const collection = await this.collectionModel.findById(id).exec();
    if (!collection) {
      throw new NotFoundException('Class not found');
    }
    return collection;
  }

  async updateClass(
    id: string,
    updatedClass: UpdateClassDto,
  ): Promise<Class> {
    return await this.collectionModel
      .findByIdAndUpdate(id, updatedClass, { new: true })
      .exec();
  }

  async deleteClass(id: string): Promise<any> {
    const collection = await this.collectionModel.findByIdAndDelete(id);
    return collection;
  }

  async getClassSelect(status: string): Promise<Class[]> {
    const collections = await this.collectionModel
      .find({
        status,
      })
      .select('-description')
      .exec();
    return collections;
  }
}
