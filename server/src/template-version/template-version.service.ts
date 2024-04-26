import { Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class TemplateVersionService {
  constructor(
    private prismaService: PrismaService,
  ) {}

async getTemplateVersion(id:string){
  const templateVersion = await this.prismaService.Invoices.findUnique({
    where:id,
    include: { line_items: true, client: true,creator: true,company: true , },
  })
  if (!templateVersion) {
    throw new HttpException("templateVersion doesn't exist",404);
  }
  else{
    console.log(templateVersion.date)
    return {templateVersion};
  }
}

}

