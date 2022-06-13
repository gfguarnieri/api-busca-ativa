# 1 - API do Busca Ativa Escolar
API responsável por lidar com as informações do sistema <a href="https://github.com/gfguarnieri/webBuscaAtiva">**Busca Ativa Escolar**</a>

## 1.1 - Tecnologias utilizadas
A criação dessa API envolveu as seguintes tecnologias:
* Node.js;
* PostgreSQL para Banco de Dados;
* Docker para conteinerização;
* Swagger para documentação;
* JEST para testes unitários e de integração.

# 2 - Análise de Requisitos
A análise de requisitos foi desenvolvida através de entrevistas com uma orientadora educacional que atualmente é responsável pela busca ativa de alunos em uma escola técnica.

## 2.1 - Requisitos funcionais
* [x] Deverá permitir o CRUD de cursos; 
* [x] Deverá permitir o CRUD de turmas; 
* [x] Deverá permitir o CRUD de alunos; 
* [x] Deverá permitir o CRUD de conversações;
* [x] Deverá permitir a filtragem da alunos pelo id da turma;
* [ ] Deverá permitir a visualização da quantidade de anotações de cada aluno pelo ID;
* [x] Deverá permitir o login do admin;
* [ ] Deverá permitir o logoff do admin;
* [ ] Deverá permitir a geração de relatórios de atendimentos por turma, definindo intervalo de datas entre os atendimentos;
* [ ] Deverá permitir a importação de alunos para cada turma (padrão CSV);

## 2.2 - Requisitos não funcionais
* [x] Criar projeto no padrão SOLID;
* [x] Estruturar projeto de forma que fique escalável, possibilitando a adição de novos recursos posteriores ou troca de dependência de banco de dados (por exemplo);
* [x] Utilizar JWT (JSON Web Token) como forma de validar o acesso do usuário;
* Utilizar o multer para upload de arquivos CSV (para importação de alunos por turma);
* [x] Utilizar bcryptjs para geração de hash da senha do usuário; 
* [x] Utilizar Docker como ambiente de desenvolvimento;
* [x] Criar testes unitários utilizando JEST;
* [x] Desenvolver no modelo TDD (Test-driven development);
* [x] Trabalhar Migrations para facilitar futuras manutenções no banco de dados;

## 2.3 - Regras de negócio
* [x] Não poderá realizar CRUD de turmas, alunos, cursos e anotações caso o usuário não esteja logado com um token válido (middlewares);
* [x] Não poderá adicionar cursos com nomes já existentes;
* [x] Não poderá adicionar turma sem informar um curso válido;
* [x] Não poderá adicionar aluno sem informar uma turma válida; 
* [x] Não poderá adicionar anotações sem informar um aluno válido;
* [ ] Não poderá adicionar um arquivo de tipo inválido; 

## 2.4 - Modelagem Lógica da Aplicação
Modelagem lógica da aplicação com base no levantamento da análise de requisitos:

# 3 - Preparando o ambiente
Para iniciar a execução da API é necessário:
- Node.js
- Docker e Docker Compose

Clonar o repositório:
```sh
clone https://github.com/gfguarnieri/api-busca-ativa
```

Após clonar o repositório:
```sh
cd api-busca-ativa
```
 Com a pasta aberta, executar o comando abaixo para baixar todas as dependências:
```sh
yarn
```
**Observação:** Se ainda não tiver o ``yarn`` instalado, executar antes o comando ``npm install --global yarn`` 


### 3.1 - Executando a API
Depois de clonar o repositório da API e acessar a pasta, é possível iniciar os containers utilizando o seguinte comando:

```sh
docker-compose up
```
>Por padrão o servidor ficará disponível no endereço ``http://localhost:3333`` 

Para parar a execução dos containers:
```sh
docker-compose stop
```

# 4 - Documentação
Acessar  ``/api-docs`` para visualizar a documentação completa da API.

# 5 - Sugestões ou contribuições?
Tem alguma ideia ou gostaria de fazer alguma contribuição? Entre em contato comigo (:
Email: gfguarnieri@hotmail.com
[Giovani Guarnieri (Portfólio pessoal)](https://www.giovanniguarnieri.com.br)
