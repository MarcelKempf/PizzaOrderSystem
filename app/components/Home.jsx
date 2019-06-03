import React, { Component } from 'react';
import { buildLink } from './SiteLink';

class Home extends Component {

  render(){
    return(
      <div className="onepager">
        <div className="homepage">
          <h1>Build your own La'Pizza</h1>
          {buildLink('Creator', 1, 'exit_to_app')}
        </div>
      </div>
    );
  }

}

export default Home;
