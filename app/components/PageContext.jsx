import React, { Component } from 'react';

class PageContext extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    // const nav = document.querySelector('.navigation_section .page_loading');
    // if(nav != null) nav.style.display = 'block';
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    setTimeout(() => {
      const nav = document.querySelector('.navigation_section .page_loading');
      if(nav != null) nav.style.display = 'none';
      console.log("Update");
    }, 50);
  }

  render() {
    return(
      <div className="page_content">{this.props.children}</div>
    );
  }

}

export default PageContext;
