import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dtos';
import { Document } from './schemas/document.schema';

@Controller('document')
export class DocumentController {
  constructor(private readonly documnetService: DocumentService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documnetService.create(createDocumentDto);
  }

  @Get()
  findAll(): Promise<Document[]> {
    return this.documnetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Document> {
    return this.documnetService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: Document,
  ): Promise<Document> {
    return this.documnetService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documnetService.remove(id);
  }
}
