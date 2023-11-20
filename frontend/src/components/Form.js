import axios from "axios";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

//ESTILIZAÇÃO COMPLETA DO FRONTEND
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

//BOTÃO SALVAR
const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

//INTEFACE DO USUARIO CONECTADA AO BANCO
const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        const user = ref.current;

        // Limpar os campos quando não estiver editando
        if (!onEdit) {
            user.id_cliente.value = "";
            user.nome_PJ_PF.value = "";
            user.valor.value = "";
            user.vencimento_boleto.value = "";
            user.endereco.value = "";
            user.produtos.value = "";
        } else {
            // Preencher os campos ao editar
            user.id_cliente.value = onEdit.id_cliente;
            user.nome_PJ_PF.value = onEdit.nome_PJ_PF;
            user.valor.value = onEdit.valor;
            user.vencimento_boleto.value = onEdit.vencimento_boleto;
            user.endereco.value = onEdit.endereco;
            user.produtos.value = onEdit.produtos;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.id_cliente.value ||
            !user.nome_PJ_PF.value ||
            !user.valor.value ||
            !user.vencimento_boleto.value ||
            !user.endereco.value ||
            !user.produtos.value
        ) {
            return toast.warn("Preencha todos os campos.");
        }

        // Enviar dados para a API
        try {
            if (onEdit) {
                await axios.put(`http://localhost:8800/${onEdit.id_cliente}`, {
                    id_cliente: user.id_cliente.value,
                    nome_PJ_PF: user.nome_PJ_PF.value,
                    valor: user.valor.value,
                    vencimento_boleto: user.vencimento_boleto.value,
                    endereco: user.endereco.value,
                    produtos: user.produtos.value,
                });
                toast.success("Usuário atualizado com sucesso.");
            } else {
                await axios.post("http://localhost:8800/", {
                    id_cliente: user.id_cliente.value,
                    nome_PJ_PF: user.nome_PJ_PF.value,
                    valor: user.valor.value,
                    vencimento_boleto: user.vencimento_boleto.value,
                    endereco: user.endereco.value,
                    produtos: user.produtos.value,
                });
                toast.success("Usuário criado com sucesso.");
            }

            // Limpar formulário
            user.id_cliente.value = "";
            user.nome_PJ_PF.value = "";
            user.valor.value = "";
            user.vencimento_boleto.value = "";
            user.endereco.value = "";
            user.produtos.value = "";

            // Resetar o modo de edição
            setOnEdit(null);

            // Atualizar lista de usuários
            getUsers();
        } catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
            toast.error("Erro ao processar a requisição.");
        }
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label> Seu ID </Label>
                <Input name="id_cliente" />
            </InputArea>
            <InputArea>
                <Label>CNPJ / CPF</Label>
                <Input name="nome_PJ_PF"/>
            </InputArea>
            <InputArea>
                <Label>Valor total</Label>
                <Input name="valor"/>
            </InputArea>
            <InputArea>
                <Label>Vencimento do boleto</Label>
                <Input name="vencimento_boleto" type="date" />
            </InputArea>
            <InputArea>
                <Label>Nome PJ/PF + Endereço do cliente</Label>
                <Input name="endereco"/>
            </InputArea>
            <InputArea>
                <Label>Quantidade - Nome do produto(dessa exata forma)</Label>
                <Input name="produtos"/>
            </InputArea>


            <Button type="submit"> SALVAR </Button>
        </FormContainer>
    );

};

export default Form;
