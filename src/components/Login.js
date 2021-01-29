import React from 'react';
import './Login.css';

const Login = (props) => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6"> 
          <div class="card">
                  <div className="form">
                    <h1>Login</h1>
                    <p class="text-muted">Ingrese su correo y contraseña!</p> 
                    <input onChange={e => props.setEmail(e.target.value)} type="text" name="" placeholder="Username"/> 
                    <input onChange={e => props.setPassword(e.target.value)} type="password" name="" placeholder="Password"/> 
                    <button onClick={() => props.login()} href="#" className="loginBtn">Login</button>
                  </div>  
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Login;
