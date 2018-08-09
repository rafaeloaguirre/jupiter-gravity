import React from "react";
import ReactDom from "react-dom";

import ApplicationLayout from "./layout/application";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApplicationLayout data={this.props}>
        <div className="container" id="login-container">
          <div className="card card-register mx-auto mt-5">
            <div className="card-header bg-custom-primary text-light">
              <h5>Account Registration</h5>
            </div>
            <div className="card-body">
              <div id="signup-form" />
            </div>
          </div>
        </div>
      </ApplicationLayout>
    );
  }
}

module.exports = SignupPage;
