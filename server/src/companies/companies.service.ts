import { HttpException, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Request } from 'express';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private prismaService: PrismaService,
    ) {}
    
  async getAllCompanies(){
    const companies = await this.prismaService.Company.findMany({include: {
      users: {
      select:{
        user:true
      }
    },
    documents:true,
    additional_fields:true  
  }})
    return {companies}
    // return {allCompanies}
  }

  async getOneCompany(id:string){
    const company = await this.prismaService.Company.findUnique({ where:id,include: { 
      users: {
      select:{
        user:true
      }} ,
      recipient_invoices:{
        include:{
          company:{
          select:{
          company_logo:true,
          name:true,
          general_manager_name:true,
          company_number:true,
          vat_reg_number:true,
          house_no:true,
          po_box:true,
          fax :true,
          email:true,
          tel1:true,
          tel2:true,
        }}}
      },
      documents:true,
      additional_fields:true }})
    if (!company) {
      throw new HttpException("Company doesn't exist",404)
    }
    else{
      return {company}
    }
  }

  async createCompany(createCompanyDto:CreateCompanyDto){
  
    const {userId,...post} = createCompanyDto
    const company = await this.prismaService.Company.create({data:{
      ...post,
      users:{

        create:userId.map(userId=>({userId}))
      }
    }})
  return {...company}
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto,
    file_name: Express.Multer.File[],
    company_logo: Express.Multer.File[],
    @Req() request: Request,
    ) {

      // const protocol = request.protocol;
      const protocol = 'https';
      const host = request.get('host');
      const company_logo_url = company_logo ? `${protocol}://${host}/${company_logo[0].filename}` : null;
  
    const { additional_fields,documents, ...post } = updateCompanyDto;
  
    const existingCompany = await this.prismaService.Company.findUnique({ where: id ,
      include: { documents: true,additional_fields:true },
     })
    if (!existingCompany) {
      throw new HttpException("Company doesn't exist", 404);
    }
    await this.prismaService.Document.deleteMany({
      where: { company_id: existingCompany.id },
    });
  
  const newDocuments = {
    create: file_name
      ? file_name.map((file) => ({
          file_name: file.originalname,
          file_path:`${protocol}://${host}/${file.filename}`,
        }))
      : [],
  };
    const updatedCompany = await this.prismaService.Company.update({
      where: id ,
      data: {
       
        additional_fields: {
          create: additional_fields, 
        },
        company_logo:company_logo_url,
        ...post,
        documents: newDocuments,
      },
    });
  
    if (!updatedCompany) {
      throw new Error("Failed to update Company");
    }
  
    return { ...updatedCompany,message:"Company updated successfully!" };

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
