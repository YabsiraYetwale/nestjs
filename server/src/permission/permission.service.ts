/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {};

 
  
  async findAll() {
    try {
      const permissions = await this.prisma.permission.findMany();
      return permissions;
    } catch (error) {
      throw new Error('Failed to find permissions: ' + error.message);
    }
  }

  async findOne(id: string) {
    try {
      const permission = await this.prisma.permission.findUnique({
        where: { id: id },
      });
      return permission;
    } catch (error) {
      throw new Error(
        `Failed to find permission with id ${id}: ${error.message}`,
      );
    }
  }

}
