# Etapa 3 (Crawling/Extração – Node.js + Arquitetura)

## Desafio

Desenvolver uma solução em **Node.js** que:

1. **Extraia informações** da página alvo.
2. **Baixe** todos os arquivos encontrados.
3. **Unifique** esses arquivos em um único artefato.
4. Disponibilize um **endpoint HTTP** que permita o **download** desse arquivo unificado.

O objetivo aqui não é só “fazer funcionar”, mas também demonstrar **organização de código e arquitetura mínima** (separação de responsabilidades, módulos claros).

**Tempo sugerido:** ~30 min
**Stack:** Node.js (JavaScript, sem TypeScript) + bibliotecas de scraping/download à sua escolha
(ex.: `axios`/`node-fetch`, `cheerio` ou `puppeteer`, libs de ZIP como `archiver`, etc.).

---

## Página alvo

* **URL:** `http://omnissolucoes.com/teste3/`

---

## Informações a extrair

Da página alvo, sua solução deve conseguir identificar:

* **Nome dos arquivos** listados.
* **URLs completas** desses arquivos.
* **Códigos** dos arquivos (quando presentes na listagem).

---

## Funcionalidades obrigatórias

1. **Extração**

   * Coletar nomes, URLs e códigos a partir da página alvo.
   * A lógica de parsing deve ficar isolada em algum módulo/serviço de extração (por exemplo: `scraper/` ou `services/extractFiles.js`).

2. **Download**

   * Baixar **todos os arquivos identificados** para uma pasta local, por exemplo: `downloads/`.
   * A responsabilidade de download deve estar em um módulo próprio (ex.: `services/downloadFiles.js`).

3. **Unificação**

   * Gerar **um único arquivo** com todos os arquivos baixados:

     * Preferencial: **ZIP** (ex.: com a lib `archiver`).
     * Alternativa aceitável (para caso de `.txt`): concatenação em um único `.txt`.
   * A lógica de unificação deve estar em módulo próprio (ex.: `services/mergeFiles.js` ou similar).

4. **Link de Download**

   * Expor um endpoint HTTP, por exemplo:

     * `GET /download`
   * Esse endpoint deve retornar o **arquivo unificado** (ZIP ou `.txt`) para o usuário.
   * Você pode usar **Express** (ou outro micro framework HTTP) para isso.

> Dica: você pode optar por disparar todo o fluxo (extrair → baixar → unificar) antes, via script, ou sob demanda quando alguém chamar uma rota (ex.: `GET /processar` para gerar e depois `GET /download` para baixar). Use seu julgamento e explique a decisão no README.

---

## Requisitos de arquitetura (foco adicional)

Não precisa ser um “mega projeto”, mas queremos ver **preocupação real com arquitetura**:

* **Separação de responsabilidades**:

  * Um ponto de entrada principal .
  * Um módulo para **HTTP/rotas** .
  * Um módulo para **extração** (scraping/parsing do HTML).
  * Um módulo para **download** dos arquivos.
  * Um módulo para **unificação** (gerar o ZIP ou `.txt` final).
  * Opcional: módulo de **config/log** (timeout padrão, paths de pasta, etc.).

* **Facilidade de manutenção**:

  * Evitar um único arquivo enorme com tudo misturado.
  * Nomear funções de forma clara.

---

## Tratamento de erros (mínimo esperado)

* **Timeout** ao acessar a página alvo:

  * Tentar novamente uma vez ou retornar erro claro.
* **Link quebrado (404/403)** durante download:

  * Ignorar o arquivo específico, **registrar em log** e seguir com os demais.
* **Falha na criação do ZIP/arquivo unificado**:

  * Retornar erro HTTP adequado (ex.: `500`) com mensagem clara.
* **Logs mínimos**:

  * Registrar erros em console ou helper de log (`console.error` já é aceitável, se organizado).

---

## Critérios de avaliação

* **Funcionalidade**

  * Consegue **extrair** as informações da página alvo.
  * Consegue **baixar** os arquivos.
  * Consegue **unificar** em um único artefato.
  * Consegue **expor um endpoint** que retorna o arquivo final.

* **Arquitetura / Organização**

  * Código separado em módulos coerentes (extração, download, unificação, HTTP).
  * Evita concentrar toda a lógica em um único arquivo.
  * Facilita possíveis alterações futuras (ex.: trocar `axios` por `fetch`, trocar ZIP por outro formato).

* **Qualidade do Código**

  * Nomes de funções, variáveis e arquivos claros.
  * Fluxo de execução compreensível.
  * Tratamento básico de casos de erro.

* **Tratamento de Erros**

  * Mensagens úteis.
  * Resiliência mínima a problemas como timeout e links quebrados.
  * O servidor não “morre” por exceções simples.

* **Documentação**

  * README objetivo com:

    * Como instalar dependências.
    * Como rodar o projeto.
    * Como usar (ex.: chamar `/download` ou outra rota que você definir).
    * **Breve explicação das decisões de arquitetura** (por que você organizou as coisas assim).

---

## Entrega

* Publique o código em um **repositório público** no GitHub.
* Inclua no README:

  * Comandos para rodar o projeto.
  * Endpoint(s) disponíveis.
* Envie o link conforme orientado no processo seletivo.
