const Motoristas = require("../model/Motoristas")
const { Op } = require("sequelize");

module.exports = {

    async cadastrarMotorista(req) {
        try {
            const retorno = await Motoristas.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
            })
            return retorno;
        }
        catch (error) {
            return "Motorista já cadastado"
        }
    },

    async atualizaMotorista(req) {
        try {
            await Motoristas.update({
                nome: req.body.nome,
                cpf: req.body.cpf,
            }, {
                where: {
                    motorista_id: req.body.motorista_id
                }
            });
            return "Motorista atualizado com sucesso";

        } catch (error) {
            return "CPF Invalido"
        }
    },

    async excluirMotorista(req) {
        await Motoristas.destroy({
            where: {
                cpf: req.params.cpf
            }
        });
        return "Motorista deletado com sucesso";
    },

    async retornaMoristas(req) {
        try {
            const { nome, cpf } = req.query;
            let where = {};
            if (nome) {
                where.nome = {
                    [Op.like]: `%${nome}%`
                };
            }
            if (cpf) {
                where.cpf = cpf
            }
            const retorno = await Motoristas.findAll({ where });
            return retorno;

        } catch (error) {
            return "Motorista não localizado"
        }
    }
}