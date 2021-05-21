import React, { useState } from "react";
import { Card } from "react-bootstrap"
import PasswordStrengthBar from 'react-password-strength-bar';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import "./Signup.css"
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';

const apiBaseUrl = "https://192.168.0.119:8000";
var axios = require('axios');

function Signup() {
  function EmailSignUp() {
      const [name, setName] = useState('');

      const [username, setUsername] = useState('');

      const [email, setEmail] = useState('');

      const [phoneNumber, setPhoneNumber] = useState('');

      const [pwd, setPwd] = useState('');
      const [isRevealPwd, setIsRevealPwd] = useState(false);

      const [pwdConfirm, setPwdConfirm] = useState('');
      const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false);

      function handleEmailSignUp(name, username, phoneNumber, pwd, pwdConfirm) {
        console.log("TODO");
        // const NameSpan = document.getElementById("nameSpan");
        // const UsernameSpan = document.getElementById("usernameSpan");
        // const EmailSpan = document.getElementById("emailSpan");
        // const PhoneNumberSpan = document.getElementById("phoneNumberSpan");
        // const PasswordSpan = document.getElementById("passwordSpan");
        // const PasswordConfirmSpan = document.getElementById("passwordConfirmSpan");

        // if (name == null) {
        //   NameSpan.innerText = "Your name is required."
        //   return;
        // }
      }

      return (
        <div className="signUpForm row h-100">
          <Card className="card-form col-sm-12 my-auto signup-card">
          <h2>Sign Up</h2>
          <div class="center">
          <form name="signUpForm">
            <div class="form-group">
              <label className="form-label" for="name">Name</label>
              <input type="text" class="form-control input" id="name" value={name} onChange={e => setName(e.target.value)}></input>
              <span id="nameSpan" className="infoSpan"></span>
            </div>
            <div class="form-group">
              <label className="form-label" for="username">Username</label>
              <input type="text" class="form-control input" id="username" value={username} onChange={e => setUsername(e.target.value)}></input>
              <span id="usernameSpan" className="infoSpan"></span>
            </div>
            <div class="form-group">
              <label className="form-label" for="email">Email</label>
              <input type="email" class="form-control input" id="email" value={email} onChange={e => setEmail(e.target.value)}></input>
              <span id="emailSpan" className="infoSpan"></span>
            </div>
            <div class="form-group">
              <label className="form-label" for="phoneNumber">Phone Number (optional)</label>
              <input type="tel" class="form-control input" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></input>
              <span id="phoneNumberSpan" className="infoSpan"></span>
            </div>
            <div class="form-group pwd-container">
              <label className="form-label" for="password" style={{marginBottom: "0"}}>Password</label>
              <input type={isRevealPwd ? "text" : "password"} class="form-control input" id="password" value={pwd} onChange={e => setPwd(e.target.value)}></input>
              <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                alt=""
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd(prevState => !prevState)}
              />
              <span id="passwordSpan" className="infoSpan"></span>
            </div>

            <PasswordStrengthBar password={pwd} />
            <div class="form-group pwd-container">
              <label className="form-label" for="passwordConfirm">Re-enter Password </label>
              <input type={isRevealPwdConfirm ? "text" : "password"} class="form-control input" id="passwordConfirm" value={pwdConfirm} onChange={e => setPwdConfirm(e.target.value)}></input>
              <img
                title={isRevealPwdConfirm ? "Hide password" : "Show password"}
                alt=""
                src={isRevealPwdConfirm ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwdConfirm(prevState => !prevState)}
              />
              <span id="passwordConfirmSpan" className="infoSpan"></span>
            </div>
            <button type="submit" id="submit-button" class="btn btn-primary submit-button" onSubmit={() => handleEmailSignUp(name, username, phoneNumber, pwd, pwdConfirm)}>Submit</button>
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

  const handleGoogleOauth = (response) => {
    console.log(response)
    var data = '{\n  "name": "string",\n  "email": "string",\n  "phoneNumber": "string",\n  "oauthProvider": "string",\n  "oauthProviderId": 0,\n  "profilePic": "string"\n}';

    var config = {
      method: 'post',
      url: apiBaseUrl + "/signup/oauth",
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });    
  }

  const handleFacebookOauth = (response) => {
    console.log(response)
  }

  function SignupOptions() {
    return (
      <div className="signUpForm row h-100">
      <Card className="card-form col-sm-12 my-auto">
        <div class="center">
        <h2>Sign Up</h2>
        <GoogleLogin
          className="oauth"
          clientId="463592647963-sj2gq0f9vo9d2l0vgn53bt7p1phnb061.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={handleGoogleOauth}
          onFailure={handleGoogleOauth}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          textButton="Sign up with Facebook"
          cssClass="oauth facebook-icon"
          appId="784067258909862"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={handleFacebookOauth}
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