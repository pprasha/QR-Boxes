import React from "react";
import { Card } from "react-bootstrap"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import "./Signup.css"

function Signup() {
  function EmailSignUp() {
      return (
        <div className="signUpForm row h-100">
          <Card className="card-form col-sm-12 my-auto signup-card">
          <h2>Sign Up</h2>
          <div class="center">
          <form>
            <div class="form-group">
              <label className="form-label" for="FirstName">First Name</label>
              <input type="text" class="form-control input" id="FirstName" required></input>
            </div>
            <div class="form-group">
              <label className="form-label" for="LastName">Last Name</label>
              <input type="text" class="form-control input" id="LastName" required></input>
            </div>
            <div class="form-group">
              <label className="form-label" for="Email">Email</label>
              <input type="email" class="form-control input" id="Email" required></input>
            </div>
            {/* <div class="form-group">
              <label className="form-label" for="PhoneNumber">Phone Number</label>
              <input type="tel" class="form-control input" id="PhoneNumber" required></input>
            </div> */}
            <div class="form-group">
              <label className="form-label" for="Password">Password</label>
              <input type="password" class="form-control input" id="Password" required></input>
            </div>
            <div class="form-group">
              <label className="form-label" for="ConfirmPassword">Confirm Password</label>
              <input type="password" class="form-control input" id="ConfirmPassword" required></input>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault terms_and_conditions" />
              <label class="form-check-label form-label" for="flexCheckDefault" style={{fontWeight: "normal"}}>
                I would also like to sign up for email communication. (optional)
              </label>
            </div>
            <button type="submit" id="submit-button" class="btn btn-primary submit-button">Submit</button>
            <p className="signup-terms" style={{fontWeight: "normal"}}>
                By signing up, you agree to QR Boxes's <a href="/termsofuse">Terms of Use</a> and <a href="/privacypolicy">Privacy Policy</a>.
            </p>
          </form>
          </div> 
          </Card> 
          <p style={{fontWeight: "normal"}}>
            Already have an acount? <a href="/login">Log in</a>
          </p>
        </div>
      );
  }

  function SignupOptions() {
    return (
      <div className="signUpForm row h-100">
      <Card className="card-form col-sm-12 my-auto">
        <div class="center">
        <h2>Sign Up</h2>
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
          appId="784067258909862"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          // callback={responseFacebook}
          icon={"fa-facebook"} 
        />
        <div class="hr-sect">OR</div>
        <button className="signUpEmail" onClick={() => setEmailSignupStatus(true)}>Sign up with email</button>
        <p className="signup-terms" style={{fontWeight: "normal"}}>
            By signing up, you agree to QR Boxes's <a href="/termsofuse">Terms of Use</a> and <a href="/privacypolicy">Privacy Policy</a>.
        </p>
        </div>
        </Card>
        <p style={{fontWeight: "normal"}}>
          Already have an acount? <a href="/login">Log in</a>
        </p>
      </div>
    );
  }

  const [ emailSignupStatus, setEmailSignupStatus ] = React.useState(false);

  return(
    <div className="signUpForm row h-100">
    {emailSignupStatus
      ? <EmailSignUp />
      : <SignupOptions />
    }
    </div>
  );
}

export default Signup;