import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <footer className="footer">
          <nav>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </nav>
        </footer>
        <Switch>
          <Route path="/pokemon">
            <Pokemon />
          </Route>
          <Route path="/">
            <Home Link={Link} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
