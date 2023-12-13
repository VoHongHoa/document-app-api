import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { User } from 'src/user/schemas/user.schema';
import { UpdateDocumentDto } from 'src/document/dtos';
import { Document } from 'src/document/schemas/document.schema';
import { EPointHistory } from 'src/epoint-history/schemas/epoint-history.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(EPointHistory.name)
    private readonly epointHistoryModel: Model<EPointHistory>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,

    @InjectModel(Document.name)
    private readonly documentModel: Model<Document>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async getAllNotifications(user: User): Promise<Notification[]> {
    return this.notificationModel
      .find({
        recipient: user._id,
      })
      .populate('sender')
      .populate('document')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getNotificationById(notificationId: string): Promise<Notification> {
    const notification = await this.notificationModel
      .findById(notificationId)
      .populate('sender')
      .populate('document')
      .exec();
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    notification.isRead === true;
    await notification.save();
    return notification;
  }

  async approveDocument(
    notificationId: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Notification> {
    const notification = await this.notificationModel.findById(notificationId);
    if (!notification) {
      throw new BadRequestException('Notification not found');
    }
    const user = await this.userModel.findById(notification.sender);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const document = await this.documentModel.findByIdAndUpdate(
      notification.document,
      updateDocumentDto,
      { new: true },
    );

    document.status = 'Active';
    user.e_point = user.e_point + document.price;
    await user.save();
    await document.save();

    const newEpointHistory = new this.epointHistoryModel({
      document: document._id,
      value: document.price,
      recipient: user._id,
    });
    await newEpointHistory.save();
    notification.isRead = true;
    await notification.save();
    return notification;
  }
}
