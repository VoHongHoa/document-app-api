import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/category/dtos';
import { Collection } from './schemas/collection.schema';
import { JwtGuard } from 'src/auth/guards';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @UseGuards(JwtGuard)
  @Post()
  async createCollection(
    @Body() collection: CreateCategoryDto,
  ): Promise<Collection> {
    return this.collectionService.createCollection(collection);
  }
  @UseGuards(JwtGuard)
  @Get()
  async getAllCollections(): Promise<Collection[]> {
    return this.collectionService.getAllCollections();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getCollectionById(@Param('id') id: string): Promise<Collection> {
    return this.collectionService.getCollectionById(id);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateCollection(
    @Param('id') id: string,
    @Body() updatedCollection: UpdateCategoryDto,
  ): Promise<Collection> {
    return this.collectionService.updateCollection(id, updatedCollection);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteCollection(@Param('id') id: string): Promise<any> {
    return this.collectionService.deleteCollection(id);
  }
  @Get('/filter/select')
  async getCollectionSelect(@Query('status') status: string) {
    return this.collectionService.getCollectionSelect(status);
  }
}
