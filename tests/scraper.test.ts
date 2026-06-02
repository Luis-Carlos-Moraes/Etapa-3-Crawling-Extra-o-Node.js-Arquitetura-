import { ScraperService } from '../src/services/extraction/scraper';
import nock from 'nock';

describe('ScraperService', () => {
  const scraper = new ScraperService();
  const baseUrl = 'http://omnissolucoes.com';

  it('should extract files correctly from HTML', async () => {
    const mockHtml = `
      <ul>
        <li><a href="FT1.pdf" codigo="FT1">Código FT1</a> - Arquivo documento145</li>
        <li><a href="FH1.pdf" codigo="FH1">Código FH1</a> - Arquivo documento146</li>
      </ul>
    `;

    nock(baseUrl)
      .get('/teste3/')
      .reply(200, mockHtml);

    const files = await scraper.extractFiles();

    expect(files).toHaveLength(2);
    expect(files[0]).toEqual({
      name: 'Arquivo documento145',
      code: 'FT1',
      url: 'http://omnissolucoes.com/teste3/FT1.pdf'
    });
    expect(files[1].code).toBe('FH1');
  });

  it('should throw an error if the request fails', async () => {
    nock(baseUrl)
      .get('/teste3/')
      .reply(500);

    await expect(scraper.extractFiles()).rejects.toThrow('Failed to extract files from the page.');
  });
});
