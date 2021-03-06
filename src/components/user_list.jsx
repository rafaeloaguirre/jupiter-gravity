import React from 'react';
import {render} from 'react-dom';

var axios= require('axios');


class UserListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            account: '',
            accounthash: '',
            email: '',
            firstname: '',
            lastname: '',
            secret_key: '',
            twofa_enabled: true,
            twofa_completed: true,
            api_key: '',
            users: []
        }
        this.handleChange= this.handleChange.bind(this);
        this.recordUser= this.recordUser.bind(this);
        this.twofa_enabledUpdate= this.twofa_enabledUpdate.bind(this);
        this.twofa_completedUpdate= this.twofa_completedUpdate.bind(this);
    }

    componentDidMount(){
        var page= this;

        axios.get('/api/users')
        .then(function(response){
            if (response.data.success==true){
                page.setState({
                    users: response.data.users,
                })
                console.log(response.data)
            }else{
                console.log(response.data);
                toastr.error('No User history');
            }
        })
        .catch(function(error){
            console.log(error);
            toastr.error('There was an error');
        });
    }


    handleChange(a_field, event){
        if(a_field=='account'){
            this.setState({ account: event.target.value});
        }
        else if(a_field=='accounthash'){
            this.setState({ accounthash: event.target.value});
        }
        else if(a_field=='email'){
            this.setState({ email: event.target.value});
        }
        else if(a_field=='firstname'){
            this.setState({ firstname: event.target.value});
        }
        else if(a_field=='lastname'){
            this.setState({ lastname: event.target.value});
        }
        else if(a_field=='secret_key'){
            this.setState({ secret_key: event.target.value});
        }
        else if(a_field=='twofa_enabled'){
            this.setState({ twofa_enabled: event.target.value});
        }
        else if(a_field=='twofa_completed'){
            this.setState({ twofa_completed: event.target.value});
        }
        else if(a_field=='api_key'){
            this.setState({ api_key: event.target.value});
        }
    }

    recordUser(event){
        event.preventDefault();
        var page= this;

        axios.post('/api/users', {
            account: this.state.account,
            accounthash: this.state.accounthash,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            secret_key: this.state.secret_key,
            twofa_enabled: this.state.twofa_enabled,
            twofa_completed: this.state.twofa_completed,
            api_key: this.state.api_key,
            address: this.props.user.record.account,
            date_confirmed: Date.now(),
            api_key: this.props.user.api.generated_key

        })
        .then(function(response){
            if (response.data.success==true){
                page.setState({
                    account: '',
                    accounthash: '',
                    email: '',
                    firstname: '',
                    lastname: '',
                    secret_key: '',
                    twofa_enabled: true,
                    twofa_completed: true,
                    api_key: '',
                })
                console.log(response.data)
                toastr.success('User record submitted to the blockchain.');
            }else{
                //console.log(response.data);
                //toastr.error(response.data.message);
                response.data.validations.messages.map(function(message){
                    toastr.error(message);
                });
            }
        })
        .catch(function(error){
            toastr.error('There was an error');
        });

    }

    twofa_enabledUpdate(event){
        var new_value= !this.state.twofa_enabled;        
        this.setState({ twofa_enabled: new_value });
    }
    twofa_completedUpdate(event){
        var new_value= !this.state.twofa_completed;        
        this.setState({ twofa_completed: new_value });
    }

    render(){

        var user_list=
            this.state.users.map(function(user, index){
                return(
                    <tr className="text-center" key={'user-'+index}>
                        <td>{user.user_record.account}</td>
                        <td>{user.user_record.accounthash}</td>
                        <td>{user.user_record.email}</td>
                        <td>{user.user_record.firstname}</td>
                        <td>{user.user_record.lastname}</td>
                        <td>{user.user_record.secret_key}</td>
                        <td>{String(user.user_record.twofa_enabled)}</td>
                        <td>{String(user.user_record.twofa_completed)}</td>
                        <td>{user.user_record.api_key}</td>
                    </tr>
                )
            });

        return(
            <div className="container-fluid">
                <h1 className="page-title"></h1>

                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading text-center lead">
                                Record User
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6 col-md-6">
                                    <label>account</label>
                                    <input placeholder="" value={this.state.account } className="form-control" onChange={this.handleChange.bind(this,'account')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>accounthash</label>
                                    <input placeholder="" value={this.state.accounthash } className="form-control" onChange={this.handleChange.bind(this,'accounthash')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>email</label>
                                    <input placeholder="" value={this.state.email } className="form-control" onChange={this.handleChange.bind(this,'email')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>firstname</label>
                                    <input placeholder="" value={this.state.firstname } className="form-control" onChange={this.handleChange.bind(this,'firstname')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>lastname</label>
                                    <input placeholder="" value={this.state.lastname } className="form-control" onChange={this.handleChange.bind(this,'lastname')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>secret_key</label>
                                    <input placeholder="" value={this.state.secret_key } className="form-control" onChange={this.handleChange.bind(this,'secret_key')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>twofa_enabled</label>
                                    <div className="status-toggle">
                                        <label className={"switch"}>
                                            <input type="checkbox" onChange={this.twofa_enabledUpdate.bind(this)} checked={this.state.twofa_enabled==true ? true : false}  />
                                            <span className={"slider round"}></span>
                                        </label><br />
                                    </div>   
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>twofa_completed</label>
                                    <div className="status-toggle">
                                        <label className={"switch"}>
                                            <input type="checkbox" onChange={this.twofa_completedUpdate.bind(this)} checked={this.state.twofa_completed==true ? true : false}  />
                                            <span className={"slider round"}></span>
                                        </label><br />
                                    </div>   
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6 col-md-6">
                                    <label>api_key</label>
                                    <input placeholder="" value={this.state.api_key } className="form-control" onChange={this.handleChange.bind(this,'api_key')} /><br />
                                </div>
                                <div className="clearfix"></div>
                                <br />
                                <div className="col-lg-12 col-md-12 col-xs-12 text-center">
                                    <button type="button" className="btn btn-outline btn-default"  onClick={this.recordUser.bind(this)}><i className="glyphicon glyphicon-edit"></i>  Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>account</th>
                            <th>accounthash</th>
                            <th>email</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>secret_key</th>
                            <th>twofa_enabled</th>
                            <th>twofa_completed</th>
                            <th>api_key</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user_list}
                    </tbody>
                </table>

            </div>
        )
    }
};

var UserListExport= () => {
    if (document.getElementById('UserListComponent')!= null){
        var element= document.getElementById('props');
        var props= JSON.parse(element.getAttribute('data-props'));
        
        render(<UserListComponent  user={props.user} validation={props.validation} />, 
            document.getElementById('UserListComponent'));
    } 
}

module.exports= UserListExport();
