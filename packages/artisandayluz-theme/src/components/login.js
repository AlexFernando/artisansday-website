import React from "react";
import { connect, styled } from "frontity";

const Login = ({ state, actions }) => {

  return (
    <LoginStyles>
      <div>
        <h3>Welcome Artisan!</h3>
        <p>Please login to start creating an event</p>
        <span>If You don't have credentials, You can request it by email <a href = "mailto: all1union01@gmail.com">Send Email</a></span>
      </div>

      <div>
        <label htmlFor="userName">Username:</label><br></br>
        <input
          type="text"
          value={state.theme.userName}
          onChange={(e) => actions.theme.updateField("userName", e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label><br></br>
        <input
          type="password"
          value={state.theme.userPass}
          onChange={(e) => actions.theme.updateField("userPass", e.target.value)}
        />
      </div>

      <div>
        <button onClick={actions.theme.fetchToken}>Login Now!</button>
      </div>     
    </LoginStyles>
  );
};


const LoginStyles = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10rem;
  margin-bottom: 10rem;
  text-align: center;

  div {
    margin-top: 2rem;

    h3{
      font-size: 2rem;
    }

    p {
      font-size: 1.3rem;
    }

    span {
      font: 1.5rem;
    }
  }

  label {
    padding: 2rem 1rem 0 0;
    display: flex;
  }

  input[type=text], input[type=password] {
    // input elements with type="text" attribute
    padding:10px;
    margin:10px 0; 
    border: 2px solid #777;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius:10px;
    width:100%;
    font-family:inherit;
    font-size: inherit;
  }

  button {
    /* remove default behavior */
    appearance:none;
    -webkit-appearance:none;

    /* usual styles */
    padding:1rem 2rem;
    font-size: 1rem;
    border:none;
    background-color:#3F51B5;
    color:#fff;
    font-weight:600;
    border-radius:5px;
    margin-top: 2rem;
    cursor: pointer;
  }
`

export default connect(Login);
