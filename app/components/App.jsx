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
              <Route exact path="/PizzaOrderSystem/" render={() => this.implementSite(['Home'], <Home/>)} />
              <Route exact path="/PizzaOrderSystem/creator" render={() => this.implementSite(['Home', 'Creator'], <Creator/>)} />
              <Route exact path="/PizzaOrderSystem/checkout" render={() => this.implementSite(['Home', 'Creator', 'Checkout'], <Checkout/>)} />
              <Route exact path="/PizzaOrderSystem/confirmation" render={() => this.implementSite(['Home', 'Creator', 'Checkout', 'Confirmation'], <Confirmation/>)} />
              <Route render={() => this.implementSite(['Home', 'Error'], <Errorpage/>)} />
            </Switch>
          </div>
        </AppProvider>
      </Router>
    );
  }

}

export default App;
