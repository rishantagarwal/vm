import React from "react";
import { Link } from "react-router";

class User extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.params.username}`)
      .then(response => response.json())
      .then(user => {
        this.setState({
          user: user
        });
      });

    fetch(`https://api.github.com/users/${this.props.params.username}/gists`)
      .then(response => response.json())
      .then(gists => {
        this.setState({
          gists: gists
        });
      });

    fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
      .then(response => response.json())
      .then(repos => {
        this.setState({
          repos: repos
        });
      });
  }

  renderStat(stat) {
    return (
      <li key={stat.name} className="user-info__stat">
        <div>
          <p className="user-info__stat-value">{stat.value}</p>
          <p className="user-info__stat-name">{stat.name}</p>
        </div>
      </li>
    );
  }

  render() {
    if (!this.state.user) {
      return <div className="user-page">LOADING...</div>;
    }

    const user = this.state.user;

    const stats = [
      {
        name: "Public Repos",
        value: user.public_repos || 0
      },
      {
        name: "Followers",
        value: user.followers || 0
      },
      {
        name: "Following",
        value: user.following || 0
      },
      {
        name: "Company",
        value: user.company || "NA"
      },
      {
        name: "Created At",
        value: user.created_at.substring(0, 10) || "NA"
      }
    ];

    return (
      <div className="user-page">
        <div className="user-info">
          <div className="user-info__text" to={`/user/${user.login}`}>
            <img
              className="user-info__avatar"
              src={user.avatar_url}
              alt={`${user.login} avatar`}
            />
            <h2 className="user-info__title">
              {user.login} ({user.name}) <br />
              {user.blog}
              <br />
            </h2>
            <p className="user-info__bio">{user.bio}</p>
          </div>

          <ul className="user-info__stats">{stats.map(this.renderStat)}</ul>
        </div>
        <div className="user-gist__stats">
          {" "}
          <h2>Gists for User</h2>
          <ul>
            {this.state.gists.map(gist => (
              <li>
                <a href={gist.html_url}>
                  {gist.description || "No description"}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="user-gist__repos">
          {" "}
          <h2>Repositories for User</h2>
          <ul>
            {this.state.repos.map(gist => (
              <li>
                <a href={gist.html_url}>{gist.name || "--"}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default User;
