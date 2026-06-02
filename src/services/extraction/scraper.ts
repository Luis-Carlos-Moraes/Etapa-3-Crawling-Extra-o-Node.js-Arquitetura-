import axios from 'axios';
import * as cheerio from 'cheerio';
import { ExtractedFile } from '../types';

export class ScraperService {
    private readonly baseUrl = 'http://omnissolucoes.com/teste3/';

    async extractFiles(): Promise<ExtractedFile[]> {
        try {
            const { data: html } = await axios.get(this.baseUrl, { timeout: 10000 });
            const $ = cheerio.load(html);
            const files: ExtractedFile[] = [];
            $('li').each((_, el) => {
                const fullText = $(el).text().trim();
                const anchor = $(el).find('a');

                const href = anchor.attr('href');
                const code = anchor.attr('codigo') || 'N/A'

                const name = fullText.split(' - ')[1].trim();

                if (href) {
                    files.push({
                        name,
                        code,
                        url: new URL(href, this.baseUrl).href
                    })
                }
            });
            console.log(`Extracted ${files.length} files from the page.`);
            return files;    
        } catch (error) {
            console.error('Error fetching or parsing the page:', error);
            throw new Error('Failed to extract files from the page.');
        }
    }
}
