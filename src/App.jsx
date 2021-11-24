import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();

    //Initialize State
    this.state = {
      hasLoaded: false,
      title: "React App",
      weather: {},
      history: [],
    };
    //bind methods to thisof class instance
    this.displayLoading = this.displayLoading.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleFetch() {
    this.setState({ hasLoaded: false })
    const city = document.getElementById("city").value;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=98b3eb0493bfa8b787e756215985129a`,
      { mode: "cors" }).then((result) =>
        result.json().then((result) => {
          this.setState({ hasLoaded: true, weather: result });
        }).catch(error => {
          console.log(error)
        })
    );
  }

  displayLoading() {
    if (this.state.hasLoaded) {
      return (
        <div>
          <h2>{this.state.weather.name}</h2>
          <p>Weather: {this.state.weather.main.temp}</p>
        </div>
      );
    } else {
      return <h3>Open Weather App</h3>
    }
  }

  render() {
    return (
      <div>
        <h1>Weather Stats</h1>
        <input
            type="search"
            name="title"
            id="city"
            placeholder="Enter a city"
          />
          <button onClick={this.handleFetch}>Change City</button>
        <hr />
        {this.displayLoading()}
      </div>
    );
  }
}

export default App;
