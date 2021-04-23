import React from "react";
import "./Login.css"
// import "./bootstrap.css "

function Home() {
  return (
    <div class="center">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control input" id="Email" placeholder="Enter email"></input>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control input" id="Password" placeholder="Password"></input>
        </div>
        <button type="submit" class="btn btn-primary submit-button">Submit</button>
      </form>
    </div>  
  );
}

export default Home;