import express from 'express';
import routes from './api/routes'
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rotas
app.use('/api', routes);

// Rota de health check
app.get('/health', (req, res) => {
    res.send('API de extração e download de arquivos está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT}/health para verificar o status da API.`);
});