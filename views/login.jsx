import React from "react";
import ReactDom from "react-dom";

import ApplicationLayout from "./layout/application";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApplicationLayout data={this.props}>
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">
            <h5>Login</h5>
          </div>
          <div className="card-body">
            <div id="login-form" />
            <div className="text-center">
              <a className="d-block small mt-3" href="/signup">
                Register an Account
              </a>
            </div>
          </div>
        </div>
      </ApplicationLayout>
    );
  }
}

module.exports = LoginPage;
