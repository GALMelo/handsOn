import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@ApiTags('cats')
@ApiBearerAuth() 
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cat = await this.catService.findOne(+id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return cat; 
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
