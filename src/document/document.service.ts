import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Document } from './schemas/document.schema';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('Document') private readonly documentModel: Model<Document>,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    user: User,
  ): Promise<Document> {
    const createdDocument = new this.documentModel(createDocumentDto);
    createdDocument.createdBy = user._id;
    return createdDocument.save();
  }

  async findAll(): Promise<Document[]> {
    return await this.documentModel
      .find()
      .populate('createdBy', '_id display_name')
      .exec();
  }

  async findOne(id: string): Promise<Document> {
    return await this.documentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    user: User,
  ): Promise<Document> {
    return await this.documentModel
      .findByIdAndUpdate(id, updateDocumentDto, { new: true })
      .exec();
  }

  async remove(id: string, user: User) {
    if (user.role === 'User') {
      const document = await this.documentModel.findOne({
        _id: new mongoose.Types.ObjectId(id),
        createdBy: user._id,
      });
      if (!document) {
        throw new BadRequestException('Document not found');
      }
    }

    return await this.documentModel.findByIdAndDelete(id).exec();
  }

  async findDocumentHomepage(): Promise<Omit<Document, 'url_download'>[]> {
    return await this.documentModel
      .find({
        status: 'Active',
      })
      .sort({ createdAt: -1 })
      .select('-url_download')
      .limit(8)
      .populate('createdBy', '_id display_name')
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
      .populate('createdBy', '_id display_name')
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
      .populate('createdBy', '_id display_name')
      .exec();
  }

  async getDetail(id: string): Promise<Document> {
    const document = await this.documentModel
      .findById(id)
      .populate('createdBy', '_id display_name')
      .exec();
    document.total_view = document.total_view + 1;
    const updateDocument = await document.save();
    return updateDocument;
  }

  async getFilterDocument(
    searchModel: any,
  ): Promise<Omit<Document, 'url_download'>[]> {
    // console.log(searchModel);
    let query: any = {};
    if (searchModel.category_id) {
      query.category_id = new mongoose.Types.ObjectId(searchModel.category_id);
    }
    const document = await this.documentModel
      .find(query)
      .select('-url_download')
      .populate('createdBy', '_id display_name')
      .exec();
    return document;
  }

  async getDocumentByCollection(
    id: string,
  ): Promise<Omit<Document, 'url_download'>[]> {
    const documents = await this.documentModel
      .find({
        status: 'Active',
        collection_id: new mongoose.Types.ObjectId(id),
      })
      .select('-url_download')
      .populate('createdBy', '_id display_name')
      .exec();

    return documents;
  }
  async getDocumentUploadByUser(user: User): Promise<Document[]> {
    const documents = await this.documentModel
      .find({
        status: 'Active',
        createdBy: user._id,
      })
      .exec();

    return documents;
  }
}
