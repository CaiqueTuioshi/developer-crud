import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";
import DeveloperList from "./pages/developer/DeveloperList";
import DeveloperForm from "./pages/developer/DeveloperForm";
import axios from 'axios';

import './app.css'

axios.defaults.baseURL = 'http://localhost:3003';

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/developer">
            <DeveloperList />
          </Route>
          <Route path="/developer/:id" >
            <DeveloperForm />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
