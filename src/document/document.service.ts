import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './schemas/document.schema';
import { CreateDocumentDto } from './dtos';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Document') private readonly documentModel: Model<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async findAll(): Promise<Document[]> {
    return await this.documentModel.find().exec();
  }

  async findOne(id: string): Promise<Document> {
    return await this.documentModel.findById(id).exec();
  }

  async update(id: string, updateDocumentDto: Document): Promise<Document> {
    return await this.documentModel
      .findByIdAndUpdate(id, updateDocumentDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.documentModel.findByIdAndDelete(id).exec();
  }
}
