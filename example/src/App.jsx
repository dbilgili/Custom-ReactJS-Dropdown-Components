import React, { Component } from 'react';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: [
        {
          id: 0,
          title: 'New York',
          selected: false,
          key: 'location',
        },
        {
          id: 1,
          title: 'Dublin',
          selected: false,
          key: 'location',
        },
        {
          id: 2,
          title: 'California',
          selected: false,
          key: 'location',
        },
        {
          id: 3,
          title: 'Istanbul',
          selected: false,
          key: 'location',
        },
        {
          id: 4,
          title: 'Izmir',
          selected: false,
          key: 'location',
        },
        {
          id: 5,
          title: 'Oslo',
          selected: false,
          key: 'location',
        },
        {
          id: 6,
          title: 'Zurich',
          selected: false,
          key: 'location',
        },
      ],
      fruit: [
        {
          id: 0,
          title: 'Apple',
          selected: false,
          key: 'fruit',
        },
        {
          id: 1,
          title: 'Orange',
          selected: false,
          key: 'fruit',
        },
        {
          id: 2,
          title: 'Grape',
          selected: false,
          key: 'fruit',
        },
        {
          id: 3,
          title: 'Pomegranate',
          selected: false,
          key: 'fruit',
        },
        {
          id: 4,
          title: 'Strawberry',
          selected: false,
          key: 'fruit',
        },
        {
          id: 5,
          title: 'Banana',
          selected: false,
          key: 'fruit',
        },
        {
          id: 6,
          title: 'Blueberry',
          selected: false,
          key: 'fruit',
        },
        {
          id: 7,
          title: 'Watermelon',
          selected: false,
          key: 'fruit',
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

  toggleItem = (item) => {
    const { id, key } = item;
    const temp = JSON.parse(JSON.stringify(this.state[key]));

    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp,
    });
  }

  resetThenSet = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach((item) => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp,
    });
  }

  render() {
    return (
      <div className="App">
        <p>Dropdown menu examples</p>

        <h3>Regular</h3>

        <div className="wrapper">
          <DropdownMultiple
            titleHelper="Location"
            title="Select location"
            list={this.state.location}
            toggleItem={this.toggleItem}
          />

          <Dropdown
            title="Select fruit"
            list={this.state.fruit}
            resetThenSet={this.resetThenSet}
          />
        </div>

        <h3>Searchable</h3>

        <div className="wrapper">
          <DropdownMultiple
            searchable={['Search for location', 'No matching location']}
            titleHelper="Location"
            title="Select location"
            list={this.state.location}
            toggleItem={this.toggleItem}
          />

          <Dropdown
            searchable={['Search for fruit', 'No matching fruit']}
            title="Select fruit"
            list={this.state.fruit}
            resetThenSet={this.resetThenSet}
          />
        </div>
      </div>
    );
  }
}

export default App;
