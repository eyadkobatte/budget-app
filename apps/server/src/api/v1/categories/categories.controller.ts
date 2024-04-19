import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(
      {
        name: createCategoryDto.categoryName,
        assigned: createCategoryDto.assigned,
      },
      createCategoryDto.groupName
    );
  }
}
