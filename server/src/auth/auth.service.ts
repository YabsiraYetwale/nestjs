import { Injectable, HttpException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async registerUser(registerCompanyDto: CreateCompanyDto) {
    const {
      users,
      documents,
      name,
      company_number,
      vat_reg_number,
      tel1,
      tel2,
      house_no,
      po_box,
      fax,
      email,
      ...post
    } = registerCompanyDto;
    const existingUserEmail = await this.prismaService.User.findUnique({
      where: { email: users.email },
    });
    const existingUserUsername = await this.prismaService.User.findUnique({
      where: { username: users.username },
    });
    const existingCompanyName = await this.prismaService.Company.findUnique({
      where: { name },
    });
    const existingCompanyNumber = await this.prismaService.Company.findUnique({
      where: { company_number },
    });
    const existingCompanyVatRegNo = await this.prismaService.Company.findUnique(
      { where: { vat_reg_number } },
    );
    const existingCompanyTel1 = await this.prismaService.Company.findUnique({
      where: { tel1 },
    });
    const existingCompanyTel2 = await this.prismaService.Company.findUnique({
      where: { tel2 },
    });
    const existingHouseNumber = await this.prismaService.Company.findUnique({
      where: { house_no },
    });
    const existingPo_box = await this.prismaService.Company.findUnique({
      where: { po_box },
    });
    const existingFax = await this.prismaService.Company.findUnique({
      where: { fax },
    });
    const existingCompanyEmail = await this.prismaService.Company.findUnique({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(users.password, 10);

    if (existingUserEmail) {
      throw new HttpException('Email already exists', 409);
    } else if (existingUserUsername) {
      throw new HttpException('Username already exists', 409);
    } else if (existingCompanyName) {
      throw new HttpException('CompanyName already exists', 409);
    } else if (existingCompanyNumber) {
      throw new HttpException('CompanyNumber already exists', 409);
    } else if (existingCompanyVatRegNo) {
      throw new HttpException('CompanyVatRegNo already exists', 409);
    } else if (existingCompanyTel1) {
      throw new HttpException('CompanyTel1 already exists', 409);
    } else if (existingCompanyTel2) {
      throw new HttpException('CompanyTel2 already exists', 409);
    } else if (existingHouseNumber) {
      throw new HttpException('HouseNumber already exists', 409);
    } else if (existingPo_box) {
      throw new HttpException('Po_box already exists', 409);
    } else if (existingFax) {
      throw new HttpException('Fax already exists', 409);
    } else if (existingCompanyEmail) {
      throw new HttpException('CompanyEmail already exists', 409);
    } else {
      const user = await this.prismaService.Company.create({
        data: {
          users: {
            create: {
              username: users.username,
              password: hashedPassword,
              email: users.email,
              role: users.role,
            },
          },
          documents: {
            create: documents.map((document) => ({
              file_name: document.file_name,
              file_path: document.file_path,
            })),
          },
          name,
          company_number,
          vat_reg_number,
          tel1,
          tel2,
          house_no,
          po_box,
          fax,
          email,
          ...post,
        },
      });
      return { message: 'User registered successfully' };
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const existingUser = await this.prismaService.User.findUnique({
      where: { email },
    });
    if (!existingUser) {
      throw new HttpException({ message: "User doesn't exist." }, 404);
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser?.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException('invalid credentials', 401);
    } else if (isPasswordMatch) {
      const { password, ...user } = existingUser;
      const token = this.jwtService.sign({ ...user });
      return { token };
    }
  }

  
  async getCurrentUser(userId: string) {
    const user = await this.prismaService.User.findUnique({
      where: { id: userId },
      include: { company: true },
    });

    if (!user) {
      throw new HttpException("User doesn't exist", 404);
    }

    return user;
  }

  async getAllUsers() {
    const allUsers = await this.prismaService.User.findMany();
    return { allUsers };
  }

  async getOneUser(id: string) {
    const user = await this.prismaService.User.findUnique({ where: id });
    if (!user) {
      throw new HttpException("User doesn't exist", 404)
    } else {
      return { user };
    }
  }
  async updateUser(id: string, updateUserDto: RegisterUserDto) {
    const post = updateUserDto;
    const existingUser = await this.prismaService.User.findUnique({
      where: id,
    });
    if (!existingUser) {
      throw new HttpException("User doesn't exist", 404);
    }
    const updatedUser = await this.prismaService.User.update({
      where: id,
      data: { ...post },
    });
    if (!updatedUser) {
      throw new Error('Failed to update User');
    }
    const { password, ...user } = updateUserDto;
    const token = this.jwtService.sign({ ...user });
    return { token, message: 'User updated successfully!' };
  }
  async deleteUser(id: string) {
    const existingUser = await this.prismaService.User.findUnique({
      where: id,
    });
    if (!existingUser) {
      throw new HttpException("User doesn't exist", 404);
    }

    const deletedUser = await this.prismaService.User.delete({ where: id });
    if (!deletedUser) {
      throw new Error('Failed to delete user');
    } else {
      return { message: 'User deleted successfully' };
    }
  }
}
