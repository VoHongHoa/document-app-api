// notification.controller.ts

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() notificationDto: Notification): Promise<Notification> {
    return this.notificationService.createNotification(notificationDto);
  }

  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationService.getAllNotifications();
  }

  @Get(':id')
  async findOne(@Param('id') notificationId: string): Promise<Notification> {
    return this.notificationService.getNotificationById(notificationId);
  }

  @Put(':id')
  async update(
    @Param('id') notificationId: string,
    @Body() notificationDto: Notification,
  ): Promise<Notification> {
    return this.notificationService.updateNotification(
      notificationId,
      notificationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') notificationId: string): Promise<void> {
    return this.notificationService.deleteNotification(notificationId);
  }
}
