import React, { Component } from 'react';
import { Row, Col, ProgressBar, Breadcrumb } from 'react-materialize';
import { Link } from 'react-router-dom';
import { buildLink } from './SiteLink.jsx';

class Navigation extends Component {

  constructor(props){
    super(props);
  
  }

  componentDidMount() {
    let scrollBox = document.querySelector('.navigation_section .teal .col');
    if(scrollBox != null) scrollBox.scrollLeft = 9999;
  }

  loadNavigationTree() {
    const path = this.props.path;
    if(path !== null)
      return [...path].map((name, i) => buildLink(name, i));
    return null;
  }

  render() {
    return(
      <div className="navigation_section">
        <Row className="page_loading">
          <Col s={12}>
            <ProgressBar/>
          </Col>
        </Row>
        <Breadcrumb className="teal">
          {this.loadNavigationTree()}
        </Breadcrumb>

      </div>
    );
  }

}

export default Navigation;
