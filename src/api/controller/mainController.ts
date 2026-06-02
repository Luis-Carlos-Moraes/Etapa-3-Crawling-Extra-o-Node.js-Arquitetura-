import { Request, Response } from 'express';
import path from 'path'
import fs from 'fs';
import {ScraperService} from '../../services/extraction/scraper';
import { DownloaderService } from '../../services/download/downloader';
import { UnitifierService } from '../../services/unification/unitifier';

export class MainController {
    private scraper = new ScraperService();
    private downloader = new DownloaderService();
    private unitifier = new UnitifierService();

    async handleProcess(req: Request, res: Response) {
        const jobId = Date.now();
        const tempDir = path.join(__dirname, `../../temp/${jobId}`);
        const zipPath = path.join(__dirname, `../../temp/${jobId}.zip`);

        try {
            console.log(`[${jobId}] Iniciando processo de extração, download e unificação...`);

            // 1. Extração
            const files = await this.scraper.extractFiles();
            if (files.length === 0) {
                return res.status(404).json({ message: 'Nenhum arquivo encontrado para extração.' });
            }

            // 2. Download
            const downloadedPaths = await this.downloader.downloadFiles(files, tempDir);
            if (downloadedPaths.length === 0) {
                return res.status(500).json({ message: 'Falha ao baixar os arquivos.' });
            }

            // 3. Unificação
            await this.unitifier.createZip(downloadedPaths, zipPath);

            // 4. Download do ZIP
            res.download(zipPath, 'arquivos_unificados.zip', (err) => {
                this.cleanup(tempDir, zipPath);
                if (err) {
                    console.error(`[${jobId}] Erro ao enviar o arquivo ZIP:`, err);
                }
            });
        
        } catch (error: any) {
            console.error( '[Controller] Erro no processo: ', error.message);
            res.status(500).json({ error: 'Ocorreu um erro durante o processo.' });
            this.cleanup(tempDir, zipPath);
        }
    }

    private cleanup(temp: string, zip: string) {
        try {
            if (fs.existsSync(temp)) fs.rmSync(temp, { recursive: true, force: true });
            if (fs.existsSync(zip)) fs.unlinkSync(zip);
            console.log('Limpeza concluída: arquivos temporários removidos.');
        } catch (err) {
            console.error('Erro durante a limpeza de arquivos temporários:', err);
        }
    }
}
            