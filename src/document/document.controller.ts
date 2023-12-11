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
import { AdminGuard, JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@Controller('document')
export class DocumentController {
  constructor(private readonly documnetService: DocumentService) {}
  @UseGuards(AdminGuard)
  @Get()
  findAll(): Promise<Document[]> {
    return this.documnetService.findAll();
  }
  @UseGuards(AdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @GetUser() user: User,
  ): Promise<Document> {
    return this.documnetService.update(id, updateDocumentDto, user);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.documnetService.remove(id, user);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @GetUser() user: User,
  ): Promise<Document> {
    return this.documnetService.create(createDocumentDto, user);
  }

  @UseGuards(JwtGuard)
  @Get('upload/user')
  getDocumentUploadByUser(@GetUser() user: User): Promise<Document[]> {
    return this.documnetService.getDocumentUploadByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Document> {
    return this.documnetService.findOne(id);
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

  @Post('/homepage/filter')
  getFilterDocument(@Body() query: any) {
    return this.documnetService.getFilterDocument(query);
  }

  @Get('/get-document-by-collection/:id')
  async getDocumentByCollection(@Param('id') id: string) {
    return this.documnetService.getDocumentByCollection(id);
  }
}
