import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(
    id: string,
    updatedCategory: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel
      .findByIdAndUpdate(id, updatedCategory, { new: true })
      .exec();
  }

  async deleteCategory(id: string): Promise<any> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }

  async getCategorySelect(status: string): Promise<Category[]> {
    const query: any = {};
    if (status) {
      query.status = status;
    }
    const categories = await this.categoryModel
      .find(query)
      .select('-description')
      .exec();
    return categories;
  }
}
