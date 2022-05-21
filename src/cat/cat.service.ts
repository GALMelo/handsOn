import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository (Cat)
    private catRepository: Repository<Cat>
  ){}
  async create(createCatDto: CreateCatDto) {
    return this.catRepository.save(createCatDto);
  }

  async findAll() {
    return this.catRepository.find();
  }

  async findOne(id: number) {
    return this.catRepository.find({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {

    const cat = this.findOne(id)

    if(!cat){
      throw new NotFoundException('Cat not found');
    }

    return this.catRepository.update({id}, updateCatDto);
  }

  async remove(id: number) {
    const cat = this.findOne(id)

    if(!cat){
      throw new NotFoundException('Cat not found');
    }

    return this.catRepository.delete({id});
  }
}
