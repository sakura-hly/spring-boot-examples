import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";

import { connect } from 'react-redux'
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
        this.state = {
            name: props.name
        }
    }

    componentDidMount() {
        // console.log(this.props.name);
        if (!this.props.name || this.props.name == 'NO ONE') {
            this.props.setMe()
        }
    }

    render() {
        return (
            <div>
                {
                    (!this.props.name || this.props.name == 'NO ONE')
                        ? <Redirect to={{
                            pathname: '/login',
                            state: { from: this.props.location }
                        }} />
                        :
                        <div><Nav /><this.props.item.component {...this.props} /></div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.me.name,
    }
};

const mapDispatchToProps = dispatch => ({
    setMe: bindActionCreators(setMe, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BeforeRouter);