import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { ExtractedFile } from '../types';

export class DownloaderService {
    async downloadFiles(files: ExtractedFile[], targetDir: string): Promise<string[]> {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const dwonloadedPaths: string[] = [];

        const downloadPromises = files.map(async (file) => {
            try {
                const response = await axios ({
                    url: file.url,
                    method: 'GET',
                    responseType: 'stream',
                    timeout: 10000
                });

                const fileName = `${file.code}_${file.name.replace(/\s+/g, '_')}.pdf`;
                const filePath = path.join(targetDir, fileName);
                const writer = fs.createWriteStream(filePath);

                response.data.pipe(writer);

                return new Promise<void>((resolve, reject) => {
                    writer.on('finish', () => {
                        dwonloadedPaths.push(filePath);
                        console.log(`Downloaded: ${fileName}`);
                        resolve();
                    });
                    writer.on('error', (err) => {
                        console.error(`[Download] Falha no arquivo ${file.name}:`, err);
                        resolve(); // Resolve mesmo em caso de erro para não travar o Promise.all
                    });
                });
            } catch (error: any) {
                console.error(`[Download] Erro ao baixar ${file.url}:`, error.message);
            }
        });

        await Promise.all(downloadPromises);
        console.log(`Download concluído. Total de arquivos baixados: ${dwonloadedPaths.length}`);
        return dwonloadedPaths;
    }
}