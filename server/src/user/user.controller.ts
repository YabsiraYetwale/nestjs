/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, UseGuards ,Req} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { GetUser } from 'src/decorators';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import { AtGuards } from 'src/auth/guard/at.guard';

@UseGuards(AtGuards, PermissionGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {};
    
  @RequiredPermission('can_read_user')
  @Get()
  myProfile(@GetUser() userId: any) {
    return this.userService.myProfile(userId['id']);
  };

  @RequiredPermission('can_read_users')
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @RequiredPermission('can_delete_user')
  @Delete(':id')
  deleteClient(@Param() id:string){
   return this.userService.deleteUser(id)
  }
}