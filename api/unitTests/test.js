import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user.js";

// Mock do banco de dados para evitar interações reais com o banco
jest.mock("../db", () => ({
  db: {
    query: jest.fn(),
  },
}));

//Teste do getUser
describe("getUsers", () => {
  it("retornando dados do banco de dados", () => {
    const mockResponse = [{ id: 1, nome_PJ_PF: "Teste", valor: 100 }];

    // Configurar o mock para simular um retorno do banco de dados
    require("../db").db.query.mockImplementationOnce((query, callback) => {
      callback(null, mockResponse);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    getUsers(null, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
  });

  it("lidando com erros de banco de dados", () => {
    const mockError = new Error("Database error");

    // Configurar o mock para simular um erro do banco de dados
    require("../db").db.query.mockImplementationOnce((query, callback) => {
      callback(mockError, null);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    getUsers(null, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockError);
  });
});

//Teste do addUser
describe("addUser", () => {
    it("adicionando um novo usuário ao banco de dados", () => {
      const mockRequest = {
        body: {
          id_cliente: 1,
          nome_PJ_PF: "teste",
          valor: 5000,
          vencimento_boleto: "2023-12-31",
          endereco: "R. teste, 123",
          produtos: "muitos produtos",
        },
      };
  
      // Configurar o mock para simular um sucesso do banco de dados
      require("../db").db.query.mockImplementationOnce((query, values, callback) => {
        callback(null);  // Sem erro
      });
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(),
      };
  
      addUser(mockRequest, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith("Usuário criado com sucesso");
    });
  
    it("erros de banco de dados", () => {
      const mockRequest = {
        body: {
            id_cliente: 1,
            nome_PJ_PF: "test",
            valor: 5000,
            vencimento_boleto: "2023-12-31",
            endereco: "R. teste, 123",
            produtos: "muitos produtos",
        },
      };
  
      const mockError = new Error("Database error");
  
      // Configurar o mock para simular um erro do banco de dados
      require("../db").db.query.mockImplementationOnce((query, values, callback) => {
        callback(mockError);
      });
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(),
      };
  
      addUser(mockRequest, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith("Erro ao criar usuário");
    });
  });

  // Teste do updateUser
describe("updateUser", () => {
    it("atualizando um usuário no banco de dados", () => {
      const mockRequest = {
        params: {
          id_cliente: 1,
        },
        body: {
          nome_PJ_PF: "novoTeste",
          valor: 6000,
          vencimento_boleto: "2023-12-31",
          endereco: "R. novoTeste, 123",
          produtos: "novos produtos",
        },
      };
  
      // Configurar o mock para simular um sucesso do banco de dados
      require("../db").db.query.mockImplementationOnce((query, values, callback) => {
        callback(null);  // Sem erro
      });
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(),
      };
  
      updateUser(mockRequest, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith("Usuário atualizado com sucesso");
    });
  
    it("erros de banco de dados", () => {
      const mockRequest = {
        params: {
          id_cliente: 1,
        },
        body: {
          nome_PJ_PF: "novoTeste",
          valor: 6000,
          vencimento_boleto: "2023-12-31",
          endereco: "R. novoTeste, 123",
          produtos: "novos produtos",
        },
      };
  
      const mockError = new Error("Database error");
  
      // Configurar o mock para simular um erro do banco de dados
      require("../db").db.query.mockImplementationOnce((query, values, callback) => {
        callback(mockError);
      });
  
      const mockRes = {
        json: jest.fn(),
        status: jest.fn(),
      };
  
      updateUser(mockRequest, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith("Erro ao atualizar usuário");
    });
  });

  // Teste do deleteUser
describe("deleteUser", () => {
  it("excluindo um usuário do banco de dados", () => {
    const mockRequest = {
      params: {
        id_cliente: 1,
      },
    };

    // Configurar o mock para simular um sucesso do banco de dados
    require("../db").db.query.mockImplementationOnce((query, values, callback) => {
      callback(null);  // Sem erro
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    deleteUser(mockRequest, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith("Usuário excluído com sucesso");
  });

  it("erros de banco de dados", () => {
    const mockRequest = {
      params: {
        id_cliente: 1,
      },
    };

    const mockError = new Error("Database error");

    // Configurar o mock para simular um erro do banco de dados
    require("../db").db.query.mockImplementationOnce((query, values, callback) => {
      callback(mockError);
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn(),
    };

    deleteUser(mockRequest, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith("Erro ao excluir usuário");
  });
});
