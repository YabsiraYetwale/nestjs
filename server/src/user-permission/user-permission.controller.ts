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
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { AtGuards } from 'src/auth/guard/at.guard';
import { RequiredPermission } from 'src/decorators/permission';
import { PermissionGuard } from 'src/auth/guard/permission.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@UseGuards(AtGuards, PermissionGuard)
@ApiTags('user-permission')
@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @RequiredPermission('can_create_userPermission')
  @Post()
  @ApiOperation({ summary: 'Create a new user permission' })
  @ApiResponse({
    status: 201,
    description: 'The user permission has been successfully created',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: CreateUserPermissionDto })
  async create(@Body() createUserPermissionDto: CreateUserPermissionDto) {
    try {
      return await this.userPermissionService.create(createUserPermissionDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create user permission',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @RequiredPermission('can_read_userPermissions')
  @Get()
  @ApiOperation({ summary: 'Get all user permissions' })
  @ApiResponse({
    status: 200,
    description: 'Return the list of all user permissions',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    try {
      return await this.userPermissionService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user permissions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @RequiredPermission('can_read_userPermission')
  @Get(':id')
  @ApiOperation({ summary: 'Get a user permission by ID' })
  @ApiParam({ name: 'id', description: 'User Permission ID' })
  @ApiResponse({ status: 200, description: 'Return the user permission' })
  @ApiResponse({ status: 404, description: 'User permission not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.userPermissionService.findOne(id);
    } catch (error) {
      throw new HttpException(
        `Failed to find user permission with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @RequiredPermission('can_update_userPermission')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user permission by ID' })
  @ApiParam({ name: 'id', description: 'User Permission ID' })
  @ApiResponse({
    status: 200,
    description: 'The user permission has been successfully updated',
  })
  @ApiResponse({ status: 404, description: 'User permission not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: UpdateUserPermissionDto })
  async update(
    @Param('id') id: string,
    @Body() updateUserPermissionDto: UpdateUserPermissionDto,
  ) {
    try {
      return await this.userPermissionService.update(
        id,
        updateUserPermissionDto,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to update user permission with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @RequiredPermission('can_delete_userPermission')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user permission by ID' })
  @ApiParam({ name: 'id', description: 'User Permission ID' })
  @ApiResponse({
    status: 200,
    description: 'The user permission has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'User permission not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: string) {
    try {
      return await this.userPermissionService.remove(id);
    } catch (error) {
      throw new HttpException(
        `Failed to delete user permission with id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
