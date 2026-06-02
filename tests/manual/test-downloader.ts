
import { DownloaderService } from '../src/services/download/downloader';
import path from 'path';
import fs from 'fs';

async function test() {
    const downloader = new DownloaderService();
    const files = [
        {
            "name": "Arquivo documento145",
            "code": "FT1",
            "url": "http://omnissolucoes.com/teste3/FT1.pdf"
        }
    ];
    const tempDir = path.join(__dirname, 'test-temp');
    try {
        const downloadedPaths = await downloader.downloadFiles(files, tempDir);
        console.log('Downloaded paths:', downloadedPaths);
        // Cleanup
        // fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
        console.error('Error in test:', error);
    }
}

test();
