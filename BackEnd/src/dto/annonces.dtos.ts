import { IsNotEmpty, IsString } from "class-validator";

export class CreateAnnonceDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    categorie: string;

    @IsString()
    image: string;

}