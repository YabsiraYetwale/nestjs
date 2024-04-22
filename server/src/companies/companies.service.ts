import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompaniesService {
  constructor(private jwtService: JwtService,
    private prismaService: PrismaService,
    ) {}
    
  async getAllCompanies(){
    const allCompanies = await this.prismaService.Company.findMany({include: {users: true,documents:true }})
    return {allCompanies}
  }

  async getOneCompany(id:string){
    const company = await this.prismaService.Company.findUnique({ where:id,include: {users: true ,documents:true}})
    if (!company) {
      throw new HttpException("Company doesn't exist",404)
    }
    else{
      return {company}
    }
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    const { users,documents, ...post } = updateCompanyDto;
    const hashedPassword = await bcrypt.hash(users.password, 10);
  
    const existingCompany = await this.prismaService.Company.findUnique({ where: id ,
      include: { documents: true },
     });
    if (!existingCompany) {
      throw new HttpException("Company doesn't exist", 404);
    }
    await this.prismaService.Document.deleteMany({
      where: { company_id: existingCompany.id },
    });
  
    const updatedCompany = await this.prismaService.Company.update({
      where: id ,
      data: {
        ...post,
        users: {
          update: {
            where: { email: users.email },
            data: {
              username: users.username,
              password: hashedPassword,
              role: users.role,
            },
          },
        },
        documents: {
          create: documents.map((document) => ({
            file_name: document.file_name,
            file_path: document.file_path,
          })),
        },
      },
    });
  
    if (!updatedCompany) {
      throw new Error("Failed to update Company");
    }
  
    const token = this.jwtService.sign({
      username: users.username,
      email: users.email,
      role: users.role,
    });
  
    return { token,message:"Company updated successfully!" };
  }
  async deleteCompany(id: string) {
    const existingCompany = await this.prismaService.Company.findUnique({where:id});
    if (!existingCompany) {
      throw new HttpException("Company doesn't exist", 404);
    }
  
    const deletedCompany = await this.prismaService.Company.delete({ where: id  });
    if (!deletedCompany) {
      throw new Error("Failed to delete company");
    } else {
      return { message: "Company deleted successfully" };
    }
}
}
