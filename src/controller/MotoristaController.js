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
            return "Motorista já cadastrado"
        }
    },

    async atualizaMotorista(req) {
        const motorista = await Motoristas.findOne({
            where: { cpf: req.body.cpf }
        });
        if (!motorista) {
            return "Motorista não existe";
        }
        await Motoristas.update({
            nome: req.body.nome,
            cpf: req.body.cpf,
        }, {
            where: {
                cpf: req.body.cpf
            }
        });
        return "Motorista atualizado com sucesso";
    },

    async excluirMotorista(req) {
        const motorista = await Motoristas.findOne({
            where: { cpf: req.params.cpf }
        });
        if (!motorista) {
            return "Motorista não localizado";
        }

        await Motoristas.destroy({
            where: { cpf: req.params.cpf }
        });
        return "Motorista deletado com sucesso";
    },

    async retornaMoristas(req) {
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

        if (retorno.length == 0) {
            return "Motorista não localizado"
        }
        return retorno;
    }
}