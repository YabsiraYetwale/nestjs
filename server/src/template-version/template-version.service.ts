import { Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class TemplateVersionService {
  constructor(
    private prismaService: PrismaService,
  ) {}

// async getTemplateVersion(id:string){
//   const templateVersion = await this.prismaService.Invoices.findUnique({
//     where:id,
//     include: { line_items: true, client: true,creator: true,company: true , },
//   })
//   if (!templateVersion) {
//     throw new HttpException("templateVersion doesn't exist",404);
//   }
//   else{
//     console.log(templateVersion.date)
//     return {templateVersion};
//   }
// }
async getTemplateVersion(id: string) {
  const templateVersion = await this.prismaService.Invoices.findUnique({
    where: id,
    include: { line_items: true, client: true, creator: true, company: true },
  });

  if (!templateVersion) {
    throw new HttpException("templateVersion doesn't exist", 404);
  }

  // Retrieve the company information from the templateVersion
  const { company, ...rest } = templateVersion

  // Add the company information to the response object
  const response = {
    templateVersion: {
      ...rest,
      company: {
        id: company.id,
        name: company.name,
        general_manager_name: company.general_manager_name,
        country: company.country,
        city: company.city,
        kebele: company.kebele,
      },
    },
  };

  return response
}
}