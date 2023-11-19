import { db } from "../db.js";

//EXIBIR DADOS DO CLIENTE
export const getUsers = (_, res) => {
    const q = "SELECT * FROM cliente";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        
        return res.status(200).json(data);
    });
};

//ADD CLIENTE
export const addUser = (req, res) => {
    const q = "INSERT INTO cliente(`id_cliente`, `nome_PJ_PF`, `valor`, `vencimento_boleto`, `endereco`, `produtos`) VALUES(?)";

        const values = [
            req.body.id_cliente,
            req.body.nome_PJ_PF,
            req.body.valor,
            req.body.vencimento_boleto,
            req.body.endereco,
            req.body.produtos,
        ];
//FUNCÃO QUE RECEBE POSSVIEL ERRO OU SUCESSO
        db.query(q, [values], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Erro ao criar usuário");
            }
        
            return res.status(200).json("Usuário criado com sucesso");
        });
};

//ATUALIZAR CLIENTE
export const updateUser = (req, res) => {
    const q=
        "UPDATE cliente SET `nome_PJ_PF` = ?, `valor` = ?, `vencimento_boleto` = ?, `endereco` = ?, `produtos` = ? WHERE `id_cliente` =?";
   
    const values = [
        req.body.nome_PJ_PF,
        req.body.valor,
        req.body.vencimento_boleto,
        req.body.endereco,
        req.body.produtos,
    ];
//FUNCÃO QUE RECEBE POSSVIEL ERRO OU SUCESSO
const { nome_PJ_PF, valor, vencimento_boleto, endereco, produtos } = req.body;
if (!nome_PJ_PF || !valor || !vencimento_boleto || !endereco || !produtos) {
    return res.status(400).json("Preencha todos os campos necessários.");
}

db.query(q, [...values, req.params.id_cliente], (err) => {
    if (err) {
        console.error(err);
        return res.status(500).json("Erro ao atualizar usuário");
    }

    return res.status(200).json("Usuário atualizado com sucesso");
});
};
//DELETAR USUARIO
export const deleteUser = (req, res) => {
    const q= "DELETE FROM cliente WHERE `id_cliente` = ?";

    db.query(q, [req.params.id_cliente], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Erro ao excluir usuário");
        }

        return res.status(200).json("Usuário excluído com sucesso");
    });
};