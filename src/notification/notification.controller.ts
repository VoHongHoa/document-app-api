// notification.controller.ts

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './schemas/notification.schema';
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { UpdateDocumentDto } from 'src/document/dtos';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @UseGuards(JwtGuard)
  @Get()
  async getUserNotification(@GetUser() user: User): Promise<Notification[]> {
    return this.notificationService.getAllNotifications(user);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getNotificationById(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.getNotificationById(id);
  }
  @UseGuards(AdminGuard)
  @Post('approve/:id')
  async approveDocument(
    @Param('id') id: string,
    @Body() documentDto: UpdateDocumentDto,
  ): Promise<Notification> {
    return this.notificationService.approveDocument(id, documentDto);
  }
}
