import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

//CRIAÇÃO DO th PARA WEB E MOBILE(dipositivo com menos de 500pixels)
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;


    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 20px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start" )};
    width: ${(props) => (props.width ? props.width : "auto" )};

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({users, setUsers, setOnEdit}) => {
// CONST DO EDIT DO FaEdit LOGO ABAIXO
    const handleEdit = (item) => {
        setOnEdit(item);
    };

//DELETAR NA TABELA
    const handleDelete = async (id_cliente) => {
        await axios
            .delete("http://localhost:8800/" + id_cliente)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id_cliente !== id_cliente);
                
                setUsers(newArray);
                toast.success(data);
            })
            .catch(({data}) => toast.error(data));

        setOnEdit(null);
    };
//DADOS ARMAZENADOS
    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>id</Th>
                    <Th>nome PJ/PF</Th>
                    <Th>valor</Th>
                    <Th>vencimento do boleto</Th>
                    <Th>endereço</Th>
                    <Th>produtos</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="5%"> {item.id_cliente} </Td>
                        <Td width="20%"> {item.nome_PJ_PF} </Td>
                        <Td width="10%"> {item.valor} </Td>
                        <Td width="15%"> {item.vencimento_boleto} </Td>
                        <Td width="20%"> {item.endereco} </Td>
                        <Td width="30%"> {item.produtos} </Td>

                        <Td width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td  width="5%">
                            <FaTrash onClick={() => handleDelete(item.id_cliente)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;