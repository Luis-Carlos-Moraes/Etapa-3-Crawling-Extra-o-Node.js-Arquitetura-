# Etapa 3 (Crawling/Extração – Node.js + Arquitetura)

Este projeto é uma solução em Node.js para extração de arquivos de uma página web, download automático e unificação em um único arquivo ZIP, disponibilizado via interface web e endpoint de API.

## Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Express**: Framework web para API e servidor de arquivos estáticos.
- **Axios**: Cliente HTTP para downloads e requisições.
- **Cheerio**: Parsing de HTML para extração de dados.
- **Archiver (v8)**: Geração de arquivos ZIP.

---

## Como Rodar o Projeto

1. **Instalação de Dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o Servidor**:
   - Para desenvolvimento (com reload automático):
     ```bash
     npm run dev
     ```
   - Para produção:
     ```bash
     npm start
     ```

---

## Como Usar a Solução

### 1. Pela Interface Web (Frontend)
Acesse no seu navegador: `http://localhost:3000`

- Clique no botão **"Baixar ZIP Unificado"**.
- A interface exibirá o status do processamento em tempo real.
- Ao finalizar, o download do arquivo `arquivos_unificados.zip` será iniciado automaticamente.

### 2. Pelo Backend (Apenas API)
Caso prefira interagir diretamente com a API, envie uma requisição `POST` para o endpoint de processamento.

**Exemplo usando cURL:**
```bash
curl -X POST http://localhost:3000/api/process --output resultado.zip
```

**Comportamento:** O servidor processará os arquivos e retornará o fluxo de dados do ZIP diretamente na resposta.

---

## Estrutura do Projeto

O código foi organizado seguindo princípios de **Separação de Responsabilidades**, facilitando a manutenção e escalabilidade:

```text
src/
├── api/
│   ├── controller/     # Coordena a execução e lida com req/res
│   │   └── mainController.ts
│   └── routes/         # Definição dos endpoints da API
│       └── index.ts
├── services/
│   ├── extraction/     # Lógica de Scraping (ScraperService)
│   ├── download/       # Gerenciamento de downloads (DownloaderService)
│   ├── unification/    # Geração do ZIP (UnitifierService)
│   └── types/          # Definições de interfaces compartilhadas
├── public/             # Arquivos do Frontend (HTML/CSS/JS)
├── app.ts              # Ponto de entrada e configuração do Express
└── tsconfig.json       # Configuração do compilador TypeScript
tests/                  # Scripts de testes isolados
```

- **Modularização**: Cada serviço tem uma única responsabilidade. O `MainController` apenas orquestra o fluxo entre os serviços.
- **Limpeza**: Após o download do ZIP pelo usuário, o servidor realiza a limpeza automática dos arquivos temporários e do ZIP gerado.

---

## Testes

O projeto inclui scripts de teste simples para validar os serviços de extração e download de forma isolada, localizados na pasta `tests/`.

### Executar Teste do Scraper
Valida se a extração de links e códigos da página alvo está funcionando:
```bash
npx ts-node tests/test-scraper.ts
```

### Executar Teste do Downloader
Valida o download de um arquivo individual para uma pasta temporária:
```bash
npx ts-node tests/test-downloader.ts
```

---

## Tratamento de Erros

- **Resiliência**: Se um link de download estiver quebrado, o sistema registra o erro no log mas continua o processamento dos demais arquivos.
- **Timeout**: Limite de 10 segundos para conexões externas para evitar travamentos.
- **Status HTTP**: Retorno de erros claros (404, 500) com mensagens explicativas em formato JSON.
