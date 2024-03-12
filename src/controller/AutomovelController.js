const Automoveis = require("../model/Automoveis")

module.exports = {

    async inserirAutomovel(req) {
        try {
            const retorno = await Automoveis.create({
                placa: req.body.placa,
                cor: req.body.cor,
                marca: req.body.marca,
            })
            return retorno
        } catch (error) {
            return "Placa já foi cadastrada"
        }
    },

    async atualizarAutomovel(req) {
        const automovel = await Automoveis.findOne({
            where: { placa: req.body.placa, }
        });
        if (!automovel) {
            return "Automóvel não Exite";
        }
        await Automoveis.update({
            placa: req.body.placa,
            cor: req.body.cor,
            marca: req.body.marca,
        }, {
            where: {
                placa: req.body.placa
            }
        });
        return "Automável Atualizado com sucesso";
    },

    async excluiAutomovel(req) {
        const automovel = await Automoveis.findOne({
            where: { placa: req.params.placa, }
        });
        if (!automovel) {
            return "Automóvel não Localizado";
        }
        await Automoveis.destroy({
            where: {
                placa: req.params.placa
            }
        });
        return 'Automóvel Excluído com sucesso';
    },

    async recuperaAutomovel(req) {

        const { marca, cor } = req.query;
        let where = {};
        if (marca) {
            where.marca = marca;
        }
        if (cor) {
            where.cor = cor;
        }
        const retorno = await Automoveis.findAll({ where });

        if (retorno.length == 0) {
            return "Automóvel não localizado"
        }
        return retorno;
    }
}