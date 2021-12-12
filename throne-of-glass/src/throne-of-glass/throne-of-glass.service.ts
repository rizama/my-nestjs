import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Tog } from './tog.entity';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class ThroneOfGlassService {
    constructor(
        @InjectRepository(Tog) private togRepository: Repository<Tog>,
    ) {}

    async getAllCharacters(): Promise<Tog[]> {
        return this.togRepository.find({});
    }

    async getCharactersById(id: number): Promise<Tog> {
        return this.togRepository.findOne({ id });
    }

    async getCharactersByScraping() {
        const url =
            'https://throneofglass.fandom.com/wiki/Category:Kingdom_of_Ash_characters';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const categories = $('ul.category-page__members-for-char');
        console.log(categories.length);
        const characterPageNames = [];

        for (const category of categories) {
            const charactersLIs = $(category).find('li.category-page__member');
            for (const character of charactersLIs) {
                const path =
                    $(character)
                        .find('a.category-page__member-link')
                        .attr('href') || '';
                const name = path.replace('/wiki/', '');
                characterPageNames.push(name);
            }
        }

        return characterPageNames;
    }

    async loadCharacters() {
        const characterPageNames = await this.getCharactersByScraping();

        // Using Looping
        // const characterInfoArr = [];
        // for (const characterPageName of characterPageNames) {
        //     const characterInfo = await this.getCharInfo(characterPageName);
        //     if (characterInfo) {
        //         console.log(characterInfo);
        //         characterInfoArr.push(characterInfo);
        //     }
        // }

        // Using Promise all
        const characterInfoPromises = characterPageNames.map((characterName) =>
            this.getCharInfo(characterName),
        );

        const charactersRaw = await Promise.all(characterInfoPromises);
        const characters = charactersRaw.filter((char) => char !== null);

        const body = characters.map((char) => {
            return {
                name: char.name,
                species: char.species,
                image: char.image,
            };
        });

        try {
            this.togRepository
                .createQueryBuilder()
                .insert()
                .into(Tog)
                .values(body)
                .execute();

            console.log('Success Insert!');
        } catch (error) {
            console.log('Failed Insert!');
            console.log(error);
        }
    }

    async getCharInfo(characterPageName) {
        const baseUrl = `https://throneofglass.fandom.com/wiki/${characterPageName}`;
        const { data } = await axios.get(baseUrl);
        const $ = cheerio.load(data);

        const name = $('div[data-source="full name"]')
            .find('.pi-data-value.pi-font')
            .text();
        const species =
            $('div[data-source="species"]')
                .find('.pi-data-value.pi-font')
                .text() || '-';
        const image = $('.image.image-thumbnail > img').attr('src') || '-';

        if (name) {
            return {
                name,
                species,
                image,
            };
        } else {
            return null;
        }
    }
}
