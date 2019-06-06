import React, { Component } from 'react';
import { Icon, Button } from 'react-materialize';

class Errorpage extends Component {

  render() {
    return(
      <div className="information_box">
        <h2 className="information_title">404 Error</h2>
        <p>We couldn't find your page</p>
        <Button className="back_home"waves="light" node="a" href="PizzaOrderSystem/">
          Go to homepage
        </Button>
      </div>
    );
  }

}

export default Errorpage;
