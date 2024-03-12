# Aplicação Controle de Frota

Conforme solicitado em documento o framewark usado para as requisições HTTP foi o [Express](https://expressjs.com/), outras bibliotecas foram utilizadas para conectar a API ao banco de dados Mysql ([Mysql2](https://sidorares.github.io/node-mysql2/pt-BR/docs) e [Sequelizer](https://sequelize.org/)).

A API segue os critérios solicitados pela empresa requerente seguindo criterios de boas praticas.

obs:

* Esta API possibilita a consulta do motorista pelo **CPF**, pelo **nome**, **parte do nome** (em caso não tenha o nome completo);
* Permite consultar o automovel pela **Marca e Cor** podendo também consultar apenas pela **cor** ou apenas pela **marca**.

## Instruções para execução da aplicação

Copie o .env.example para .env (.env-example da raiz já esta com o exemplo de credenciais, pode-se manter as mesmas ou alterar conforme ambiente)

### Instalando as dependencias:

Para instalar as dependencias execute o comando a seguir:

`npm install`

### Banco de dados

Para facilitar os testes da API, preparei arquivos de comandos MySQL com os dados usada eu meus teste. Estes arquivos encontram se
na pasta src/config:

* Arquivo Tabela - este arquivo cria a Base de Dados como nome api_controle_frota;
* Arquivo inserçao - insere dados nas tabelas motoristas, automoveis e automoveis_utiilizados.

### Testes da Aplicacao

###### Instalando o Framewor [JEST](https://jestjs.io/pt-BR/) e o [Supertest](https://ladjs.github.io/superagent/):

`npm install --save-dev jest supertest`

###### Rodando os testes:

`npm test`

### Rotas da Aplicação

##### Cadastro de Automoveis

###### POST - `localhost:3001/inserir_automovel`

* Inserir novo automovel exemplo request:

```
 {
    "placa": "VEI0101",
    "cor":"preto",
    "marca":"Mercedes"
 }
```

###### PUT - `localhost:3001/atualizar_automovel`

* Atualizar Automovel exemplo request:

```
{
    "placa": "VEI0101",
    "cor":"branco",
    "marca":"Mercedes"
 }
```

###### DELETE - `localhost:3001/deletar_automovel/VEI0101`

* Para deletar insira a placa do automóvel;

###### GET - Recupera Automoveis

* Recupera todos os Automoveis Cadastrados - `localhost:3001/retornar_automoveis`
* Recupera Automovel por marca - `localhost:3001/retornar_automoveis?marca=chevrolet`
* Recupera Automovel por Cor - `localhost:3001/retornar_automoveis?cor=branco`
* Recupera Automovel por Cor e Marca - `http://127.0.0.1:3001/retornar_automoveis?cor=branco&marca=chevrolet`

##### Cadastro de Motorista:

###### POST -  `localhost:3001/cadastar_motorista`

* Inserir novo motorista exemplo request:

```
{
    "nome":"Josias Celestino",
    "cpf":"45678901234"
}
```

###### PUT - `localhost:3001/atualizar_motorista`

* Atualizar motorista exemplo request:

```
{
    "motorista_id": 5,
    "nome": "Pedro de Oliveira",
    "cpf": "56789012345"
}
```

###### DELETE - `localhost:3001//excluir_motorista/56789012345`

* Para deletar insira o CPF do motorista;

###### GET - Recupera Motoristas

* Recupera todos motoristas - `localhost:3001/retornar_motoristas`
* Recupera motorista por CPF - `localhost:3001/retornar_motoristas?cpf=....`
* Recupera motorista por nome ou **parte do nome** - `localhost:3001/retornar_motoristas?nome=...`

##### Utilização de um Automóvel

###### POST - `localhost:3001/cadastar_usuario_automovel`

* Cadastrar utilizacao do Automovel
  * exemplo request

```
{
    "motorista_id": 1,
    "placa": "GHI9012",
    "data_inicio": "2024-01-05 17:00:00",
    "data_termino": null,
    "motivo": "Buscar funcionario Aeroporto"
}
```

###### PUT -` localhost:3001/iserir_termino`

* Insere data de termino do uso do Automovel
  * exemplo request

```
{
    "id": 4,
    "data_termino": "2024-01-05 07:00:00"
}
```

###### GET - `localhost:3001/retornar_automoveis_utilizados`

* Retorna todos os automoveis utilizados
