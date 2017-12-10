import React from "react";
import { browserHistory as history } from "react-router";
import { Link } from "react-router";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this._loadMore = this._loadMore.bind(this);
  }

  componentDidMount() {
    fetch("https://api.github.com/users")
      .then(response => response.json())
      .then(users => {
        this.setState({
          users: users
        });
      });
  }

  _loadMore() {
    let { users } = this.state;
    let since = users[users.length - 1].id;
    fetch(`https://api.github.com/users?since=${since}`)
      .then(response => response.json())
      .then(newUsers => {
        this.setState({ users: [...this.state.users, ...newUsers] });
      });
  }

  render() {
    return (
      <div>
        <h2>List of Users</h2>
        <button
          onClick={this._loadMore}
          style={{ width: "200px", height: "40px", fontSize: "20px" }}
        >
          Load More
        </button>
        <ul style={{ marginTop: "5vh" }}>
          {this.state.users.map((user, index) => (
            <li key={index}>
              {" "}
              <p>
                <img
                  style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                  src={user.avatar_url}
                  alt={`${user.login} avatar`}
                />{" "}
                <Link className="user-info__text" to={`/user/${user.login}`}>
                  {user.login}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;
