import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUSer from "./components/add-tutorial.component";
import User from "./components/tutorial.component";
import UsersList from "./components/tutorials-list.component";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/users" className="navbar-brand">
              Crud React
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Usuários
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Adicionar
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/users"]} component={UsersList} />
              <Route exact path="/add" component={AddUSer} />
              <Route path="/users/:id" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;