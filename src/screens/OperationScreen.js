import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import services from "../services";
import CurrencyInput from "react-currency-input-field";

const TICKET_CODE_LENGTH = 47;

const buttonLabel = {
  deposit: "Realizar depósito",
  draft: "Realizar saque",
  payment: "Realizar pagamento",
};

const service = {
  deposit: services.addDeposit,
  draft: services.addDraft,
  payment: services.addTicketPayment,
};

const OperationScreen = ({ operation }) => {
  const history = useHistory();
  const [amount, setAmount] = useState(0);
  const [ticketCode, setTicketCode] = useState();

  const baseValidation = () => {
    if (amount <= 0) {
      alert("Valor inválido");
      return false;
    }
    return true;
  };

  const handleSumbit = async () => {
    try {
      if (!baseValidation()) {
        return;
      }

      const data = {
        amount,
        ticket_code: ticketCode,
        account_id: localStorage.getItem("accountId"),
      };

      const resp = await service[operation](data);

      console.log(resp);

      alert("Operação realizada com sucesso!");

      history.replace("/");
    } catch (error) {
      if (error?.response && error.response?.data?.message) {
        console.error(error.response);
        alert(error.response.data.message);
        return;
      }

      console.error(error);
      alert(
        error.message || "Erro inesperado no servidor. Verifique o console!"
      );
    }
  };

  const handleAmountChange = (value) => {
    if (value) {
      setAmount(parseFloat(value.replace(",", ".")));
    }
  };

  return (
    <Container style={{ padding: 16 }}>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <CurrencyInput
                id="amount"
                name="amount"
                className="form-control"
                placeholder="R$ 10,58"
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                allowNegativeValue={false}
                onValueChange={handleAmountChange}
              />
            </Form.Group>
            {operation === "payment" && (
              <Form.Group>
                <Form.Label>Linha digitável</Form.Label>
                <Form.Control
                  type="text"
                  id="ticketCode"
                  name="ticket_code"
                  maxLength={TICKET_CODE_LENGTH}
                  placeholder="74891121316679260101611851471075385910000011990"
                  onChange={(event) => setTicketCode(event.target.value)}
                ></Form.Control>
              </Form.Group>
            )}
            <br />
            <Form.Group>
              <Button variant="primary" onClick={handleSumbit}>
                {buttonLabel[operation]}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OperationScreen;
