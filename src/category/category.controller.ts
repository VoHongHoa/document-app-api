import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/guards';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { Category } from './schemas/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(JwtGuard)
  @Post()
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }
  @UseGuards(JwtGuard)
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updatedCategory: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updatedCategory);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
  @Get('/filter/select')
  async getCategorySelect(@Query('status') status: string) {
    return this.categoryService.getCategorySelect(status);
  }
}
