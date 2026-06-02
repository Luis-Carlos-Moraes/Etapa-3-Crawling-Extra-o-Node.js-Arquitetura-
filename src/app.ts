import express from 'express';
import routes from './api/routes'

const app = express();
const PORT = 3000;

app.use(express.json());

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