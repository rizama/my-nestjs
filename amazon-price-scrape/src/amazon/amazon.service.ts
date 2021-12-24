import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { AmazonPayload } from './amazon.mode';
import { JSDOM } from 'jsdom';

@Injectable()
export class AmazonService {
    private COOKIE: any =
        'session-id=135-0548967-0969709; ubid-main=132-5526294-9544835; aws_lang=en; s_fid=48B24E584704A514-2FE5083EFC207590; s_cc=true; aws-mkto-trk=id:112-TZM-766&token:_mch-aws.amazon.com-1616254685489-91302; i18n-prefs=USD; sp-cdn="L5Z9:ID"; aws-ubid-main=817-3511838-7414654; lc-main=en_US; s_campaign=em|wlcm|aws|em_wlcm_1|other|wlcm_1d|mult|global|global; awsc-color-theme=light; aws-reg-aid=8bce97bee769656df9bb51ed5c41739efdd66d0650ca1820196aabb00afa3289; aws-reg-guid=8bce97bee769656df9bb51ed5c41739efdd66d0650ca1820196aabb00afa3289; remember-account=false; s_eVar60=ft_card; aws-target-visitor-id=1616254685027-185405.35_0; aws-target-data={"support":"1"}; regStatus=registered; s_sq=[[B]]; AMCVS_7742037254C95E840A4C98A6@AdobeOrg=1; aws-userInfo-signed=eyJ0eXAiOiJKV1MiLCJrZXlSZWdpb24iOiJ1cy1lYXN0LTEiLCJhbGciOiJFUzM4NCIsImtpZCI6ImQ4NWNkZjU1LTcxNDEtNDE0NS04YTY3LTZjYTQyZTNiZTJjYyJ9.eyJzdWIiOiIiLCJzaWduaW5UeXBlIjoiUFVCTElDIiwiaXNzIjoiaHR0cDpcL1wvc2lnbmluLmF3cy5hbWF6b24uY29tXC9zaWduaW4iLCJrZXliYXNlIjoiXC9UYkpTZHBEUXlsbVBGNFVNNnRpN0FcL1JwXC96MXZIVDZwYzhzOUljdWNTbz0iLCJhcm4iOiJhcm46YXdzOmlhbTo6MzMyNTA4NTQzOTA4OnJvb3QiLCJ1c2VybmFtZSI6InJpemt5c2FtIn0.7Ojzabt8EIhul9EckyW2JXul99n-a3rpArks3HkR19_vG3CW6mSqCeYRdjS0jNVqa8tDaTDDIYtc4p-sNvQ84N0sdAwe3pOam4DzfNxTOsE-_J7mJggSVVemtrFj13PH; aws-userInfo={"arn":"arn:aws:iam::332508543908:root","alias":"","username":"rizkysam","keybase":"/TbJSdpDQylmPF4UM6ti7A/Rp/z1vHT6pc8s9IcucSo\u003d","issuer":"http://signin.aws.amazon.com/signin","signinType":"PUBLIC"}; skin=noskin; session-id-time=2082787201l; AMCV_7742037254C95E840A4C98A6@AdobeOrg=1585540135|MCIDTS|18980|MCMID|68108907634613521078946451602176556988|MCAID|NONE|MCOPTOUT-1639845012s|NONE|vVersion|4.4.0; session-token=2fMIEUYUj1lw7nDecxAA/ycOx1qxb2BsevB76xRB7bt5ifPFER7/H4t4TsU54zWjDNu3Fyp283aPXctw7UubPwcD1r+ZaBDvHd5mvf6qsr39sXMMmnhXw2vpfft944IM4mvjzAguZ4TgoY1tWR0yi+h82RvQvA95AGN2kxM91ItTEE/vBhQCtVh+wMyj5ktZ; csm-hit=tb:824GV5TBZ4B1QSBYWH29+b-824GV5TBZ4B1QSBYWH29|1639927095255&t:1639927095255&adb:adblk_no';
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
                    throw new Error('No Response From AWS');
                }
            }

            if (this.COOKIE) {
                console.log(productUrl)
                const { data: html } = await axios.get(productUrl, {
                    headers: {
                        Accept: 'text/html,*/*',
                        'User-Agent': this.USER_AGENT,
                        cookie: this.COOKIE,
                    },
                    withCredentials: true,
                });

                const dom = new JSDOM(html);
                const $ = (selector) =>
                    dom.window.document.querySelector(selector);

                const pinnedElement = $('#pinned-de-id');

                const title = $('#aod-asin-title-text').textContent.trim();

                const getOffer = (element) => {
                    const price = element.querySelector(
                    '.a-price .a-offscreen',
                ).textContent;

                    const ships_from = element
                        .querySelector('#aod-offer-shipsFrom')
                        .querySelector('span.a-color-base')
                        .textContent.trim();

                    const sold_by = element
                        .querySelector('#aod-offer-soldBy')
                        .querySelector('a')
                        .textContent.trim();

                    return {
                        price,
                        ships_from,
                        sold_by,
                };
                };

                const pinned = getOffer(pinnedElement);
                const result = {
                    pinned,
                    title,
                    offers: [],
                };

                console.log(result)
            }

            return productUrl;
        } catch (error) {
            console.log(error.stack);
        }
    }

    getProduct(productId: AmazonPayload) {
        return `https://www.amazon.com/gp/aod/ajax/?asin=${productId}&m=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=&pc=dp`;
    }
}
