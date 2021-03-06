import React from 'react';
import ReactDom from 'react-dom';

import ApplicationLayout from './layout/application';

class SignupPage extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <ApplicationLayout data={this.props}>
                <div className="container" id="login-container">
                    <div className="card card-login mx-auto mt-5">
                        <div className="card-header bg-dark text-light">Sign Up</div>
                        <div className="card-body">
                            <div id="signup-form">
                            
                            </div>
                            <div className="text-center">
                                <a className="d-block small mt-3" href="/signup">Register an Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </ApplicationLayout>
        )
    }
};

module.exports= SignupPage;
