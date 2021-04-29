import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
// import logo from './logo.svg';
import Header from "./Header";
import Home from "./Home/Home";
import Box from "./Box/Box";
// import Pricing from "./Pricing/Pricing";
// import Login from "./Login/Login";
// import Signup from "./Sign Up/Signup";
// import Features from "./Features/Features";
// import Support from "./Support/Support";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/support">
          <Header />
          <Support />
        </Route>
        <Route path="/features">
          <Header />
          <Features />
        </Route>
        <Route path="/sighnup">
          <Header />
          <Signup />
        </Route>
        <Route path="/login">
          <Header />
          <Login />
        </Route>
        <Route path="/pricing">
          <Header />
          <Pricing />
        </Route> */}
        <Route path="/box/:box_id">
          <Header />
          <Box />
        </Route>
        <Route path="/box">
          <Header />
          <Box />
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
