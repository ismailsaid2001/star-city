import {IsOptional, IsString } from "class-validator";

export class UpdateAnnoncesDto {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    categorie: string;

    @IsString()
    @IsOptional()
    image: string;

}