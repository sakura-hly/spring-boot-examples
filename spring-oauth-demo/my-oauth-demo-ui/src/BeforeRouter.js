import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMe } from './Action';
import Logout from './Logout';


const Nav = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/a">A</Link>
                </li>
                <li>
                    <Link to="/b">B</Link>
                </li>
                <li>
                    <Link to="/c">C</Link>
                </li>
            </ul>

            <Logout />
        </div>
    );
}


class BeforeRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.me || this.props.me === 'init') {
            this.props.setMe();
        }
    }

    render() {
        if (!this.props.me || this.props.me === 'init') {
            // just wait
            return null;
        } else if (this.props.me === 'none') {
            // redirect to login
            return <Redirect to={{
                pathname: '/login',
                state: { from: this.props.location }
            }} />;
        } else {
            // go to next page
            if (this.props.item.path === '/login') {
                return <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                }} />;
            } else {
                return <div><Nav /><this.props.item.component {...this.props} /></div>;
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        me: state.meReducer.name,
    }
};

const mapDispatchToProps = dispatch => ({
    setMe: bindActionCreators(setMe, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BeforeRouter);