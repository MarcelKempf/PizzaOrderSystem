import React, { Component } from 'react';
import { Loader } from './PageContext';

export const AppContext = React.createContext();

export class AppProvider extends Component {

  constructor(props){
    super(props);
    this.fetchFilterData = this.fetchFilterData.bind(this);
  }

  state = {
    filterData: {},
    appliedFilter: {},
    shoppingCart: []
  }

  getTagStatus = name => this.state.appliedFilter[name];

  setTagStatus = (name, status) => {
    let filter = this.state.appliedFilter;
    filter[name] = status;
    if(this.state.filterData[name] != null)
      this.setState({ appliedFilter: filter });
  };

  addFilter = name => { this.setTagStatus(name, false); };

  toggleFilterTag = name => { this.setTagStatus(name, !this.getTagStatus(name)); };

  fetchFilterData = url => {
    Loader.turnLoadingBarOn();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let tags = this.state.appliedFilter;
        Object.keys(data).forEach((tag) => {
          tags[tag] = false;
        });
        this.setState({
          filterData: data,
          appliedFilter: tags
        });
        Loader.turnLoadingBarOff();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render(){
    return(
      <AppContext.Provider value={{
          state: this.state,
          setTagStatus: this.setTagStatus,
          getAppliedTag: this.getAppliedTag,
          getTagStatus: this.getTagStatus,
          fetchFilter: this.fetchFilterData,
          toggleFilterTag: this.toggleFilterTag
        }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContext;
