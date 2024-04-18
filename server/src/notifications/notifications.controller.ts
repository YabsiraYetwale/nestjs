import { Controller, Get,Body, Patch, Param} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Get()
  getAllNotifications() {
    return this.notificationsService.getAllNotifications();
  }
  @Patch(':id')
  MarkNotificationRead(@Param() id: string) {
    return this.notificationsService.MarkNotificationRead(id);
  }
}
