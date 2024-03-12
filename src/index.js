const express = require("express")
const { Op } = require("sequelize");
var moment = require('moment');

const AutomovelController = require("./controller/AutomovelController");
const MotoristaController = require("./controller/MotoristaController");
const AutomoveisUtilizadosController = require("./controller/AutomoveisUtilizadosController");


const app = express()
app.use(express.json())
const porta = 3001

// Cadastro de automóvel:  
app.post("/inserir_automovel", async (req, res) => {
    const retorno = await AutomovelController.inserirAutomovel(req)
    res.send(retorno)
})

app.put('/atualizar_automovel', async (req, res) => {
    const retorno = await AutomovelController.atualizarAutomovel(req)
    res.send(retorno)
})

app.delete('/deletar_automovel/:placa', async (req, res) => {
    const retorno = await AutomovelController.excluiAutomovel(req)
    res.send(retorno)
})

app.get("/retornar_automoveis", async (req, res) => {
    const retorno = await AutomovelController.recuperaAutomovel(req)
    res.send(retorno)
})


// Cadastro de Motorista:  
app.post("/cadastar_motorista", async (req, res) => {
    const retorno = await MotoristaController.cadastrarMotorista(req)
    res.send(retorno)
})

app.put('/atualizar_motorista', async (req, res) => {
    const retorno = await MotoristaController.atualizaMotorista(req)
    res.send(retorno)
})

app.delete('/excluir_motorista/:cpf', async (req, res) => {
    const retorno = await MotoristaController.excluirMotorista(req)
    res.send(retorno);
})

app.get("/retornar_motoristas", async (req, res) => {
    const retorno = await MotoristaController.retornaMoristas(req)
    res.send(retorno);
});

app.put('/iserir_termino', async (req, res) => {
    const retorno = await AutomoveisUtilizadosController.inserirDataTermino(req);
    res.send(retorno)
})


// Utilização de um Automóvel
app.post("/cadastar_usuario_automovel", async (req, res) => {
 const retorno = await AutomoveisUtilizadosController.cadastraUsuarioAutomovel(req);
 res.send(retorno);
})

app.get("/retornar_automoveis_utilizados", async (req, res) => {
    const retorno = await AutomoveisUtilizadosController.retornoAutomoveisUtilizados(req);
    res.send(retorno);
});

app.listen(porta, () => {
    console.log(`Porta funcionando: ${porta}`)
})


