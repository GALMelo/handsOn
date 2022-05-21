import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}


    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ username })
    }

    async create(createUserDto: CreateUserDto){
        
        const user = await this.usersRepository.findOne(createUserDto.username)

        if (user) throw new ForbiddenException('Already exists!!!!!!!!!!!!');

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(createUserDto.password, salt);

        const saveUser = await this.usersRepository.save({...createUserDto, password});

        delete saveUser.password;
        return saveUser;
        
    }

    async findOneById(id: number){
        const user = await this.usersRepository.findOneOrFail(id)

        if(!user) throw new ForbiddenException('User dont exists');

        delete user.password;
        return user
    }

    async updateUser(id: number, updateUser: UpdateUserDto){
        const user = await this.usersRepository.findOne(id)
        
        if (!user) throw new BadRequestException('User dont exists');

        return this.usersRepository.update(user.id, updateUser)
    }

    async deleteUser(id: number){
        const user = await this.usersRepository.findOne(id) 

        if (!user) throw new BadRequestException('User dont exists');

        return this.usersRepository.delete(user.id)
    }
}

