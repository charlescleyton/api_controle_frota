const Veiculos = require("../model/Veiculos")

module.exports = {

    async inserirVeiculo(req) {
        try {
            const retorno = await Veiculos.create({
                placa: req.body.placa,
                cor: req.body.cor,
                marca: req.body.marca,
            })
            return retorno
        } catch (error) {
            return "Placa já foi cadastrada"
        }
    },

    async atualizarVeiculo(req) {
        const veiculo = await Veiculos.findOne({
            where: { placa: req.body.placa, }
        });
        if (!veiculo) {
            return "Automóvel não Exite";
        }
        await Veiculos.update({
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

    async excluiVeiculo(req) {
        const veiculo = await Veiculos.findOne({
            where: { placa: req.params.placa, }
        });
        if (!veiculo) {
            return "Automóvel não Localizado";
        }
        await Veiculos.destroy({
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
        const retorno = await Veiculos.findAll({ where });

        if (retorno.length == 0) {
            return "Automóvel não localizado"
        }
        return retorno;
    }
}