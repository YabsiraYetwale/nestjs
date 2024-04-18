import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(
    private prismaService: PrismaService,
  ) {}
async getAllNotifications(){
  const allNotifications = await this.prismaService.invoices.findMany({ include: { line_items: true,client: true },})
  return {allNotifications}
}

async MarkNotificationRead(id:string){
  const existingNotification = await this.prismaService.Invoices.findUnique({ where: id  });
  if (!existingNotification) {
    throw new HttpException("Notification doesn't exist", 404);
  }
  const updatedNotificationStatus = await this.prismaService.Invoices.update({where:id,data:{isRead:true}})
  if (!updatedNotificationStatus) {
    throw new Error("Failed to update Notification");
  }
return {...updatedNotificationStatus}
} 
}
