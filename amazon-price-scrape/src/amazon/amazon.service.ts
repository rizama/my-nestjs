import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { AmazonPayload } from './amazon.mode';

@Injectable()
export class AmazonService {
    private COOKIE: any = null;
    private EXPIRED_DATE: any = null;
    private readonly USER_AGENT =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0';
    private readonly HOME = 'https://www.amazon.com';

    async getPrice(productId: AmazonPayload) {
        try {
            const productUrl = this.getProduct(productId);

            const mCurrentDate = moment();
            const mExpDate = moment(this.EXPIRED_DATE, 'DD-MMM-YYYY h:mm:ss');

            if (!this.COOKIE || mCurrentDate.isSameOrAfter(mExpDate)) {
                const responseAws = await axios.get(this.HOME, {
                    headers: {
                        Accept: 'text/html,*/*',
                        'User-Agent': this.USER_AGENT,
                    },
                    withCredentials: true,
                });

                if (
                    responseAws &&
                    responseAws?.status === 200 &&
                    responseAws?.headers['set-cookie'].length
                ) {
                    const cookie = responseAws.headers['set-cookie'][0];
                    const fullDateExpired = cookie.split(';')[2];
                    const dateExpired = fullDateExpired
                        .split(',')[1]
                        .trim()
                        .replace('GMT', '');

                    this.EXPIRED_DATE = moment(
                        dateExpired,
                        'DD-MMM-YYYY h:mm:ss',
                    );

                    if (mCurrentDate.isSameOrBefore(this.EXPIRED_DATE)) {
                        this.COOKIE = cookie;
                    }
                } else {
                    throw new Error("No Response From AWS");
                    
                }
            }

            if (this.COOKIE) {
                const { data } = await axios.get(productUrl, {
                    headers: {
                        Accept: 'text/html,*/*',
                        'User-Agent': this.USER_AGENT,
                        cookie: this.COOKIE,
                    },
                    withCredentials: true,
                });

                console.log(data);
            }

            // return productUrl;
        } catch (error) {
            console.log(error.stack);
        }
    }

    getProduct(productId: AmazonPayload) {
        return `https://www.amazon.com/gp/aod/ajax/?asin=${productId}&m=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=&pc=dp`;
    }
}
