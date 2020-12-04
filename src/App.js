import prostars from "./prostars.json";
import "./App.css";
import StarRow from "./components/StarRow";
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = { stars: {} };
  }

  getTopFive = () => {
    let starsList = {};
    for (let i = 0; i < 5; i++) {
      starsList[prostars[i].id] = {
        url: prostars[i].pictureUrl,
        name: prostars[i].name,
        popularity: prostars[i].popularity,
      };
    }

    return starsList;
  };

  componentDidMount() {
    this.setState({ stars: { ...this.getTopFive() } });
  }

  deleteStar = (id) => {
    this.setState((prevState) => {
      delete prevState.stars[id];
      return {
        ...prevState,
      };
    });
  };

  getRandomStars = () => {
    let starsList = {};
    let array = [1, 1, 1, 1].map(() => {
      return Math.floor(Math.random() * prostars.length);
    });

    array.forEach((index) => {
      let prostar = prostars[index];
      starsList[prostar.id] = {
        url: prostar.pictureUrl,
        name: prostar.name,
        popularity: prostar.popularity,
      };
    });
    this.setState({ stars: starsList });
  };

  getByName = () => {
    let sorted = prostars.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    let starsList = {};
    for (let i = 0; i < 4; i++) {
      starsList[sorted[i].id] = {
        url: sorted[i].pictureUrl,
        name: sorted[i].name,
        popularity: sorted[i].popularity,
      };
    }
    this.setState({ stars: starsList });
  };

  getByPopularity = () => {
    let sorted = prostars.sort((a, b) => b.popularity - a.popularity);

    let starsList = {};
    for (let i = 0; i < 4; i++) {
      starsList[sorted[i].id] = {
        url: sorted[i].pictureUrl,
        name: sorted[i].name,
        popularity: sorted[i].popularity,
      };
    }
    this.setState({ stars: starsList });
  };

  render() {
    let stars = this.state.stars;
    let ids = Object.keys(stars);

    return (
      <React.Fragment>
        <div className="buttons">
          <div className="random" onClick={this.getRandomStars}>
            Get Random Contact
          </div>
          <div className="byName" onClick={this.getByName}>
            Get By Name
          </div>
          <div className="byPopularity" onClick={this.getByPopularity}>
            Get By Popularity
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Picture</td>
              <td>Name</td>
              <td>Popularity</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {ids.map((id) => (
              <StarRow
                key={id}
                {...stars[id]}
                id={id}
                deleteStar={this.deleteStar}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
