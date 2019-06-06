import React, { Component } from 'react';
import {Row, Col, Preloader} from 'react-materialize';

class PageContext extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){

      LoaderBar.turnLoadingBarOff();

  }

  render() {
    return(
      <div className="page_content" state={this.props}>{this.props.children}</div>
    );
  }

}

export const Loader = (() => {
  return (
    <Row className="center">
      <Col s={4}><Preloader size="small" /></Col>
    </Row>);
});

export const LoaderBar = {
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
