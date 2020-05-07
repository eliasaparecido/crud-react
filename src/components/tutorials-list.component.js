import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
          };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    retrieveUsers() {
        TutorialDataService.getAll()
            .then(response => {
            this.setState({
                users: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    }

    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }

    setActiveUser(user, index) {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
    }

    render() {
        const { users, currentUser, currentIndex } = this.state;
    
        return (
          <div className="list row">
            
            <div className="col-md-6">
              <h4>Lista de Usuários</h4>
    
              <ul className="list-group">
                {users &&
                  users.map((user, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveUser(user, index)}
                      key={index}
                    >
                      {user.name}
                    </li>
                  ))}
              </ul>
    
            </div>
            <div className="col-md-6">
              {currentUser ? (
                <div>
                  <h4>Usuário</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentUser.name}
                  </div>
                  <div>
                    <label>
                      <strong>email:</strong>
                    </label>{" "}
                    {currentUser.email}
                  </div>
    
                  <Link
                    to={"/users/" + currentUser.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Clique em um Nome da Lista...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
}