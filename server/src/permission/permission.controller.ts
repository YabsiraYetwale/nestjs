/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RequiredPermission } from 'src/decorators/permission';
import { AtGuards } from 'src/auth/guard/at.guard';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('permission')
@Controller('permission')
// @UseGuards(AtGuards, PermissionGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

 

  // @RequiredPermission('can_read_permissions')
  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({
    status: 200,
    description: 'Return the list of all permissions',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    try {
      return await this.permissionService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch permissions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @RequiredPermission('can_read_permission')
  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  @ApiResponse({ status: 200, description: 'Return the permission' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    try {
      const permission = await this.permissionService.findOne(id);
      if (!permission) {
        throw new HttpException(
          `Permission with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return permission;
    } catch (error) {
      throw new HttpException(
        `Internal server error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
