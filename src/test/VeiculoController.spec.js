const Veiculos = require("../controller/VeiculoController");

describe("Testes para funções do módulo Automovel", () => {
    describe("cadastrarMotorista", () => {
        it("deve cadastrar um Automóvel com sucesso", async () => {
            const req = {
                body: {
                    placa: "VEI0101",
                    cor: "preto",
                    marca: "Mercedes"
                },
            };

            const resultado = await Veiculos.inserirVeiculo(req);

            expect(typeof resultado).toBe("object");
            expect(resultado.placa).toBe("VEI0101");
            expect(resultado.cor).toBe("preto");
            expect(resultado.marca).toBe("Mercedes");
        });
    });

    it("deve retornar 'Placa já foi cadastrada' se a placa já existir nos cadastros", async () => {

        const req = {
            body: {
                placa: "PQR1234",
                cor: "preto",
                marca: "Mercedes"
            },
        };

        const resultado = await Veiculos.inserirVeiculo(req);

        expect(typeof resultado).toBe("string");
        expect(resultado).toBe("Placa já foi cadastrada");
    });

    describe("Excluir Automóvel", () => {
        it("deve excluir um automovel existente com sucesso", async () => {
            const req = {
                params: {
                    placa: "VEI0101",
                },
            };

            const resultado = await Veiculos.excluiVeiculo(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel Excluído com sucesso");
        });

        it("deve retornar 'Automóvel não Localizado' se o automovel não existir", async () => {
            const req = {
                params: {
                    placa: "NNO7890",
                },
            };
            const resultado = await Veiculos.excluiVeiculo(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel não Localizado");
        });
    });

    describe("atualizarVeiculo", () => {
        it("deve Atualizar um Automóvel com sucesso", async () => {
            // Simula a atualização da cor do automóvel.
            const req = {
                body: {
                    placa: "MNO7890",
                    cor: "preto",
                    marca: "Hyundai"
                },
            };

            const resultado = await Veiculos.atualizarVeiculo(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automável Atualizado com sucesso");
        });

        it("deve retornar 'Automóvel não Exite' inserção de pplaca auterada", async () => {
            const req = {
                body: {
                    placa: "NNO7890",
                    cor: "preto",
                    marca: "Hyundai"
                },
            };

            const resultado = await Veiculos.atualizarVeiculo(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel não Exite");
        });
    });

    describe("Retorna Automóveis", () => {
        it("deve retornar Automóvel com base na Cor e Marca", async () => {
            // Simule uma requisição pelo nomeo, pode ser feito tb com partes do nome por exemplo "ilva"     
            const req = {
                query: {
                    cor: "Preto",
                    marca: "Honda"
                },
            };

            const resultado = await Veiculos.recuperaAutomovel(req);

            expect(Array.isArray(resultado)).toBe(true);
            resultado.forEach((automovel) => {
                expect(automovel).toHaveProperty("cor");
                expect(automovel).toHaveProperty("marca");
                expect(automovel.cor).toContain("Preto");
                expect(automovel.marca).toContain("Honda");
            });
        });

        it("deve retornar um array de Automóveis com base na Cor", async () => {
            // Simule uma requisição com uma cor
            const req = {
                query: {
                    cor: "Azul",
                },
            };

            const resultado = await Veiculos.recuperaAutomovel(req);

            expect(Array.isArray(resultado)).toBe(true);

            resultado.forEach((automovel) => {
                expect(automovel).toHaveProperty("cor");
                expect(automovel.cor).toBe("Azul");
            });
        });


        it("deve retornar um array de Automóveis com base na Marca", async () => {
            // Simule uma requisição com uma Marca
            const req = {
                query: {
                    marca: "Toyota",
                },
            };

            const resultado = await Veiculos.recuperaAutomovel(req);

            expect(Array.isArray(resultado)).toBe(true);

            resultado.forEach((automovel) => {
                expect(automovel).toHaveProperty("marca");
                expect(automovel.marca).toBe("Toyota");
            });
        });

        it("deve retornar mensagem de 'Automóvel não localizado'", async () => {
            // Simule uma requisição de cor não existe na Base
            const req = {
                query: {
                    cor: "Verde",
                    marca: "Honda"
                },
            };

            const resultado = await Veiculos.recuperaAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel não localizado");
        });
    });
});