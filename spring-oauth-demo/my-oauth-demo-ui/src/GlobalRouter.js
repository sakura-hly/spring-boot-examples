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
import { setMe } from './Action';

import RouterMap from "./RouterMap";

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


class GlobalRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        // let token = this.props.token || true;
        return (
            <Router>
                <div>
                    <Switch>
                        {RouterMap.map((item, index) => {
                            return <Route key={index} path={item.path} exact
                                render={this.beforeRoute(item)} />
                        })}
                        // 所有错误路由跳转页面
                        <Route render={() => <h1>404</h1>} />
                    </Switch>
                </div>
            </Router>
        )
    }

    beforeRoute(item) {
        return props => (!item.auth
            ? (<div><Nav /><item.component {...props} /></div>)
            : (this.redirect(item, props)));

    }

    redirect(item, props) {
        // console.log(props.soeid);
        if (props.soeid) {
            return <div><Nav /><item.component {...props} /> </div>;
        } else {
            this.props
                .setMe()
                .then(() => {
                    return <div><Nav /><item.component {...props} /> </div>;
                });
        }
        // return true
        //     ? <div><Nav /><item.component {...props} /> </div>
        //     : <Redirect to={{
        //         pathname: '/login',
        //         state: { from: props.location }
        //     }} />;
    }

}
const mapStateToProps = (state) => {
    return {
        soeid: state.soeid,
    }
}

const mapDispatchToProps = dispatch => ({
    setMe: () => dispatch(setMe())
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalRouter);

