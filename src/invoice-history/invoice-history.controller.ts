import { Get, Body, Param, Controller, UseGuards } from '@nestjs/common';
import { InvoiceHistoryService } from './invoice-history.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { Document } from 'src/document/schemas/document.schema';
import { InvoiceHistory } from './schemas/invoice-history.schema';
@UseGuards(JwtGuard)
@Controller('invoice-history')
export class InvoiceHistoryController {
  constructor(private service: InvoiceHistoryService) {}
  @Get(':id')
  create(
    @GetUser() user: User,
    @Param('id') document_id: string,
  ): Promise<Document> {
    return this.service.create(document_id, user);
  }

  @Get('detail/:id')
  getDetail(
    @GetUser() user: User,
    @Param('id') invoice_id: string,
  ): Promise<InvoiceHistory> {
    return this.service.getDetailInvoice(invoice_id, user);
  }

  @Get()
  getAllInvoiceByUser(@GetUser() user: User): Promise<InvoiceHistory[]> {
    return this.service.getAllInvoiceByUser(user);
  }
}
