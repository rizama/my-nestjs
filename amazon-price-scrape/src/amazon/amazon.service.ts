import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AmazonService {
    async getPrice(productId: string) {
        try {
            const productUrl = this.getProduct(productId);
            console.log(encodeURI(productUrl));
            const { data } = await axios.get(productUrl, {
                headers: {
                    Accept: 'text/html,*/*',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
                    // TE: 'trailers',
                    // Host: 'www.amazon.com',
                    // 'Sec-Fetch-Mode': 'cors'
                },
            });

            console.log(data);
            // return productUrl;
        } catch (error) {
            console.log(error.stack);
        }
    }

    getProduct(productId: string) {
        return `https://www.amazon.com/gp/aod/ajax/?asin=${productId}&m=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=&pc=dp`;
    }
}
