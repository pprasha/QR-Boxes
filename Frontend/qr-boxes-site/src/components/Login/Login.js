import React from "react";
import { Card } from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import "./Login.css"
// import "./bootstrap.css "

function Home() {
  return (
    <div className="loginForm row h-100">
      <Card className="card-form col-sm-12 my-auto">
      <h2>Log in</h2>
      <div class="center">
      <GoogleLogin
        className="oauth"
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Log in with Google"
        // onSuccess={}
        // onFailure={}
        cookiePolicy={'single_host_origin'}
      />
      <FacebookLogin
        cssClass="oauth facebook-icon"
        // appId="921201001964201"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        // callback={responseFacebook}
        icon={"fa-facebook"} 
      />
      <div class="hr-sect">OR</div>
      <form>
        <div class="form-group">
          <label className="form-label" for="Email">Email</label>
          <input type="email" class="form-control input" id="Email" required></input>
        </div>
        <div class="form-group">
          <label className="form-label" for="Password">Password</label>
          <input type="password" class="form-control input" id="Password" required></input>
        </div>
        <button type="submit" id="submit-button" class="btn btn-primary submit-button">Submit</button>
        <p className="terms" style={{fontWeight: "normal"}}>
            By logging in, you agree to QR Boxes's <a href="/termsofuse">Terms of Use</a> and <a href="/privacypolicy">Privacy Policy</a>.
        </p>
      </form>
      </div> 
      </Card> 
      <p style={{fontWeight: "normal"}}>
        Don't have an acount? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Home;