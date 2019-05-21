import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from './components/Header.jsx';
import Errorpage from './components/Errorpage.jsx';
import Navigation from './components/Navigation.jsx';
import Home from './components/Home.jsx';
import Creator from './components/Creator.jsx';
import Checkout from './components/Checkout.jsx';
import Confirmation from './components/Confirmation.jsx';
import PageContext from './components/PageContext.jsx';


const implementSite = (path, site) => {
  return <React.Fragment>
           {(path[0] == 'Home' && path.length == 1) ? null : <Navigation path={path}/>}
           <PageContext>{site}</PageContext>
         </React.Fragment>;
};


ReactDOM.render(

  <React.Fragment>
    <Router>
      <Header/>
        <Switch>
          <Route exact path="/" render={() => implementSite(['Home'], <Home/>)} />
          <Route exact path="/creator" render={() => implementSite(['Home', 'Creator'], <Creator/>)} />
          <Route exact path="/checkout" render={() => implementSite(['Home', 'Creator', 'Checkout'], <Checkout/>)} />
          <Route exact path="/confirmation" render={() => implementSite(['Home', 'Creator', 'Checkout', 'Confirmation'], <Confirmation/>)} />
          <Route render={() => implementSite(['Home', 'Error'], <Errorpage/>)} />
        </Switch>

    </Router>

  </React.Fragment>, document.getElementById('root')
);
