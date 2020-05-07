import React, {Component} from "react";
import TutorialDataService from "../services/tutorial.service"

export default class AddUser extends Component {

    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.SaveUser = this.SaveUser.bind(this);
        this.NewUser = this.NewUser.bind(this);

        this.state = {
            id: null,
            name: "",
            email: "",
            password: "",

            submitted: false
        };
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    SaveUser() {
        var data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        TutorialDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                password: response.data.password,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    NewUser(){
        this.setState({
            id: null,
            name: "",
            email: "",
            password: "",

            submitted: false
        });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Salvo com Sucesso.!</h4>
                <button className="btn btn-success" onClick={this.NewUser}>
                  Adicionar
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="namenae">None:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                  />
                </div>
    
                <button onClick={this.SaveUser} className="btn btn-success">
                  Salvar
                </button>
              </div>
            )}
          </div>
        );
      }
}