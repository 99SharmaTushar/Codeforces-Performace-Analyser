import React, { Component } from "react";
import "./profilepage.css";
import { List } from "semantic-ui-react";
import ContestSelecter from "./ContestSelecter";
import background from "./background.jpg";

class ProfilePage extends Component {
  state = {
    toggle: false,
  };

  componentDidMount() {
    window.onbeforeunload = function () {
      return true;
    };
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  handleClick = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const user = this.props.user[0];

    if (typeof user === "undefined") {
      this.props.history.push("/");
      return (
        <div>
          <p>
            You are requested to visit the website again & Please contact the
            developer if you are reading this !
          </p>
          <p>Life is hard man ! </p>
        </div>
      );
    } else {
      var str = `Still ${user.rank} ?`;
      if (user.rank === "legendary grandmaster")
        str = "Legendary Grandmaster !";

      var time = new Date("1970-01-01");
      time.setSeconds(time.getSeconds() + user.registrationTimeSeconds);
      var t = time.toDateString();

      return (
        <div
          className="profileBody"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="profile-card-wrap">
            <input
              onClick={this.handleClick}
              id="check"
              type="checkbox"
              className="check"
            />
            <label htmlFor="check" className="toggle">
              {" "}
              +{" "}
            </label>
            <div className="content" data-text={str}>
              <div className="title">{user.handle}</div>
              <span>
                {this.state.toggle && (
                  <List>
                    <List.Item>
                      <List.Icon name="winner" /> Rating: {user.rating}
                    </List.Item>
                    <List.Item>
                      <List.Icon name="medium m" /> Max-Rating: {user.maxRating}
                    </List.Item>
                    <List.Item>
                      <List.Icon name="star outline" /> Contribution:{" "}
                      {user.contribution}
                    </List.Item>
                    <List.Item>
                      <List.Icon name="time" /> Reg: {t}
                    </List.Item>
                    <List.Item> </List.Item>
                    <List.Item>
                      <span>
                        <List.Icon name="quote left" />
                        Experience is the name everyone gives to their mistakes{" "}
                        <List.Icon name="quote right" />
                      </span>
                    </List.Item>
                  </List>
                )}
              </span>
            </div>
            <div className="link-info">
              <div
                className="photo"
                style={{
                  background: `url(${user.titlePhoto})  #fff no-repeat center / cover`,
                }}
              ></div>
            </div>
          </div>
          {this.state.toggle && (
            <ContestSelecter
              {...this.props}
              user={user}
              contests={this.props.contests}
              updateContest={this.props.updateContest}
              updateRatingChange={this.props.updateRatingChange}
            />
          )}
        </div>
      );
    }
  }
}

export default ProfilePage;
