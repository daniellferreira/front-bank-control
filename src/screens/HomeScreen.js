import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import services from "../services";
import FinanceTable from "../components/FinanceTable";

const HomeScreen = () => {
  const [account, setAccount] = useState({});
  const [finances, setFinances] = useState([]);

  const fetchAccount = async () => {
    try {
      const resp = await services.getCreatedAccount();
      setAccount(resp.data);
      localStorage.setItem("accountId", resp.data.id);
    } catch (error) {
      alert("Failed to fetch account.");
    }
  };
  const fetchFinances = useCallback(async () => {
    try {
      if (!account.id) {
        return;
      }
      const resp = await services.getFinanceHistory(account.id);
      setFinances(resp.data);
    } catch (error) {
      alert("Failed to fetch finance.");
    }
  }, [account.id]);

  useEffect(() => {
    fetchAccount();
  }, []);
  useEffect(() => {
    fetchFinances();
  }, [fetchFinances]);

  if (!account.id) {
    return (
      <Container>
        <Col>
          <p>Carregando movimentação...</p>
        </Col>
      </Container>
    );
  }

  return (
    <Container style={{ padding: 16 }}>
      <Row>
        <Col md={6}>
          <Card style={{ minHeight: 82 }}>
            <Card.Body>
              <div>Id da conta: {account.id}</div>
              <div>Saldo: {global.currencyFormat.format(account.amount)}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: 16 }}>
          <FinanceTable itens={finances} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
