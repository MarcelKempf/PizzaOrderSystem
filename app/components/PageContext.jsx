import React, { Component } from 'react';

class PageContext extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){

      Loader.turnLoadingBarOff();

  }

  render() {
    return(
      <div className="page_content" state={this.props}>{this.props.children}</div>
    );
  }

}

export const Loader = {
  turnLoadingBarOff: () => {
    const nav = document.querySelector('.navigation_section .page_loading');
    if(nav != null) nav.style.display = 'none';
  },

  turnLoadingBarOn: () => {
    const nav = document.querySelector('.navigation_section .page_loading');
    if(nav != null) nav.style.display = 'block';
  }

}

export default PageContext;
