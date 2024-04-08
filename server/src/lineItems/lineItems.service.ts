import { Injectable,HttpException } from '@nestjs/common';
import { CreateLineItemsDto } from './dto/create-Line-Items.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateLineItemsDto } from './dto/update-Line-Items.dto';
@Injectable()
export class LineItemsService {
  constructor(
    private prismaService: PrismaService,
  ) {}
async getAllLineItems(){
  const allLine_Items = await this.prismaService.Line_Items.findMany()
  return {allLine_Items}
}
async getOneLineItems(id:string){
  const lineItems = await this.prismaService.Line_Items.findUnique({where:id})
  if (!lineItems) {
    throw new HttpException("LineItems doesn't exist",404)
  }
  else{
    return {lineItems}
  }
}

// async createLineItems(createLineItemsDto:CreateLineItemsDto){
//   const {...post} = createLineItemsDto
//   const newLineItems = await this.prismaService.Line_Items.create({data:{...post}})
// return {...newLineItems}
// }

async updateLineItems(id:string,updateLineItemsDto:UpdateLineItemsDto){
  const post = updateLineItemsDto
  const existingLineItems = await this.prismaService.Line_Items.findUnique({ where: id  });
  if (!existingLineItems) {
    throw new HttpException("LineItems doesn't exist", 404);
  }
  const updatedLineItems = await this.prismaService.Line_Items.update({where:id,data:{...post}})
  if (!updatedLineItems) {
    throw new Error("Failed to update LineItems");
  }
return {...updatedLineItems}
}
async deleteLineItems(id: string) {
    const existingLineItems = await this.prismaService.Line_Items.findUnique({ where: id  });
    if (!existingLineItems) {
      throw new HttpException("LineItems doesn't exist", 404);
    }
  
    const deletedLineItems = await this.prismaService.Line_Items.delete({ where: id  });
    if (!deletedLineItems) {
      throw new Error("Failed to delete LineItems");
    } else {
      return { message: "LineItems deleted successfully" };
    }
  
}
  
// 
async createLineItems(createLineItemsDto: CreateLineItemsDto) {
  const { lineItems } = createLineItemsDto;
  const newLineItems = await Promise.all(
    lineItems.map(async (item) => {
      const { description, quantity, unit_price, tax_rate, invoice_id } = item;
      return this.prismaService.Line_Items.create({
        data: {
          description,
          quantity,
          unit_price,
          tax_rate,
          invoice_id,
        },
      });
    })
  );

  return newLineItems;
}



}

