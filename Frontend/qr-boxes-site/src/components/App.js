import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import { Alert, Button } from "react-bootstrap"
import Feedback from "feeder-react-feedback";
import "feeder-react-feedback/dist/feeder-react-feedback.css";
// import logo from './logo.svg';
import Header from "./Header";
import Footer from "./Footer"
import Home from "./Home/Home";
import Box from "./Box/Box";
// import Pricing from "./Pricing/Pricing";
// import Login from "./Login/Login";
// import Signup from "./Sign Up/Signup";
// import Features from "./Features/Features";
// import Support from "./Support/Support";

function App() {
  const [show, setShow] = React.useState(true);

  return (
    <div id="main">
      <Alert className="alertTerms" show={show} variant="success">
        <Alert.Heading>Terms and Conditions</Alert.Heading>
        <p>
          By using this website you agree to the terms and conditions of this site.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Accept and Continue
          </Button>
        </div>
      </Alert>

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
            <Footer />
          </Route>
          <Route path="/box">
            <Header />
            <Box />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </Router>
      <Feedback 
      projectId="608c41141b4b9a00044fe6ac" 
      email="true" 
      emailRequired="true" 
      primaryColor="#4CAF50"
      />
    </div>
  );
}

export default App;
