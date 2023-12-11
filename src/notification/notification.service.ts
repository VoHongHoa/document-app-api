import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  async createNotification(
    notificationDto: Notification,
  ): Promise<Notification> {
    const createdNotification = new this.notificationModel(notificationDto);
    return createdNotification.save();
  }

  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async getNotificationById(notificationId: string): Promise<Notification> {
    const notification = await this.notificationModel
      .findById(notificationId)
      .exec();
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async updateNotification(
    notificationId: string,
    notificationDto: Notification,
  ): Promise<Notification> {
    const updatedNotification = await this.notificationModel
      .findByIdAndUpdate(notificationId, notificationDto, { new: true })
      .exec();

    if (!updatedNotification) {
      throw new NotFoundException('Notification not found');
    }

    return updatedNotification;
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const result = await this.notificationModel
      .findByIdAndDelete(notificationId)
      .exec();
    if (!result) {
      throw new NotFoundException('Notification not found');
    }
  }
}
