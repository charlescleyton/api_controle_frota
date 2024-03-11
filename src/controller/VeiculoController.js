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
            return "Este Veículo já foi cadastrado"
        }
    },

    async atualizarVeiculo(req) {
        await Veiculos.update({
            placa: req.body.placa,
            cor: req.body.cor,
            marca: req.body.marca,
        }, {
            where: {
                placa: req.body.placa
            }
        });
        return "Veículo Atualizado com sucesso";
    },

    async excluiVeiculo(req){
        await Veiculos.destroy({
            where: {
                placa: req.params.placa
            }
        });
        return 'Veiculo Deletado com sucesso';
    },

    async recuperaAutomovel(req){
        const { marca, cor } = req.query;
        let where = {};
        if (marca) {
            where.marca = marca;
        }
        if (cor) {
            where.cor = cor;
        }
        const retorno = await Veiculos.findAll({ where });
        return retorno;
    }
}