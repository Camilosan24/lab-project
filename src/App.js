import React from "react";
import Header from "./components/header";
import Start from "./components/start";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Start } />
        <Route exact path="/home-page" component={ Header } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
