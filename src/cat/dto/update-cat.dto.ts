import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;


    @ApiProperty()
    @IsOptional()
    @IsNumber()
    age?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    breed?: string;

}
