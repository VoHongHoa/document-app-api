import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from 'src/document/schemas/document.schema';
import { InvoiceHistory } from 'src/invoice-history/schemas/invoice-history.schema';
import { User } from 'src/user/schemas/user.schema';
import { OverViewResponse } from './response';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('InvoiceHistory')
    private readonly invoiceHistoryModel: Model<InvoiceHistory>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Document')
    private readonly documentModel: Model<Document>,
  ) {}

  async overViewData(): Promise<OverViewResponse> {
    let numOfTotalView: number = 0,
      numOfTotalDownload: number = 0;
    const numofUser = await this.userModel.find().countDocuments();
    const numOfDocument = await this.documentModel.find().countDocuments();
    const sumResult = await this.documentModel.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$total_view' },
          totalDownload: { $sum: '$total_download' },
        },
      },
    ]);

    if (sumResult.length > 0) {
      numOfTotalView = sumResult[0].totalViews;
      numOfTotalDownload = sumResult[0].totalDownload;
    }

    return {
      num_of_user: numofUser,
      num_of_document: numOfDocument,
      num_of_total_view: numOfTotalView,
      num_of_total_download: numOfTotalDownload,
    };
  }

  async getUserReport() {}

  async getTopUser(query: string) {}
}
