const express = require("express")
var moment = require('moment');

const Automoveis = require("../model/Automoveis")
const Motoristas = require("../model/Motoristas");
const AutomoveisUtilizados = require("../model/AltomoveisUtilizados");

module.exports = {

    async cadastraUsuarioAutomovel(req) {
        let dataInicio = req.body.data_inicio ? req.body.data_inicio : moment().format('YYYY-MM-DD HH:mm:ss');
        let dataTermino = req.body.data_termino ? req.body.data_termino : null;
        let placa = req.body.placa;
        let motorista = req.body.motorista_id;

        const validaPlaca = await this.validaautomovel(placa, dataInicio);
        const validarMotorista = await this.validaMotorista(motorista, dataInicio);

        if (validaPlaca == "NOK" || validarMotorista == "NOK") {
            return "Este Automovel está sendo utilizado ou este Motorista está empenhado"
        } else {
            const retorno = await AutomoveisUtilizados.create({
                motorista_id: req.body.motorista_id,
                placa: req.body.placa,
                data_inicio: dataInicio,
                data_termino: dataTermino,
                motivo: req.body.motivo,
            })
            return retorno
        }
    },

    async inserirDataTermino(req) {
        const verificarData = await this.verificaData(req.body.id, req.body.data_termino);
        if (verificarData == true) {
            await AutomoveisUtilizados.update({
                data_termino: this.tratarDada(req.body.data_termino),
            }, {
                where: {
                    id: req.body.id
                }
            });
            return "Data de termino inserida com sucesso"
        }
        return "Data termino não pode ser menor que a data inicio"
    },

    async retornoAutomoveisUtilizados() {
        const retorno = await AutomoveisUtilizados.findAll({
            include: [
                { model: Motoristas, attributes: ['nome'] },
                { model: Automoveis, attributes: ['cor', 'placa', 'marca'] }
            ]
        });
        return retorno;
    },

    async verificaData(id, termino) {
        const verificaData = await AutomoveisUtilizados.findOne({
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

    async validaautomovel(placa, dataInicio) {
        const dados = await AutomoveisUtilizados.findAll({
            where: {
                placa: placa,
            },
            attributes: ['data_inicio', 'data_termino']
        })
        const retorno = this.validacao(dados, dataInicio);
        return retorno;
    },


    async validaMotorista(idMotorista, dataInicio) {
        const dados = await AutomoveisUtilizados.findAll({
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