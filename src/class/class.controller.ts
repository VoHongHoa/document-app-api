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
import { ClassService } from './class.service';
import { Class } from './schemas/class.schema';
import { AdminGuard } from 'src/auth/guards';
import { CreateClassDto, UpdateClassDto } from './dtos';

@Controller('class')
export class ClassController {
  constructor(private readonly collectionService: ClassService) {}
  @UseGuards(AdminGuard)
  @Post()
  async createClass(
    @Body() collection: CreateClassDto,
  ): Promise<Class> {
    return this.collectionService.createClass(collection);
  }
  @UseGuards(AdminGuard)
  @Get()
  async getAllClasss(): Promise<Class[]> {
    return this.collectionService.getAllClasss();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getClassById(@Param('id') id: string): Promise<Class> {
    return this.collectionService.getClassById(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateClass(
    @Param('id') id: string,
    @Body() updatedClass: UpdateClassDto,
  ): Promise<Class> {
    return this.collectionService.updateClass(id, updatedClass);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<any> {
    return this.collectionService.deleteClass(id);
  }

  @Get('/filter/select')
  async getClassSelect(@Query('status') status: string) {
    return this.collectionService.getClassSelect(status);
  }
}
