import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth() 
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    @Public()
    async create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get(':id')
    @Public()
    async findOneById(@Param('id', ParseIntPipe) id: number,){
        return this.userService.findOneById(+id)
    }

    @Patch()
    async updateUser(@Request() req: any, @Body() UpdateUserDto: UpdateUserDto ){
        console.log(req.user)
        return this.userService.updateUser(req.user.id, UpdateUserDto)
    }


    @Delete()
    @ApiBody({ type: DeleteUserDto})
    async deleteUser(@Request() req:any){
        return this.userService.deleteUser(req.user.id)
    }
}
