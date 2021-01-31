/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import ArrowDown from './assets/arrowDown.svg';
import ArrowUp from './assets/arrowUp.svg';
import Check from './assets/check.svg';
import './styles/global.sass';

class DropdownMultiple extends Component {
  constructor(props) {
    super(props);
    const { title, list } = this.props;

    this.state = {
      isListOpen: false,
      title,
      keyword: '',
      selectedItems: [],
      list,
    };

    this.searchField = React.createRef();
  }

  componentDidMount() {
    const { select } = this.props;

    if (select.length) {
      this.selectMultipleItems(select);
    }
  }

  componentDidUpdate() {
    const { isListOpen } = this.state;

    setTimeout(() => {
      if (isListOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { list } = nextProps;

    if (JSON.stringify(list) !== JSON.stringify(prevState.list)) {
      return { list };
    }

    return null;
  }

  close = () => {
    this.setState({
      isListOpen: false,
    });
  }

  selectAll = () => {
    const { name, onChange } = this.props;

    this.setState((prevState) => ({
      selectedItems: prevState.list,
    }), () => {
      this.handleTitle();
      onChange(this.state.selectedItems, name);
    });
  }

  deselectAll = () => {
    const { name, onChange } = this.props;

    this.setState({
      selectedItems: [],
    }, () => {
      this.handleTitle();
      onChange(this.state.selectedItems, name);
    });
  }

  selectMultipleItems = (items) => {
    const { list } = this.state;

    items.forEach((item) => {
      const selectedItem = list.find((i) => i.value === item.value);
      setTimeout(() => {
        this.selectItem(selectedItem, true);
      });
    });
  }

  selectItem = (item, noCloseOnSelection = false) => {
    const { closeOnSelection } = this.props;

    this.setState({
      isListOpen: (!noCloseOnSelection && !closeOnSelection) || false,
    }, () => this.handleSelection(item, this.state.selectedItems));
  }

  handleSelection = (item, selectedItems) => {
    const { name, onChange } = this.props;

    const index = selectedItems.findIndex((i) => i.value === item.value);

    if (index !== -1) {
      const selectedItemsCopy = [...selectedItems];
      selectedItemsCopy.splice(index, 1);
      this.setState(() => ({
        selectedItems: selectedItemsCopy,
      }), () => {
        onChange(this.state.selectedItems, name);
        this.handleTitle();
      });
    } else {
      this.setState((prevState) => ({
        selectedItems: [...prevState.selectedItems, item],
      }), () => {
        onChange(this.state.selectedItems, name);
        this.handleTitle();
      });
    }
  }

  handleTitle = () => {
    const { selectedItems } = this.state;
    const { title, titleSingular, titlePlural } = this.props;

    const { length } = selectedItems;

    if (!length) {
      this.setState({
        title,
      });
    } else if (length === 1) {
      this.setState({
        title: `${length} ${titleSingular}`,
      });
    } else if (titlePlural) {
      this.setState({
        title: `${length} ${titlePlural}`,
      });
    } else {
      const pluralizedTitle = pluralize(titleSingular, length);
      this.setState({
        title: `${length} ${pluralizedTitle}`,
      });
    }
  }

  toggleList = () => {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }), () => {
      if (this.state.isListOpen && this.searchField.current) {
        this.searchField.current.focus();
        this.setState({
          keyword: '',
        });
      }
    });
  }

  filterList = (e) => {
    this.setState({
      keyword: e.target.value.toLowerCase(),
    });
  }

  listItems = () => {
    const {
      id,
      searchable,
      checkIcon,
      styles,
    } = this.props;
    const { listItem, listItemNoResult } = styles;
    const { keyword, list, selectedItems } = this.state;
    let tempList = [...list];

    if (keyword.length) {
      tempList = list.filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase()));
    }

    if (tempList.length) {
      return (
        tempList.map((item) => (
          <button
            type="button"
            className={`dd-list-item ${id}`}
            style={listItem}
            key={item.value}
            onClick={() => this.selectItem(item)}
          >
            {item.label}
            {' '}
            {selectedItems.some((i) => i.value === item.value) && (
            <span style={styles.checkIcon}>
              {checkIcon || <Check />}
            </span>
            )}
          </button>
        ))
      );
    }

    return (
      <div
        className={`dd-list-item no-result ${id}`}
        style={listItemNoResult}
      >
        {searchable[1]}
      </div>
    );
  }

  render() {
    const {
      id,
      searchable,
      arrowUpIcon,
      arrowDownIcon,
      styles,
    } = this.props;
    const { isListOpen, title } = this.state;

    const {
      wrapper,
      header,
      headerTitle,
      headerArrowUpIcon,
      headerArrowDownIcon,
      list,
      listSearchBar,
      scrollList,
    } = styles;

    return (
      <div
        className={`dd-wrapper ${id}`}
        style={wrapper}
      >
        <button
          type="button"
          className={`dd-header ${id}`}
          style={header}
          onClick={this.toggleList}
        >
          <div
            className={`dd-header-title ${id}`}
            style={headerTitle}
          >
            {title}
          </div>
          {isListOpen
            ? <span style={headerArrowUpIcon}>{arrowUpIcon || <ArrowUp />}</span>
            : <span style={headerArrowDownIcon}>{arrowDownIcon || <ArrowDown />}</span>}
        </button>
        {isListOpen && (
          <div
            role="list"
            type="button"
            className={`dd-list ${searchable ? ' searchable' : ''} ${id}`}
            style={list}
            onClick={(e) => e.stopPropagation()}
          >
            {searchable
            && (
            <input
              ref={this.searchField}
              className={`dd-list-search-bar ${id}`}
              style={listSearchBar}
              placeholder={searchable[0]}
              onChange={(e) => this.filterList(e)}
            />
            )}
            <div
              className={`dd-scroll-list ${id}`}
              style={scrollList}
            >
              {this.listItems()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

DropdownMultiple.defaultProps = {
  id: '',
  select: [],
  closeOnSelection: false,
  titlePlural: undefined,
  searchable: undefined,
  styles: {},
  arrowUpIcon: null,
  arrowDownIcon: null,
  checkIcon: null,
};

DropdownMultiple.propTypes = {
  id: PropTypes.string,
  styles: PropTypes.shape({
    wrapper: PropTypes.string,
    header: PropTypes.string,
    headerTitle: PropTypes.string,
    headerArrowUpIcon: PropTypes.string,
    headerArrowDownIcon: PropTypes.string,
    checkIcon: PropTypes.string,
    list: PropTypes.string,
    listSearchBar: PropTypes.string,
    scrollList: PropTypes.string,
    listItem: PropTypes.string,
    listItemNoResult: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  titleSingular: PropTypes.string.isRequired,
  titlePlural: PropTypes.string,
  list: PropTypes.shape([{ value: PropTypes.string, label: PropTypes.string }]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  closeOnSelection: PropTypes.bool,
  searchable: PropTypes.shape([PropTypes.string, PropTypes.string]),
  select: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
  })),
  checkIcon: PropTypes.elementType,
  arrowUpIcon: PropTypes.elementType,
  arrowDownIcon: PropTypes.elementType,
};

export default DropdownMultiple;
