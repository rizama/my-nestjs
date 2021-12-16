import { Body, Controller, Get, Post } from '@nestjs/common';
import { AmazonPayload } from './amazon.mode';
import { AmazonService } from './amazon.service';

@Controller('amazon')
export class AmazonController {
    constructor(private readonly amazonService: AmazonService) {}

    @Post()
    getPrice(@Body() body: AmazonPayload) {
        const { product_id } = body;
        return this.amazonService.getPrice(product_id);
    }
}
