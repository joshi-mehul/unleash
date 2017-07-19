import React, { Component } from 'react';
import { AppBar } from 'unleash-styles';
import { routerShape } from 'react-router/lib/PropTypes';

console.log('APPBAR', AppBar);
class Menu extends Component {
  handleMenuClick() {
    console.log('this ...');
  }

  render() {
    return (
      <AppBar />
    );
  }
}

Menu.propTypes = {
  router: routerShape.isRequired,
};

export default Menu;
