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
    const allCompanies = await this.prismaService.Company.findMany({include: {users: true,documents:true,additional_fields:true  }})
    return {allCompanies}
  }

  async getOneCompany(id:string){
    const company = await this.prismaService.Company.findUnique({ where:id,include: {users: true ,documents:true,additional_fields:true }})
    if (!company) {
      throw new HttpException("Company doesn't exist",404)
    }
    else{
      return {company}
    }
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto,
    file_name: Express.Multer.File[],
    company_logo: Express.Multer.File[],
    ) {
    const { additional_fields,users,documents, ...post } = updateCompanyDto;
    // const hashedPassword = await bcrypt.hash(users.password, 10);
  
    const existingCompany = await this.prismaService.Company.findUnique({ where: id ,
      include: { documents: true,additional_fields:true },
     })
    if (!existingCompany) {
      throw new HttpException("Company doesn't exist", 404);
    }
    await this.prismaService.Document.deleteMany({
      where: { company_id: existingCompany.id },
    });
  
  // const newDocuments = {
  //   create: [
  //     {
  //       file_name: file_name ? file_name[0].originalname : null,
  //       file_path: file_name ? file_name[0].path : null,
  //     },
  //   ],
  // };
  const newDocuments = {
    create: file_name
      ? file_name.map((file) => ({
          file_name: file.originalname,
          file_path: file.path,
        }))
      : [],
  };
    const updatedCompany = await this.prismaService.Company.update({
      where: id ,
      data: {
        additional_fields: {
          create: additional_fields, 
        },
        company_logo: company_logo ? company_logo[0].originalname : null,
        ...post,
        // users: {
        //   update: {
        //     where: { email: users?.email },
        //     data: {
        //       username: users?.username,
        //       // password: hashedPassword,
        //       role: users?.role,
        //     }
        //   },
        // },
        documents: newDocuments,
      },
    });
  
    if (!updatedCompany) {
      throw new Error("Failed to update Company");
    }
  
    // const token = this.jwtService.sign({
    //   username: users.username,
    //   email: users.email,
    //   role: users.role,
    // });
  
    return { ...updatedCompany,message:"Company updated successfully!" };
    // return {message:"Company updated successfully!" };
    // return {...updatedCompany};
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
