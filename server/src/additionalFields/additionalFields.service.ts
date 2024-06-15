import { Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AdditionalFieldsService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async createCustomField(additional_fields: any) {
    return this.prismaService.AdditionalFieldS.create({ data: additional_fields  });
  }
  async getCustomField() {
    const additional_fields = await this.prismaService.AdditionalFieldS.findMany();

    return {additional_fields}
  }

  async getAdditionalFieldsByCompanyId(companyId: string) {
    const additionalFields = await this.prismaService.AdditionalFieldS.findMany({
      where: {
        company_id: companyId,
      },
    })
    return {additionalFields};
  }

  async deleteCustomField(id: any) {
    const existingCustomFieds = await this.prismaService.AdditionalFieldS.findUnique({ where: id  });
    if (!existingCustomFieds) {
      throw new HttpException("customFieds doesn't exist", 404);
    }
    const deletedCustomFieds = await this.prismaService.AdditionalFieldS.delete({ where: id  });
    if (!deletedCustomFieds) {
      throw new Error("Failed to delete CustomFieds");
    } else {
      return { message: "CustomFieds deleted successfully" }
    }
  }
}

