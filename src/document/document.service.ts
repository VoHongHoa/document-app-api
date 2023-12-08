import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './schemas/document.schema';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos';

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

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    return await this.documentModel
      .findByIdAndUpdate(id, updateDocumentDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.documentModel.findByIdAndDelete(id).exec();
  }

  async findDocumentHomepage(): Promise<Omit<Document, 'url_download'>[]> {
    return await this.documentModel
      .find({
        status: 'Active',
      })
      .select('-url_download')
      .limit(8)
      .exec();
  }

  async getDocumentWithManyDownload(): Promise<
    Omit<Document, 'url_download'>[]
  > {
    return await this.documentModel
      .find({
        status: 'Active',
        total_download: { $gt: 0 },
      })
      .sort({
        ['total_download']: -1,
      })
      .select('-url_download')
      .limit(8)
      .exec();
  }

  async getDocumentWithManyView(): Promise<Omit<Document, 'url_download'>[]> {
    return await this.documentModel
      .find({
        status: 'Active',
        total_view: { $gt: 0 },
      })
      .sort({
        ['total_view']: -1,
      })
      .select('-url_download')
      .limit(8)
      .exec();
  }

  async getDetail(id: string): Promise<Document> {
    const document = await this.documentModel.findById(id).exec();
    document.total_view = document.total_view + 1;
    const updateDocument = await document.save();
    return updateDocument;
  }
}
