const Motoristas = require("../controller/MotoristaController");

describe("Testes para funções do módulo Motoristas", () => {
  describe("cadastrarMotorista", () => {
    it("deve cadastrar um motorista com sucesso", async () => {
      const req = {
        body: {
          nome: "Charles CLeyton",
          cpf: "32546789132"
        },
      };

      const resultado = await Motoristas.cadastrarMotorista(req);

      expect(typeof resultado).toBe("object");
      expect(resultado.nome).toBe("Charles CLeyton");
      expect(resultado.cpf).toBe("32546789132");
    });

    it("deve retornar 'Motorista já cadastrado' se o motorista já existir", async () => {
      const req = {
        body: {
          nome: "Maria Oliveira",
          cpf: "98765432100"
        },
      };

      const resultado = await Motoristas.cadastrarMotorista(req);

      expect(typeof resultado).toBe("string");
      expect(resultado).toBe("Motorista já cadastrado");
    });
  });

  describe("excluirMotorista", () => {
    it("deve excluir um motorista existente com sucesso", async () => {
      const req = {
        params: {
          cpf: "98765432546",
        },
      };

      const resultado = await Motoristas.excluirMotorista(req);

      expect(typeof resultado).toBe("string");
      expect(resultado).toBe("Motorista deletado com sucesso");
    });

    it("deve retornar 'Motorista não localizado' se o motorista não existir", async () => {
      const req = {
        params: {
          cpf: "98765432109",
        },
      };
      const resultado = await Motoristas.excluirMotorista(req);

      expect(typeof resultado).toBe("string");
      expect(resultado).toBe("Motorista não localizado");
    });
  });

  describe("atualizaMotorista", () => {
    it("deve atualizar um motorista existente com sucesso", async () => {
      const req = {
        body: {
          nome: "Charles Gomes",
          cpf: "32546789132"
      }
      };

      const resultado = await Motoristas.atualizaMotorista(req);

      expect(typeof resultado).toBe("string");
      expect(resultado).toBe("Motorista atualizado com sucesso");
    });

    it("deve retornar 'Motorista não existe' se o motorista não existir", async () => {
      const req = {
        body: {
          nome: "Charles Gomes",
          cpf: "3254678913"
      },
      };
      const resultado = await Motoristas.atualizaMotorista(req);

      expect(typeof resultado).toBe("string");
      expect(resultado).toBe("Motorista não existe");
    });
  });


  describe("retornaMoristas", () => {
    it("deve retornar um array de motoristas com base no nome", async () => {
       // Simule uma requisição pelo nomeo, pode ser feito tb com partes do nome por exemplo "ilva"     
      const req = {
        query: {
          nome: "Silva",
        },
      };

      const resultado = await Motoristas.retornaMoristas(req);

      expect(Array.isArray(resultado)).toBe(true);
      resultado.forEach((motorista) => {
        expect(motorista).toHaveProperty("nome");
        expect(motorista.nome).toContain("Silva");
      });
    });

    it("deve retornar um array de motoristas com base no CPF", async () => {
      // Simule uma requisição com um CPF
      const req = {
        query: {
          cpf: "12345678901",
        },
      };

      const resultado = await Motoristas.retornaMoristas(req);

      expect(Array.isArray(resultado)).toBe(true);

      resultado.forEach((motorista) => {
        expect(motorista).toHaveProperty("cpf");
        expect(motorista.cpf).toBe("12345678901");
      });
    });

    it("deve retornar 'Motorista não localizado' se nenhum motorista for encontrado", async () => {
      // Simule uma requisição com CPF invalido, pode ser feito tb com nome invalido ou vazio
      const req = {
        query: {nome: "tal"},
      };

      const resultado = await Motoristas.retornaMoristas(req);

      expect(typeof resultado).toBe("string");
      expect(resultado).toBe("Motorista não localizado");
    });
  });

});
