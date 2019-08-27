import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  render(){
    const loginUrl = 'http://localhost:8080/login/github?auth_url=' + window.location.href;

    return (
      <div className="App">
        <a href={loginUrl}>Github Login</a>
      </div>
    );
  }
}

export default App;
