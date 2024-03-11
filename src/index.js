const express = require("express")
const { Op } = require("sequelize");
var moment = require('moment');

const VeiculoController = require("./controller/VeiculoController");
const MotoristaController = require("./controller/MotoristaController");
const VeiculosUtilizadosController = require("./controller/VeiculosUtilizadosController");


const app = express()
app.use(express.json())
const porta = 3001

// Cadastro de automóvel:  
app.post("/inserir_automovel", async (req, res) => {
    const retorno = await VeiculoController.inserirVeiculo(req)
    res.send(retorno)
})

app.put('/atualizar_veiculo', async (req, res) => {
    const retorno = await VeiculoController.atualizarVeiculo(req)
    res.send(retorno)
})

app.delete('/deletar_veiculo/:placa', async (req, res) => {
    const retorno = await VeiculoController.excluiVeiculo(req)
    res.send(retorno)
})

app.get("/retornar_veiculos", async (req, res) => {
    const retorno = await VeiculoController.recuperaAutomovel(req)
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
    const retorno = await VeiculosUtilizadosController.inserirDataTermino(req);
    res.send(retorno)
})


// Utilização de um Automóvel
app.post("/cadastar_usuario_veiculo", async (req, res) => {
 const retorno = await VeiculosUtilizadosController.cadastraUsuarioVeiculo(req);
 res.send(retorno);
})

app.get("/retornar_veiculos_utilizados", async (req, res) => {
    const retorno = await VeiculosUtilizadosController.retornoVeiculosUtilizados(req);
    res.send(retorno);
});

app.listen(porta, () => {
    console.log(`Porta funcionando: ${porta}`)
})


