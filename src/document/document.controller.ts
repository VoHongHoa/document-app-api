import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos';
import { Document } from './schemas/document.schema';
import { JwtGuard } from 'src/auth/guards';

@Controller('document')
export class DocumentController {
  constructor(private readonly documnetService: DocumentService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documnetService.create(createDocumentDto);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll(): Promise<Document[]> {
    return this.documnetService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Document> {
    return this.documnetService.findOne(id);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documnetService.update(id, updateDocumentDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documnetService.remove(id);
  }

  @Get('/homepage/all')
  getDocumentHomepage(): Promise<Omit<Document, 'url_download'>[]> {
    return this.documnetService.findDocumentHomepage();
  }
  @Get('/homepage/document-with-many-download')
  getDocumentWithManyDownload(): Promise<Omit<Document, 'url_download'>[]> {
    return this.documnetService.getDocumentWithManyDownload();
  }
  @Get('/homepage/document-with-many-view')
  getDocumentWithManyView(): Promise<Omit<Document, 'url_download'>[]> {
    return this.documnetService.getDocumentWithManyView();
  }

  @Get('/detail/:id')
  getDetail(@Param('id') id: string): Promise<Document> {
    return this.documnetService.getDetail(id);
  }
}
