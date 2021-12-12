import { Controller, Get, HttpStatus, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ThroneOfGlassService } from './throne-of-glass.service';
import { responseVM } from './tog.model';

@Controller('throne-of-glass')
export class ThroneOfGlassController {
    constructor(private readonly togService: ThroneOfGlassService) {}

    private readonly logger = new Logger('ThroneOfGlassController');

    response(res, data, message): responseVM {
        const response = {
            message,
            data,
        };
        
        if (message === 'success') {
            return res.status(HttpStatus.OK).json(response);
        } else {
            console.log('here')
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
        }
    }

    @Get('characters')
    async getCharacters(@Res() res: Response): Promise<responseVM> {
        try {
            const data = await this.togService.getAllCharacters();
            return this.response(res, data, 'success');
        } catch (error) {
            this.logger.error(error);
            return this.response(res, null, 'failed');
        }
    }

    @Get('characters/:id')
    async getCharacterById(
        @Param('id') id: number,
        @Res() res: Response,
    ): Promise<responseVM> {
        try {
            const data = (await this.togService.getCharactersById(id)) || null;
            return this.response(res, data, 'success');
        } catch (error) {
            this.logger.error(error);
            return this.response(res, null, 'failed');
        }
    }

    @Get('seed-characters')
    async scrapeCharacters(): Promise<void> {
        try {
            await this.togService.loadCharacters();
            console.log('Success')
        } catch (error) {
            this.logger.error(error);
        }
    }
}
