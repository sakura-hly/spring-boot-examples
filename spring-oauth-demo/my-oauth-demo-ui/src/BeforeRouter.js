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
import Login from "./Login";


const Nav = () => {
    return (
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
    );
}


class BeforeRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // if (!this.props.me || this.props.me == 'none') {
            this.props.setMe()
        // }
    }

    render() {
        return (
            <div>
                {
                    (this.props.me && this.props.me != 'none')
                        ? <div><Nav /><this.props.item.component {...this.props} /></div>
                        : <Redirect to={{
                            pathname: '/login',
                            state: { from: this.props.location }
                        }} />
                }
            </div>
        );
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