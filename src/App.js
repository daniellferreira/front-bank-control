import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import OperationScreen from "./screens/OperationScreen";
import "bootstrap/dist/css/bootstrap.min.css";

global.currencyFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route
              path="/deposit"
              render={() => <OperationScreen operation="deposit" />}
            />
            <Route
              path="/draft"
              render={() => <OperationScreen operation="draft" />}
            />
            <Route
              path="/payment"
              render={() => <OperationScreen operation="payment" />}
            />
            <Route path="/" component={HomeScreen} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
