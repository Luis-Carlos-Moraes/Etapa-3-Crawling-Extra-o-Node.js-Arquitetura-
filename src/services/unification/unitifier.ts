import fs from 'fs';
import path from 'path';
import archiver from 'archiver'

export class UnitifierService {
    async createZip(filePaths: string[], outputPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(outputPath);
            const archive = archiver('zip', { zlib: { level: 9 } });
            
            output.on('close', () => {
                console.log(`Arquivo ZIP criado com sucesso: ${outputPath} (${archive.pointer()} bytes)`);
                resolve(outputPath);
            });

            archive.on('error', (err) => {
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
