const AutomoveisUtilizados = require('../controller/AutomoveisUtilizadosController')

describe("Testes para funções do módulo AutomoveisUtilizados", () => {

    describe("cadastrar Uso Motorista de Automovel", () => {
        it("deve cadastrar um Motorista para um Automóvel com sucesso", async () => {
            const req = {
                body: {
                    motorista_id: 1,
                    placa: "GHI9012",
                    data_inicio: "2024-01-05 17:00:00",
                    motivo: "Buscar funcionario Aeroporto"
                },
            };

            const resultado = await AutomoveisUtilizados.cadastraUsuarioAutomovel(req);

            expect(typeof resultado).toBe("object");
            expect(resultado.motorista_id).toBe(1);
            expect(resultado.placa).toBe("GHI9012");
            expect(resultado.motivo).toBe("Buscar funcionario Aeroporto");
        });

        it("deve retornar 'Este Automovel está sendo uti....' se a data de Termino for menor do que a data de inicio", async () => {
            // Simula Resposta Negativa em caso de inserção de Motorista que esteja utilizando outro veiculo na data ou 
            // o veículo esteja sendo utlizado por outro motorista.
            const req = {
                body: {
                    motorista_id: 3,
                    placa: "JKL3456",
                    data_inicio: "2024-01-01 17:00:00",
                    motivo: "Testando retorno negativo"
                },
            };

            const resultado = await AutomoveisUtilizados.cadastraUsuarioAutomovel(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Este Automovel está sendo utilizado ou este Motorista está empenhado");
        });
    });

    describe("Inserir Data Termino", () => {
        it("deve inserir a data de termino do automovel utilizado com sucesso", async () => {
            const req = {
                body: {
                    id: 4,
                    data_termino: "2024-01-05 17:00:00",
                },
            };

            const resultado = await AutomoveisUtilizados.inserirDataTermino(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Data de termino inserida com sucesso");

        });
        
        it("deve falhar ao inserir a data de termino do automovel utilizado com sucesso", async () => {
            // Simula a inserção de data termino menor que a data inicio causando a recusa.
            const req = {
                body: {
                    id: 3,
                    data_termino: "2024-01-02 17:00:00",
                },
            };

            const resultado = await AutomoveisUtilizados.inserirDataTermino(req);

            expect(typeof resultado).toBe("string");
            expect(resultado).toBe("Data termino não pode ser menor que a data inicio");

        });
    });
});