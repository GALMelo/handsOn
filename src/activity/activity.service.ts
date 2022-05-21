import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository (Activity)
    private activityRepository: Repository<Activity>
  ){}
  async create(id, createActivityDto: CreateActivityDto) {
    return this.activityRepository.save({...createActivityDto, user: id});
  }

  async findAll(id) {
    return await this.activityRepository.find({ user: {id} });
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
    
  async update(userid, id: number, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityRepository.findOne({id, user: {id: userid}})

    if( activity ){
      return this.activityRepository.update(id,updateActivityDto);
    } else {
      throw  new BadRequestException('Activity dont exists');
    }
  }

  async remove(userid, id: number) {
    const activity = await this.activityRepository.findOne({id, user: {id: userid}})

    if( activity ){
      return this.activityRepository.delete(activity);
    } else {
      throw  new BadRequestException('Activity dont exists');
    }
  }
}
