import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  withRouter
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentDidMount() {

  }

  render() {
    const loginUrl = 'http://localhost:8080/login/github?auth_url=' + window.location.href;

    return (
      <div>
        {
          (this.props.me && this.props.me != 'none')
            ? <Redirect to={{
              pathname: this.props.location.state.from.pathname,
              state: { from: this.props.location }
            }} />
            :
            (<div className="App">
              <a href={loginUrl}>Github Login</a>
            </div>)
        }
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    me: state.meReducer.name,
  }
};

export default withRouter(connect(mapStateToProps)(Login));
