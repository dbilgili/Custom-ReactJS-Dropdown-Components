This package features two custom dropdown menu components for ReactJS.

__WARNING:__ Breaking changes take effect from version `1.1.7`. If you are using any of the earlier versions, refer to the [previous README files](https://www.npmjs.com/package/reactjs-dropdown-component?activeTab=explore).

[Online demo](https://dbilgili.github.io/Custom-ReactJS-Dropdown-Components/index.html)

__Single-selection__       |  __Multi-selection__
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/22943912/80020903-121f4e80-84da-11ea-847d-fca74bf64658.gif" width="250px"> |  <img src="https://user-images.githubusercontent.com/22943912/80020916-13507b80-84da-11ea-8dae-144dcc43df36.gif" width="250px">
__Single-selection searchable__       |  __Multi-selection searchable__
<img src="https://user-images.githubusercontent.com/22943912/80020914-13507b80-84da-11ea-8cce-0f9c515cdb71.gif" width="250px">  |  <img src="https://user-images.githubusercontent.com/22943912/80020910-12b7e500-84da-11ea-9f5f-0632c4db4126.gif" width="250px">

# Installation

`npm install --save reactjs-dropdown-component`

# Usage

Import the component you want to use;

```javascript
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
```

If you are using NextJS, import them dynamically instead;

```javascript
import dynamic from 'next/dynamic';

const Dropdown = dynamic(
  async () => {
    const module = await import('reactjs-dropdown-component');
    const DD = module.Dropdown;

    return ({ forwardedRef, ...props }) => <DD ref={forwardedRef} {...props} />;
  },
  { ssr: false },
);

const DropdownMultiple = dynamic(
  async () => {
    const module = await import('reactjs-dropdown-component');
    const DDM = module.DropdownMultiple;

    return ({ forwardedRef, ...props }) => <DDM ref={forwardedRef} {...props} />;
  },
  { ssr: false },
);
```

The shape of the objects in the data array should be as follows:

```javascript
const locations = [
  {
    label: 'New York',
    value: 'newYork',
  },
  {
    label: 'Oslo',
    value: 'oslo',
  },
  {
    label: 'Istanbul',
    value: 'istanbul',
  }
];
```

Use a function to pass to `onChange` prop.
For `<Dropdown>` component item is an object, whereas for `<DropdownMultiple>` it is an array of objects.

```javascript
  onChange = (item, name) => {
    ...
  }
```

Finally use the components as follows:

```javascript
<Dropdown
  name="location"
  title="Select location"
  list={locations}
  onChange={this.onChange}
/>

<DropdownMultiple
  name="location"
  title="Select location"
  titleSingular="location"
  list={locations}
  onChange={this.onChange}
/>
```

Note that when multiple options are selected in `<DropdownMultiple>`, `titleSingular` value automatically becomes the plural form of the noun. If you want to use a custom plural title, define `titlePlural` as well.

```javascript
<DropdownMultiple
  name="location"
  title="Velg sted"
  titleSingular="Sted"
  titlePlural="Steder"
  list={locations}
  onChange={this.onChange}
/>
```

## Search functionality

Using `searchable` prop enables the search bar.
Pass an array of strings corresponding to __place holder__ and __not found message__ respectively.

```javascript
<Dropdown
  name="location"
  title="Select location"
  searchable={["Search for location", "No matching location"]}
  list={locations}
  onChange={this.onChange}
/>
```

## Selecting item(s) by default

Use the `select` prop to define the initally selected item(s).

For `<Dropdown>`
```javascript
select={{value: 'istanbul'}}
```

For `<DropdownMultiple>`
```javascript
select={[{value: 'oslo'}, {value: 'istanbul'}]}
```

## Calling internal functions

Pass a ref and use it to call the internal functions.

For `<Dropdown>`
```javascript
<Dropdown
  ref={this.dropdownRef}
  ...
/>

this.dropdownRef.current.selectSingleItem({ value: 'oslo' });
this.dropdownRef.current.clearSelection();
```

For `<DropdownMultiple>`
```javascript
<DropdownMultiple
  ref={this.dropdownRef}
  ...
/>

this.dropdownRef.current.selectMultipleItems([
  { value: 'istanbul' }
  { value: 'oslo' },
]);

this.dropdownRef.current.selectAll();
this.dropdownRef.current.deselectAll();
```

## Custom styling

Use the following keys in an object passed to `styles` prop

```javascript
wrapper
header
headerTitle
headerArrowUpIcon
headerArrowDownIcon
checkIcon
list
listSearchBar
scrollList
listItem
listItemNoResult
```

Example:

```javascript
<Dropdown
  name="location"
  title="Select location"
  list={locations}
  onChange={this.onChange}
  styles={{
    headerTitle: { color: 'red' }
  }}
/>
```

Note that `styles` prop is meant for basic styling. Use stylesheet by targeting the specific [class names](https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components/blob/master/src/styles/dropdown.sass) for more complicated stylings.

Use `id` prop to set an additional class name to every element in the dropdown menu. That way you can style multiple dropdown menus with different stylings rules.

In order to define your own arrow and check icons, use `arrowUpIcon`, `arrowDownIcon` and `checkIcon` props. These props accept an element type.
