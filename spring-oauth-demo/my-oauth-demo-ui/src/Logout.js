import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initMe, setMe } from './Action';

class Logout extends Component {

    logout = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/logout',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true
        })
            .then(res => {
                console.log("Logout successfully.");
                this.props.initMe();
                this.props.history.push('/login');
            })
            .catch(err => {
                console.log("Logout fail.", err);
            });
    }

    render() {
        return (
            <button onClick={() => this.logout()}>Logout</button>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initMe: bindActionCreators(initMe, dispatch),
    setMe: bindActionCreators(setMe, dispatch)
})

export default withRouter(connect(null, mapDispatchToProps)(Logout));
// export default connect(mapDispatchToProps)(Logout);