import React, { Component } from 'react';
import * as components from 'unleash-styles';
import { routerShape } from 'react-router/lib/PropTypes';

console.log('COMPONENTS', components.default);

class Menu extends Component {
  handleMenuClick() {
    console.log('this ...');
  }

  render() {
    return (
      <div>test</div>
    );
  }
}

Menu.propTypes = {
  router: routerShape.isRequired,
};

export default Menu;
