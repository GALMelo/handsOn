import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activities')
@ApiBearerAuth() 
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Request() req, @Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(req.user.id, createActivityDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.activityService.findAll(req.user.id);
  }

  @Post('updateDone/:id')
  updateById(@Param('id', ParseIntPipe) id: number){
    return this.activityService.updateById(id)
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(req.user.id, +id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.activityService.remove(req.user.id, +id);
  }
}
