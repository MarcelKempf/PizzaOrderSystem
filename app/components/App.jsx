import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from './Header';
import Errorpage from './Errorpage';
import Navigation from './Navigation';
import Home from './Home';
import Creator from './Creator';
import Checkout from './Checkout';
import Confirmation from './Confirmation';
import PageContext from './PageContext';

import { AppProvider } from './AppContext';

class App extends Component {

  implementSite(path, site) {
    return <React.Fragment>
             {(path[0] == 'Home' && path.length == 1) ? null : <Navigation path={path}/>}
             <PageContext>{site}</PageContext>
           </React.Fragment>;
  }

  render() {
    return(
      <Router>
        <AppProvider>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" render={() => this.implementSite(['Home'], <Home/>)} />
              <Route exact path="/creator" render={(props) => this.implementSite(['Home', 'Creator'], <Creator history={props.history}/>) } />
              <Route exact path="/creator/confirmation" render={(props) => this.implementSite(['Home', 'Creator', 'Confirmation'], <Confirmation {...props}/>)} />
              <Route render={() => this.implementSite(['Home', 'Error'], <Errorpage/>)} />
            </Switch>
          </div>
        </AppProvider>
      </Router>
    );
  }

}

export default App;
