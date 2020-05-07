import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser:{
                id: null,
                name: "",
                email: "",
                password: "",

                submitted: false
            },
            message:""
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeName(e){
        const name = e.target.value;

        this.setState(function(prevState){
            return {
                currentUser:{
                    ...prevState.currentUser,
                    name: name
                }
            };
        });
    }

    onChangeEmail(e){
        const email = e.target.value;

        this.setState(function(prevState){
            return {
                currentUser:{
                    ...prevState.currentUser,
                    email: email
                }
            };
        });
    }

    onChangePassword(e){
        const password = e.target.value;

        this.setState(function(prevState){
            return {
                currentUser:{
                    ...prevState.currentUser,
                    password: password
                }
            };
        });
    }

    getUser(id){
        TutorialDataService.get(id)
        .then(response => {
            this.setState({
                currentUser: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateUser() {
        TutorialDataService.update(
            this.state.currentUser.id,
            this.state.currentUser
        )
        .then( response => {
            console.log(response.data);
            this.setState({
                message: "Usuário editado com sucesso!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteUser() {
        TutorialDataService.delete(
            this.state.currentUser.id
            )
        .then(response => {
            console.log(response.data);
            this.props.history.push('/users')
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { currentUser } = this.state;
    
        return (
          <div>
            {currentUser ? (
              <div className="edit-form">
                <h4>Usuário</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={currentUser.name}
                      onChange={this.onChangeName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={currentUser.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={currentUser.password}
                      onChange={this.onChangePassword}
                    />
                  </div>
                </form>
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteUser}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateUser}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Selecione um Usuário...</p>
              </div>
            )}
          </div>
        );
      }
    
}