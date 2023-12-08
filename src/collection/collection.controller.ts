import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/category/dtos';
import { Collection } from './schemas/collection.schema';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async createCollection(
    @Body() collection: CreateCategoryDto,
  ): Promise<Collection> {
    return this.collectionService.createCollection(collection);
  }

  @Get()
  async getAllCollections(): Promise<Collection[]> {
    return this.collectionService.getAllCollections();
  }

  @Get(':id')
  async getCollectionById(@Param('id') id: string): Promise<Collection> {
    return this.collectionService.getCollectionById(id);
  }

  @Put(':id')
  async updateCollection(
    @Param('id') id: string,
    @Body() updatedCollection: UpdateCategoryDto,
  ): Promise<Collection> {
    return this.collectionService.updateCollection(id, updatedCollection);
  }

  @Delete(':id')
  async deleteCollection(@Param('id') id: string): Promise<any> {
    return this.collectionService.deleteCollection(id);
  }
}
