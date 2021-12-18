import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AmazonPayload } from './amazon.mode';
import { AmazonService } from './amazon.service';

@Controller('amazon')
export class AmazonController {
    constructor(private readonly amazonService: AmazonService) {}

    @Get()
    getPrice(@Query('productId') productId: AmazonPayload) {
        return this.amazonService.getPrice(productId);
    }
}
