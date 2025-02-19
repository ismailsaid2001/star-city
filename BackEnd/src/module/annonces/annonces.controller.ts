import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { AnnoncesEntity } from './annonces.entity';
import { CreateAnnonceDto } from 'src/dto/annonces.dtos';
import { UpdateAnnoncesDto } from 'src/dto/updateAnnonces.dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('annonces')
export class AnnoncesController {
    constructor(
        private annoncesService: AnnoncesService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async getAllAnnonces(): Promise<AnnoncesEntity[]> {
        return await this.annoncesService.getAnnonces();
    }

    @Get(':id')
    getAnnonceById(@Param('id') id: number): Promise<AnnoncesEntity> {
      return this.annoncesService.getAnnonceById(id);
    }

    @Get('user/:id')
    getAnnoncesByUserId(@Param('id') id: number): Promise<AnnoncesEntity[]> {
      return this.annoncesService.getAnnoncesByUserId(id);
    }

    @Post('create')
    async postAnnonce(
        @Body() newAnnonce: CreateAnnonceDto
    ): Promise<AnnoncesEntity> {
        return await this.annoncesService.addAnnonce(newAnnonce);
    }

    @Patch(':id')
    async updateAnnonce(
        @Body() newAnnonce: UpdateAnnoncesDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<AnnoncesEntity> {
        return await this.annoncesService.updateAnnonce(id, newAnnonce);
    }

    @Delete(':id')
    async deleteAnnonce(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.annoncesService.deleteAnnonce(id)
    }

}
