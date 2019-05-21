import React, { Component } from 'react';
import { buildLink } from './SiteLink';

class Home extends Component {

  render(){
    return(
      <div className="homepage">
        <h1>Home</h1>
        {buildLink('Creator', 1, 'exit_to_app')}
      </div>
    );
  }

}

export default Home;
