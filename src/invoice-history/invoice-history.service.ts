import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { InvoiceHistory } from './schemas/invoice-history.schema';
import { User } from 'src/user/schemas/user.schema';
import { Document } from 'src/document/schemas/document.schema';

@Injectable()
export class InvoiceHistoryService {
  constructor(
    @InjectModel('InvoiceHistory')
    private readonly invoiceHistoryModel: Model<InvoiceHistory>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Document')
    private readonly documentModel: Model<Document>,
  ) {}

  async getDetailInvoice(
    invoice_id: string,
    user: User,
  ): Promise<InvoiceHistory> {
    const invoice = await this.invoiceHistoryModel
      .findById(invoice_id)
      .populate({ path: 'documentObject' });
    if (
      !invoice ||
      !new mongoose.Types.ObjectId(user._id).equals(
        new mongoose.Types.ObjectId(invoice.createdBy),
      )
    ) {
      throw new BadRequestException(
        `Invoice history with ID ${invoice_id} not found`,
      );
    }
    return invoice;
  }

  async getAllInvoiceByUser(user: User): Promise<InvoiceHistory[]> {
    return await this.invoiceHistoryModel
      .find({ createdBy: user._id })
      .populate({ path: 'documentObject' });
  }

  async create(document_id: string, user: User): Promise<Document> {
    if (!this.isValidObjectId(document_id)) {
      throw new BadRequestException('Invalid Document ID');
    }
    const document = await this.documentModel.findById(document_id);
    if (!document) {
      throw new NotFoundException(`Document with ID ${document_id} not found`);
    }
    const newInvoiceHistory = new this.invoiceHistoryModel({
      document_id: document_id,
      createdBy: user._id,
    });
    if (user.e_point < document.price) {
      throw new BadRequestException(`Your e_point is not enough`);
    }
    user.e_point = user.e_point - document.price;
    await user.save();
    await newInvoiceHistory.save();
    return document;
  }

  private isValidObjectId(id: string): boolean {
    // Check if the provided ID is a valid MongoDB ObjectID
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
