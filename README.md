# Etapa 3 (Crawling/Extração – Node.js + Arquitetura)

## Desafio

Desenvolver uma solução em **Node.js** que:

1. **Extraia informações** da página alvo.
2. **Baixe** todos os arquivos encontrados.
3. **Unifique** esses arquivos em um único artefato.
4. Disponibilize um **endpoint HTTP** que permita o **download** desse arquivo unificado.

O objetivo aqui não é só “fazer funcionar”, mas também demonstrar **organização de código e arquitetura mínima** (separação de responsabilidades, módulos claros).

**Tempo sugerido:** ~30 min
**Stack:** Node.js (JavaScript, sem TypeScript) + bibliotecas de scraping/download à sua escolha.

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
   * Isolar a lógica de parsing em um módulo/serviço de extração.

2. **Download**

   * Baixar todos os arquivos identificados para uma pasta local.
   * Isolar a responsabilidade de download em um módulo próprio.

3. **Unificação**

   * Gerar um único arquivo com todos os arquivos baixados.
   * Isolar a lógica de unificação em um módulo próprio.

4. **Link de Download**

   * Expor um endpoint HTTP que retorne o arquivo unificado para o usuário.
   * Você pode escolher o framework HTTP que preferir.

---

## Requisitos de arquitetura (foco adicional)

Não precisa ser um “mega projeto”, mas queremos ver **preocupação real com arquitetura**:

* **Separação de responsabilidades**:

  * Um ponto de entrada principal.
  * Um módulo para **HTTP/rotas**.
  * Um módulo para **extração** (scraping/parsing do HTML).
  * Um módulo para **download** dos arquivos.
  * Um módulo para **unificação** (geração do artefato final).
  * Opcional: módulo de **config/log**.

* **Facilidade de manutenção**:

  * Evitar um único arquivo enorme com tudo misturado.
  * Nomear funções de forma clara.

---

## Tratamento de erros (mínimo esperado)

* Timeout ao acessar a página alvo.
* Links quebrados durante o download, sem interromper todo o processo.
* Falha na criação do arquivo unificado, retornando erro HTTP adequado.
* Logs mínimos para facilitar entendimento de falhas.

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
  * Facilita possíveis alterações futuras.

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
    * Como usar a solução.
    * **Breve explicação das decisões de arquitetura**.

---

## Entrega

* Publique o código em um **repositório público** no GitHub.
* Inclua no README:

  * Comandos para rodar o projeto.
  * Endpoint(s) disponíveis.
* Envie o link conforme orientado no processo seletivo.
