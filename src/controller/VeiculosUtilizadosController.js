const express = require("express")
var moment = require('moment');

const Veiculos = require("../model/Veiculos")
const Motoristas = require("../model/Motoristas");
const VeiculosUtilizados = require("../model/VeiculosUtilizados");

module.exports = {

    async retornoVeiculosUtilizados() {
        const retorno = await VeiculosUtilizados.findAll({
            include: [
                { model: Motoristas, attributes: ['nome'] },
                { model: Veiculos, attributes: ['cor', 'placa', 'marca'] }
            ]
        });
        return retorno;
    },

    async inserirDataTermino(req) {
        const verificarData = await this.verificaData(req.body.id, req.body.data_termino);
        if (verificarData == true) {
            await VeiculosUtilizados.update({
                data_termino: this.tratarDada(req.body.data_termino),
            }, {
                where: {
                    id: req.body.id
                }
            });
            return "Data de termino inserida com sucesso"
        }
        return "Data de termino não pode ser menor que a data de inicio"
    },


    async verificaData(id, termino) {
        const verificaData = await VeiculosUtilizados.findOne({
            where: {
                id: id
            },
        })
        let dataInicio = this.tratarDada(verificaData.data_inicio);
        if (termino > dataInicio) {
            return true;
        }
        return false;
    },


    async cadastraUsuarioVeiculo(req) {
        let dataInicio = req.body.data_inicio ? req.body.data_inicio : moment().format('YYYY-MM-DD HH:mm:ss');
        let dataTermino = req.body.data_termino ? req.body.data_termino : null;
        let placa = req.body.placa;
        let motorista = req.body.motorista_id;

        const validaPlaca = await this.validaVeiculo(placa, dataInicio);
        const validarMotorista = await this.validaMotorista(motorista, dataInicio);

        if (validaPlaca == "NOK" || validarMotorista == "NOK") {
            return "Verifique as condições para validação"
        } else {
            const retorno = await VeiculosUtilizados.create({
                motorista_id: req.body.motorista_id,
                placa: req.body.placa,
                data_inicio: dataInicio,
                data_termino: dataTermino,
                motivo: req.body.motivo,
            })
            return retorno
        }
    },

    async validaVeiculo(placa, dataInicio) {
        const dados = await VeiculosUtilizados.findAll({
            where: {
                placa: placa,
            },
            attributes: ['data_inicio', 'data_termino']
        })
        const retorno = this.validacao(dados, dataInicio);
        return retorno;
    },


    async validaMotorista(idMotorista, dataInicio) {
        const dados = await VeiculosUtilizados.findAll({
            where: {
                motorista_id: idMotorista,
            },
            attributes: ['data_inicio', 'data_termino']
        })
        const retorno = this.validacao(dados, dataInicio)
        return retorno;
    },

    validacao(dados, inicio) {
        let retorno = "OK";
        dados.forEach(dado => {
            let dataInicio = inicio ? this.tratarDada(inicio) : moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let dataTermino = dado.data_termino ? this.tratarDada(moment(dado.data_termino)) : null;
            if (dataInicio < dataTermino || dataTermino == null) {
                retorno = "NOK";
            } else {
                retorno = "OK";
            }
        });
        return retorno;
    },

    tratarDada(data) {
        return moment(new Date(data)).format('YYYY-MM-DD HH:mm:ss');
    }

}