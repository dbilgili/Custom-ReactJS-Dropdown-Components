This package features two custom dropdown menu components for ReactJS.

[Online demo](https://dbilgili.github.io/Custom-ReactJS-Dropdown-Components/index.html)

__Single-selection__       |  __Multi-selection__
:-------------------------:|:-------------------------:
![dd-single](https://user-images.githubusercontent.com/22943912/45922263-37477780-bec7-11e8-81dd-f85e53f8687b.gif)  |  ![dd-multiple](https://user-images.githubusercontent.com/22943912/45922265-40d0df80-bec7-11e8-9f6a-53eb8341592b.gif)

# Installation

    npm install reactjs-dropdown-component --save

Make sure that you inserted the following `link` tag between the `<head></head>` tags inside `/public/index.html` of your react project. This is required for the `FontAwesome` component that the package depends on.

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

# Usage

First, import the components:

```javascript
import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
```

The structure of the state for the dropdown data should be as follows:

```javascript
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
      title: 'Istanbul',
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
      title: 'Strawberry',
      selected: false,
      key: 'fruit'
    }
  ]
}
```

Then you need to include a function to control the state of the parent component.


This is for the single selection dropdown:
```javascript
resetThenSet = (id, key) => {
  let temp = JSON.parse(JSON.stringify(this.state[key]));
  temp.forEach(item => item.selected = false);
  temp[id].selected = true;
  this.setState({
    [key]: temp
  });
}
```
And this is for the multi selection dropdown:
```javascript
toggleSelected = (id, key) => {
  let temp = JSON.parse(JSON.stringify(this.state[key]));
  temp[id].selected = !temp[id].selected;
  this.setState({
    [key]: temp
  });
}
```

Finally use the components as follows:

```javascript
<Dropdown
  title="Select fruit"
  list={this.state.fruit}
  resetThenSet={this.resetThenSet}
/>

<DropdownMultiple
  titleHelper="Location"
  title="Select location"
  list={this.state.location}
  toggleItem={this.toggleSelected}
/>
```

Refer to the GitHub [repository](https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components) for the full code example.

# Custom Styling

Refer to the [following](https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components/blob/master/src/styles/stylus/dropdown.styl) styling file for overriding the default styles. You can create your own styling file with the same class names in order to do your custom styling.
