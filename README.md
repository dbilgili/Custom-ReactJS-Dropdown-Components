This package features two custom dropdown menu components for ReactJS.

[Online demo](https://dbilgili.github.io/Custom-ReactJS-Dropdown-Components/index.html)

__Single-selection__       |  __Multi-selection__
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/22943912/80020903-121f4e80-84da-11ea-847d-fca74bf64658.gif" width="250px"> |  <img src="https://user-images.githubusercontent.com/22943912/80020916-13507b80-84da-11ea-8dae-144dcc43df36.gif" width="250px">
__Single-selection searchable__       |  __Multi-selection searchable__
<img src="https://user-images.githubusercontent.com/22943912/80020914-13507b80-84da-11ea-8cce-0f9c515cdb71.gif" width="250px">  |  <img src="https://user-images.githubusercontent.com/22943912/80020910-12b7e500-84da-11ea-9f5f-0632c4db4126.gif" width="250px">

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
state = {
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
toggleItem = (id, key) => {
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
  toggleItem={this.toggleItem}
/>
```

Note that when multiple options are selected in __DropdownMultiple__, `titleHelper` value gets an `s` letter appended. If you want to use a custom plural title, define `titleHelperPlural` as well.

```javascript
<DropdownMultiple
  titleHelper="Sted"
  titleHelperPlural="Steder"
  title="Velg sted"
  list={this.state.location}
  toggleItem={this.toggleItem}
/>
```

## Search functionality

Using `searchable` prop enables the search bar.
Pass an array of strings corresponding to __place holder__ and __not found message__ respectively.

```javascript
<Dropdown
  searchable={["Search for fruit", "No matching fruit"]}
  title="Select fruit"
  list={this.state.fruit}
  resetThenSet={this.resetThenSet}
/>
```


# Custom Styling

Refer to the [following](https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components/blob/master/src/styles/dropdown.sass) styling file for overriding the default styles. You can create your own styling file with the same class names in order to do your custom styling.
