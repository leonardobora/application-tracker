[Read in English (Leia em Inglês)](README.md)

# AcademicHub

## Visão Geral

O AcademicHub é um sistema projetado para auxiliar estudantes a navegar e se candidatar a oportunidades acadêmicas. Ele utiliza insights orientados por IA e automação para otimizar o processo de descoberta e candidatura para programas, bolsas de estudo e outros progressos acadêmicos.

## Índice

- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração de Desenvolvimento](#configuração-de-desenvolvimento)
  - [Linux/macOS](#configuração-de-desenvolvimento-linuxmacos)
  - [Windows](#configuração-de-desenvolvimento-windows)
  - [GitHub Codespaces](#github-codespaces)
- [Visão Geral dos Endpoints da API](#visão-geral-dos-endpoints-da-api)
- [Testes](#testes)
- [CI/CD](#cicd)
- [Uso do Docker](#uso-do-docker)
- [Contribuição](#contribuição)

## Funcionalidades

*   **Gerenciamento do Ciclo de Vida da Oportunidade (Opportunity Lifecycle Management):** Funcionalidade central para definir e gerenciar os estágios envolvidos no ciclo de vida de uma oportunidade acadêmica (ex: Descoberta, Candidatura, Avaliação, Feedback).
*   **Insights Baseados em IA (Futuro):** Funcionalidades planejadas incluem recomendações orientadas por IA, validação de redações e orientação personalizada.
*   **Integração com Aplicações Comuns (Futuro):** Capacidades futuras visam simplificar candidaturas através da integração com plataformas de candidatura comuns.
*   **Processamento Automatizado de Documentos (Futuro):** Planos para incluir análise e validação automatizadas de documentos acadêmicos.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
academichub/
├── .git/                     # Arquivos de controle de versão do Git
├── .github/                  # Arquivos específicos do GitHub
│   └── workflows/            # Configurações do pipeline de CI/CD do GitHub Actions
│       └── main.yml          # Workflow principal de CI
├── docs/                     # Documentação do projeto
│   └── technical_decisions/  # ADRs e registros de decisões técnicas
│       └── template_decision_record.tex # Template LaTeX para ADRs
├── frontend_prototype/       # Protótipo inicial HTML/CSS/JS (ainda não integrado ao backend)
│   ├── app.js
│   ├── index.html
│   └── style.css
├── src/                      # Código principal da aplicação Python
│   ├── __init__.py
│   ├── application/          # Definições de endpoints da API e lógica de aplicação
│   │   ├── __init__.py
│   │   └── api.py            # Rotas FastAPI para OpportunityLifecycle
│   ├── domain/               # Modelos de domínio centrais (Pydantic)
│   │   ├── __init__.py
│   │   └── models.py         # Modelos Pydantic para OpportunityLifecycle, LifecycleStage
│   └── main.py               # Ponto de entrada da aplicação FastAPI (executa com uvicorn)
├── tests/                    # Testes unitários e de integração Pytest
│   ├── __init__.py
│   ├── application/          # Testes de endpoints da API
│   │   └── test_api.py
│   └── domain/               # Testes dos modelos de domínio
│       └── test_models.py
├── .gitignore                # Especifica arquivos não rastreados intencionalmente que o Git deve ignorar
├── Dockerfile                # Define a imagem Docker para a aplicação
├── docker-compose.yml        # Configuração para desenvolvimento local usando Docker Compose
├── pytest.ini                # Configuração para pytest (caminhos de teste, pythonpath)
├── README.md                 # Arquivo README em inglês: visão geral do projeto e guia do desenvolvedor
└── requirements.txt          # Dependências de pacotes Python
```

## Pré-requisitos

Antes de começar, certifique-se de que possui o seguinte instalado:

*   **Git:** Para controle de versão.
*   **Python:** Versão 3.12 é recomendada.
*   **Docker e Docker Compose:** (ou Docker Desktop) Para desenvolvimento e implantação em contêineres.
*   **Um IDE:** Um editor de código como VSCode com suporte a Python é altamente recomendado.

## Configuração de Desenvolvimento

### Configuração de Desenvolvimento (Linux/macOS)

1.  **Clone o repositório:**
    ```bash
    git clone <repository_url>
    # Substitua <repository_url> pela URL real do repositório
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd academichub
    ```
3.  **Crie um ambiente virtual Python:**
    ```bash
    python3 -m venv venv
    ```
4.  **Ative o ambiente virtual:**
    ```bash
    source venv/bin/activate
    ```
5.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
6.  **Executando a Aplicação (Diretamente com Uvicorn):**
    A aplicação usa FastAPI e pode ser executada localmente com Uvicorn. Isso fornece recarregamento automático (live reloading) para desenvolvimento.
    ```bash
    uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
    ```
    A API estará disponível em `http://localhost:8000`.

7.  **Executando a Aplicação (com Docker Compose):**
    Esta é a forma recomendada para um ambiente de desenvolvimento consistente.
    ```bash
    docker-compose up --build
    ```
    A API estará disponível em `http://localhost:8000`. O Docker Compose gerencia o recarregamento automático do diretório `src`.
    *Nota:* Se você observar um aviso sobre `COMPOSE_BAKE`, opcionalmente pode definir a variável de ambiente `COMPOSE_BAKE=true` para builds potencialmente mais rápidos usando o recurso experimental Bake do Docker.

8.  **Executando Testes:**
    Certifique-se de que seu ambiente virtual está ativado ou que o ambiente Docker está em execução.
    ```bash
    pytest
    ```

### Configuração de Desenvolvimento (Windows)

1.  **Clone o repositório:**
    ```bash
    git clone <repository_url>
    # Substitua <repository_url> pela URL real do repositório
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd academichub
    ```
3.  **Crie um ambiente virtual Python:**
    ```bash
    python -m venv venv
    ```
4.  **Ative o ambiente virtual:**
    ```bash
    .\venv\Scripts\activate
    ```
5.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
6.  **Executando a Aplicação (Diretamente com Uvicorn):**
    ```bash
    uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
    ```
    A API estará disponível em `http://localhost:8000`.

7.  **Executando a Aplicação (com Docker Compose):**
    ```bash
    docker-compose up --build
    ```
    A API estará disponível em `http://localhost:8000`.
    *Nota:* Se você observar um aviso sobre `COMPOSE_BAKE`, opcionalmente pode definir a variável de ambiente `COMPOSE_BAKE=true` para builds potencialmente mais rápidos usando o recurso experimental Bake do Docker.

8.  **Executando Testes:**
    ```bash
    pytest
    ```

### GitHub Codespaces

*   Este projeto está configurado para funcionar com o GitHub Codespaces.
*   Ao abrir este repositório em um Codespace, o ambiente de desenvolvimento deve estar amplamente pré-configurado.
*   Siga as instruções padrão de "Configuração de Desenvolvimento (Linux/macOS)" para executar a aplicação e os testes no terminal do Codespaces.
*   As versões necessárias do Docker e Python geralmente estão disponíveis nos ambientes padrão do Codespaces. Se encontrar problemas, certifique-se de que a configuração do seu Codespace os forneça.
*   O encaminhamento de porta para a aplicação (porta 8000) deve ser tratado automaticamente pelo Codespaces ao executar `docker-compose up` ou `uvicorn`.

## Visão Geral dos Endpoints da API

A API do AcademicHub fornece endpoints para gerenciar vários aspectos das oportunidades acadêmicas. Quando a aplicação está em execução, a documentação interativa da API está disponível via:

*   **Swagger UI:** `http://localhost:8000/docs`
*   **ReDoc:** `http://localhost:8000/redoc`

### Endpoints Principais para `OpportunityLifecycle`

Estes endpoints gerenciam os estágios de uma oportunidade acadêmica:

*   `GET /opportunities/lifecycle/`: Recupera o ciclo de vida completo da oportunidade atual (todos os estágios).
*   `GET /opportunities/lifecycle/stages/`: Recupera uma lista de todos os estágios individuais do ciclo de vida.
*   `POST /opportunities/lifecycle/stages/`: Adiciona um novo estágio ao ciclo de vida.
    *   *Corpo (Body):* Objeto `LifecycleStage` (ex: `{"name": "Novo Estágio", "owner": "Admin"}`)
*   `PUT /opportunities/lifecycle/stages/{stage_name}`: Atualiza um estágio existente do ciclo de vida identificado por `stage_name`.
    *   *Corpo (Body):* Objeto `LifecycleStage` com novos detalhes (ex: `{"name": "Nome do Estágio Atualizado", "owner": "Novo Responsável"}`)
*   `DELETE /opportunities/lifecycle/stages/{stage_name}`: Remove um estágio do ciclo de vida pelo seu nome.

## Testes

*   Testes unitários e de integração são escritos usando o framework `pytest`.
*   Os testes estão localizados no diretório `tests/`, espelhando a estrutura de `src/` (`tests/domain` para testes de modelos de domínio, `tests/application` para testes de API).
*   Para executar todos os testes, execute o seguinte comando a partir do diretório raiz do projeto:
    ```bash
    pytest
    ```
*   A cobertura de testes atual inclui os modelos de domínio centrais (`LifecycleStage`, `OpportunityLifecycle`) e os endpoints da API para gerenciamento do ciclo de vida.

## CI/CD

*   A Integração Contínua (CI) é gerenciada pelo GitHub Actions. O workflow é definido em `.github/workflows/main.yml`.
*   O pipeline de CI atual realiza os seguintes passos em cada push ou pull request para o branch `main`:
    1.  Configura o ambiente Python.
    2.  Instala as dependências do projeto a partir de `requirements.txt`.
    3.  Verifica o código usando `flake8` para conformidade de estilo e erros potenciais.
        *   Problemas críticos (erros de sintaxe, nomes não definidos) falharão o build.
        *   Outras questões de estilo são reportadas como avisos.
    4.  Executa a suíte de testes `pytest` para garantir que todos os testes passem.

## Uso do Docker

A aplicação é containerizada usando Docker para ambientes de desenvolvimento e implantação consistentes.

*   **Construir a imagem Docker:**
    ```bash
    docker build -t academichub .
    ```
*   **Executar o contêiner Docker (após construir):**
    ```bash
    docker run -p 8000:8000 academichub
    ```
    Isso iniciará a aplicação, e ela estará acessível em `http://localhost:8000`.

*   **Desenvolvimento com Docker Compose (Recomendado):**
    Para desenvolvimento local, o `docker-compose` está configurado para fornecer recarregamento automático de alterações no código.
    ```bash
    docker-compose up --build
    ```
    Este comando constrói a imagem (se ainda não construída ou se o Dockerfile mudou) e inicia o serviço. A API estará disponível em `http://localhost:8000`.
    *Nota:* Se você observar um aviso sobre `COMPOSE_BAKE`, opcionalmente pode definir a variável de ambiente `COMPOSE_BAKE=true` para builds potencialmente mais rápidos usando o recurso experimental Bake do Docker.

## Contribuição

Contribuições são bem-vindas! Se você gostaria de contribuir, por favor, siga estes passos gerais:

1.  Faça um fork do repositório.
2.  Crie um novo branch para sua funcionalidade ou correção de bug (ex: `git checkout -b feature/nome-da-sua-feature` ou `bugfix/descricao-do-problema`).
3.  Faça suas alterações e commite-as com mensagens claras e descritivas.
4.  Garanta que seu código adere às diretrizes de estilo do projeto (execute `flake8`).
5.  Escreva ou atualize testes para suas alterações e garanta que todos os testes passem (`pytest`).
6.  Envie seu branch para o seu fork.
7.  Submeta um Pull Request (PR) para o branch `main` do repositório original.

Por favor, forneça uma descrição clara de suas alterações no PR.

---
*Este README é um documento vivo e será atualizado conforme o projeto evolui.*
