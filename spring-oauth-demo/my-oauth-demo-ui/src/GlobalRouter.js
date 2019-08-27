import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";

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
        let token = this.props.token;
        return (
            <Router>
                <div>
                    <Switch>
                        {RouterMap.map((item, index) => {
                            return <Route key={index} path={item.path} exact
                                render={this.beforeRoute(item, token)} />
                        })}
                        // 所有错误路由跳转页面
                        <Route render={() => <h1>404</h1>} />
                    </Switch>
                </div>
            </Router>
        )
    }

    beforeRoute(item, token) {
        return props => (!item.auth
            ? (<div><nav /><item.component {...props} /></div>)
            : (token
                ? <item.component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />));
    }
}

export default GlobalRouter;

