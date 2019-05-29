import React, { useContext, Component } from 'react';
import Filter from './Filter.jsx';


class Creator extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className='creator'>
        <Filter url="assets/database/tag_filter.json"/>

      </div>
    );
  }

}


export default Creator;
