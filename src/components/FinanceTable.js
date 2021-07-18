import React from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";

const convertType = {
  in: "depósito",
  out: "saque",
  payment_ticket: "pagamento boleto",
};

const FinanceTable = ({ itens }) => {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Data</th>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Info Pagamento</th>
        </tr>
      </thead>
      <tbody>
        {itens.map(({ type, amount, createdAt, ticketCode }, i) => (
          <tr key={i}>
            <td>
              <Moment format="DD/MM/YYYY HH:mm:ss">{createdAt}</Moment>
            </td>
            <td>{convertType[type]}</td>
            <td>{global.currencyFormat.format(amount)}</td>
            <td>{ticketCode || "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FinanceTable;
