import fs from 'fs';
import path from 'path';
import archiver = require('archiver');

export class UnitifierService {
    async createZip(filePaths: string[], outputPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(outputPath);
            // In archiver v8, we use the ZipArchive class directly. 
            // Using 'any' to bypass outdated @types/archiver definitions.
            const archive = new (archiver as any).ZipArchive({ zlib: { level: 9 } });
            
            output.on('close', () => {
                console.log(`Arquivo ZIP criado com sucesso: ${outputPath} (${archive.pointer()} bytes)`);
                resolve(outputPath);
            });

            archive.on('error', (err: any) => {
                console.error('Erro ao criar o arquivo ZIP:', err);
                reject(err);
            });

            archive.pipe(output);

            filePaths.forEach(filePath => {
                if (fs.existsSync(filePath)) {
                    archive.file(filePath, { name: path.basename(filePath) });
                }
            });

            archive.finalize();
        });
    }
}
