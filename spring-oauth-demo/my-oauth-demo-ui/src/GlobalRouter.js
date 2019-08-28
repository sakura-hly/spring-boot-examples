import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";
// import { ConnectedRouter } from "connected-react-router";



import RouterMap from "./RouterMap";
import BeforeRouter from './BeforeRouter';


class GlobalRouter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={this.props.history}>
                <div>
                    <Switch>
                        {RouterMap.map((item, index) => {
                            return <Route key={index} path={item.path} exact
                                render={props => item.auth
                                    ? <BeforeRouter {...props} item={item} />
                                    : <item.component {...props} />
                                } />
                        })}
                        // 所有错误路由跳转页面
                        <Route render={() => <h1>404</h1>} />
                    </Switch>
                </div>
            </Router>
        )
    }

}


export default GlobalRouter;