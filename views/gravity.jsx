import React from "react";
import ReactDom from "react-dom";

import ApplicationLayout from "./layout/application";

class GravityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (
      this.props.messages != null &&
      this.props.messages.signupMessage != null
    ) {
      this.props.messages.signupMessage.map(function(message) {
        toastr.error(message);
      });
    }

    if (
      this.props.messages != null &&
      this.props.messages.generalMessages != null
    ) {
      this.props.messages.generalMessages.map(function(message) {
        toastr.error(message);
      });
    }
  }

  render() {
    return (
      <ApplicationLayout data={this.props}>
        <div className="divider my-5" />

        <h1 className="text-center">Welcome to your Gravity App</h1>

        <div className="divider my-5" />

        <div className="row">
          <div className="col-md-6 mx-auto col-xs-12">
            <div className="card">
              <div className="card-header">
                <h5>Application Status</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    width="100%"
                    cellspacing="0"
                  >
                    <tbody>
                      <tr>
                        <td>Application Passphrase</td>
                        <td
                          className={
                            this.props.requirements.passphrase
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {this.props.requirements.passphrase
                            ? "Connected"
                            : "Missing"}
                        </td>
                      </tr>
                      <tr>
                        <td>Application Address</td>
                        <td
                          className={
                            this.props.requirements.address
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {this.props.requirements.address
                            ? "Connected"
                            : "Missing"}
                        </td>
                      </tr>
                      <tr>
                        <td>Application Public Key</td>
                        <td
                          className={
                            this.props.requirements.public_key
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {this.props.requirements.public_key
                            ? "Connected"
                            : "Missing"}
                        </td>
                      </tr>
                      <tr>
                        <td>Application Data Encryption</td>
                        <td
                          className={
                            this.props.requirements.encryption
                              ? "text-primary"
                              : "text-danger"
                          }
                        >
                          {this.props.requirements.encryption
                            ? "Ready"
                            : "Not-Encrypted"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ApplicationLayout>
    );
  }
}

module.exports = GravityPage;
