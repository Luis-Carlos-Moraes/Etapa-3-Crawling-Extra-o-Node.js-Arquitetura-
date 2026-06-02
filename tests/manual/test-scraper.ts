
import { ScraperService } from '../src/services/extraction/scraper';

async function test() {
    const scraper = new ScraperService();
    try {
        const files = await scraper.extractFiles();
        console.log('Files extracted:', JSON.stringify(files, null, 2));
    } catch (error) {
        console.error('Error in test:', error);
    }
}

test();
