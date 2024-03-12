const Automoveis = require("../controller/AutomovelController");

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

            const resultado = await Automoveis.inserirAutomovel(req);

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

        const resultado = await Automoveis.inserirAutomovel(req);

        expect(typeof resultado).toBe("string");
        expect(resultado).toBe("Placa já foi cadastrada");
    });

    describe("Excluir Automóvel", () => {
        it("deve excluir um automovel existente com sucesso", async () => {
            const req = {
                params: {
                    placa: "MNO7890",
                },
            };

            const resultado = await Automoveis.excluiAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel Excluído com sucesso");
        });

        it("deve retornar 'Automóvel não Localizado' se o automovel não existir", async () => {
            // Simula a exclusão de um veiculo com Placa que não existe em vez de iniciar com 'J' 
            // inseriu a letra 'N' propositalmente para induzir o retorno. 
            const req = {
                params: {
                    placa: "NKL3456",
                },
            };
            const resultado = await Automoveis.excluiAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel não Localizado");
        });
    });

    describe("Atualizar Automovel", () => {
        it("deve Atualizar um Automóvel com sucesso", async () => {
            // Simula a atualização da cor do automóvel de 'Branco'para 'Prata'. 
            const req = {
                body: {
                    placa: "JKL3456",
                    cor: "Prata",
                    marca: "Toyota"
                },
            };

            const resultado = await Automoveis.atualizarAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automável Atualizado com sucesso");
        });

        it("deve retornar 'Automóvel não Exite' inserção de pplaca auterada", async () => {
            // Simula a atualização de um veiculo com Placa que não existe em vez de iniciar com 'M' 
            // inseriu a letra 'N' propositalmente para induzir o retorno. 
            const req = {
                body: {
                    placa: "NKL3456",
                    cor: "Branco",
                    marca: "Toyota"
                },
            };

            const resultado = await Automoveis.atualizarAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel não Exite");
        });
    });

    describe("Retorna Automóveis", () => {
        it("deve retornar Automóvel com base na Cor e Marca", async () => {
            // Simule uma requisição pela Cor e Marca     
            const req = {
                query: {
                    cor: "Preto",
                    marca: "Honda"
                },
            };

            const resultado = await Automoveis.recuperaAutomovel(req);

            expect(Array.isArray(resultado)).toBe(true);
            resultado.forEach((automovel) => {
                expect(automovel).toHaveProperty("cor");
                expect(automovel).toHaveProperty("marca");
                expect(automovel.cor).toContain("Preto");
                expect(automovel.marca).toContain("Honda");
            });
        });

        it("deve retornar um Automóveis com base na Cor", async () => {
            const req = {
                query: {
                    cor: "Azul",
                },
            };

            const resultado = await Automoveis.recuperaAutomovel(req);

            expect(Array.isArray(resultado)).toBe(true);

            resultado.forEach((automovel) => {
                expect(automovel).toHaveProperty("cor");
                expect(automovel.cor).toBe("Azul");
            });
        });


        it("deve retornar um Automóveis com base na Marca", async () => {
            const req = {
                query: {
                    marca: "Toyota",
                },
            };

            const resultado = await Automoveis.recuperaAutomovel(req);

            expect(Array.isArray(resultado)).toBe(true);

            resultado.forEach((automovel) => {
                expect(automovel).toHaveProperty("marca");
                expect(automovel.marca).toBe("Toyota");
            });
        });

        it("deve retornar mensagem de 'Automóvel não localizado'", async () => {
            // Simule uma requisição de cor que não existe na Base
            const req = {
                query: {
                    cor: "Verde",
                    marca: "Honda"
                },
            };

            const resultado = await Automoveis.recuperaAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Automóvel não localizado");
        });
    });
});