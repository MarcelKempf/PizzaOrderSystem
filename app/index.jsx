import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Errorpage from './components/Errorpage.jsx';

ReactDOM.render(
  <React.Fragment>
    <Header/>
    <div className="page_content">
      <Errorpage/>
    </div>
  </React.Fragment>, document.getElementById('root')
);
