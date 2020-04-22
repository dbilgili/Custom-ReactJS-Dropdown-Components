/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './styles/global.sass';

class DropdownMultiple extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;

    this.state = {
      listOpen: false,
      headerTitle: title,
      keyword: '',
    };

    this.searchField = React.createRef();
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter((item) => item.selected).length;

    if (count === 0) {
      return { headerTitle: nextProps.title };
    }
    if (count === 1) {
      return { headerTitle: `${count} ${nextProps.titleHelper}` };
    }
    if (count > 1) {
      if (nextProps.titleHelperPlural) {
        return { headerTitle: `${count} ${nextProps.titleHelperPlural}` };
      }
      return { headerTitle: `${count} ${nextProps.titleHelper}s` };
    }

    return null;
  }

  close() {
    this.setState({
      listOpen: false,
    });
  }

  toggleList() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }), () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.listOpen && this.searchField.current) {
        this.searchField.current.focus();
        this.setState({
          keyword: '',
        });
      }
    });
  }

  filterList(e) {
    this.setState({
      keyword: e.target.value.toLowerCase(),
    });
  }

  listItems() {
    const { list, toggleItem, searchable } = this.props;
    const { keyword } = this.state;
    let tempList = list;

    if (keyword.length) {
      tempList = list
        .filter((item) => (
          item.title.toLowerCase().slice(0, keyword.length).includes(keyword)
        )).sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
    }

    if (tempList.length) {
      return (
        tempList.map((item) => (
          <button
            type="button"
            className="dd-list-item"
            key={item.id}
            onClick={() => toggleItem(item.id, item.key)}
          >
            {item.title}
            {' '}
            {item.selected && <FontAwesome name="check" />}
          </button>
        ))
      );
    }

    return <div className="dd-list-item no-result">{searchable[1]}</div>;
  }

  render() {
    const { searchable } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
        <button
          type="button"
          className="dd-header"
          onClick={() => this.toggleList()}
        >
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x" />
            : <FontAwesome name="angle-down" size="2x" />}
        </button>
        {listOpen && (
          <div
            role="list"
            className={`dd-list ${searchable ? 'searchable' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {searchable
            && (
            <input
              ref={this.searchField}
              className="dd-list-search-bar"
              placeholder={searchable[0]}
              onChange={(e) => this.filterList(e)}
            />
            )}
            <div className="dd-scroll-list">
              {this.listItems()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DropdownMultiple;
