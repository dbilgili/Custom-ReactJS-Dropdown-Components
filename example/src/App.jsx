import React, { Component } from 'react';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [
        {
          label: 'New York',
          value: 'newYork',
        },
        {
          label: 'Dublin',
          value: 'dublin',
        },
        {
          label: 'Istanbul',
          value: 'istanbul',
        },
        {
          label: 'California',
          value: 'colifornia',
        },
        {
          label: 'Izmir',
          value: 'izmir',
        },
        {
          label: 'Oslo',
          value: 'oslo',
        },
      ],
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.tabKeyPressed);
    window.addEventListener('mousedown', this.mouseClicked);
  }

  tabKeyPressed = (e) => {
    if (e.keyCode === 9) {
      document.querySelector('body').classList.remove('noFocus');
      window.removeEventListener('keydown', this.tabKeyPressed);
      window.addEventListener('mousedown', this.mouseClicked);
    }
  }

  mouseClicked = () => {
    document.querySelector('body').classList.add('noFocus');
    window.removeEventListener('mousedown', this.mouseClicked);
    window.addEventListener('keydown', this.tabKeyPressed);
  }

  onChange = (item, name) => { console.log(item, name); }

  render() {
    const { locations } = this.state;

    return (
      <div className="App">
        <p>Dropdown menu examples</p>

        <h3>Regular</h3>

        <div className="wrapper">
          <DropdownMultiple
            name="locations"
            titleSingular="Location"
            title="Select locations"
            list={locations}
            onChange={this.onChange}
          />

          <Dropdown
            name="location"
            title="Select location"
            list={locations}
            onChange={this.onChange}
          />
        </div>

        <h3>Searchable</h3>

        <div className="wrapper">
          <DropdownMultiple
            name="locations"
            searchable={['Search for location', 'No matching location']}
            titleSingular="Location"
            title="Select locations"
            list={locations}
            onChange={this.onChange}
          />

          <Dropdown
            name="location"
            searchable={['Search for location', 'No matching location']}
            title="Select location"
            list={locations}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
