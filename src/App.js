import React, { Component } from 'react';
import DropdownMultiple from './components/DropdownMultiple';
import Dropdown from './components/Dropdown';

class App extends Component {
    constructor(){
    super()
    this.state = {
      location: [
        {
          id: 0,
          title: 'New York',
          selected: false,
          key: 'location'
        },
        {
          id: 1,
          title: 'Dublin',
          selected: false,
          key: 'location'
        },
        {
          id: 2,
          title: 'California',
          selected: false,
          key: 'location'
        },
        {
          id: 3,
          title: 'Istanbul',
          selected: false,
          key: 'location'
        },
        {
          id: 4,
          title: 'Izmir',
          selected: false,
          key: 'location'
        },
        {
          id: 5,
          title: 'Oslo',
          selected: false,
          key: 'location'
        },
        {
          id: 6,
          title: 'Zurich',
          selected: false,
          key: 'location'
        }
      ],
      fruit: [
        {
          id: 0,
          title: 'Apple',
          selected: false,
          key: 'fruit'
        },
        {
          id: 1,
          title: 'Orange',
          selected: false,
          key: 'fruit'
        },
        {
          id: 2,
          title: 'Grape',
          selected: false,
          key: 'fruit'
        },
        {
          id: 3,
          title: 'Pomegranate',
          selected: false,
          key: 'fruit'
        },
        {
          id: 4,
          title: 'Strawberry',
          selected: false,
          key: 'fruit'
        }
      ]
    }
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected = (id, key) => {
    this.setState((prevState) => {
      let temp = prevState[key];
      temp[id].selected = !temp[id].selected
      return {
        [key]: temp
      }
    })
  }

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }

  render() {
    return (
      <div className="App">
        <p>Dropdown menu examples</p>

        <div className="wrapper">
          <DropdownMultiple
            titleHelper="Location"
            title="Select location"
            list={this.state.location}
            toggleItem={this.toggleSelected}
          />

          <Dropdown
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
