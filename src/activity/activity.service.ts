import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository (Activity)
    private activityRepository: Repository<Activity>
  ){}
  async create(id, createActivityDto: CreateActivityDto) {
    return this.activityRepository.save({...createActivityDto, user: id});
  }

  findAll() {
    return `This action returns all activity`;
  }

  async updateById(id){
    const activity = await this.activityRepository.findOne(id)

    if (!activity) throw new BadRequestException('Activity dont exists');

    if(activity.done == true){
      return await this.activityRepository.update(id, { done: false })
    } else {
      return await this.activityRepository.update(id, { done: true })
    }
  }
    
  async update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.activityRepository.update(id,updateActivityDto);
  }

  async remove(id: number) {
    return this.activityRepository.delete(id)
  }
}
