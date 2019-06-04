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
    previewImg: {},
    shoppingCart: [],
    ingredients: []
  }

  getTagStatus = name => this.state.appliedFilter[name];

  setTagStatus = (name, status) => {
    let filter = this.state.appliedFilter;
    filter[name] = status;
    if(this.state.filterData[name] != null)
      this.setState({ appliedFilter: filter });
  };

  getFilter = name => this.state.filterData[name].filterof;

  addFilter = name => { this.setTagStatus(name, false); };

  toggleFilterTag = name => { this.setTagStatus(name, !this.getTagStatus(name)); };

  getPreviewImgState = url => { this.state.previewImg[url] };

  setPreviewImg = (url, state) => {
    let preMap = this.state.previewImg;
    preMap[url] = state;
    this.setState({ previewImg: preMap });
  };

  disablePreviewImg = url => {
    let preMap = this.state.previewImg;
    preMap[url] = false;
    this.setState({ previewImg: preMap });
  };

  enablePreviewImg = url => {
    let preMap = this.state.previewImg;
    preMap[url] = true;
    this.setState({ previewImg: preMap });
  };

  togglePreviewImg = url => {
    let preMap = this.state.previewImg;
    preMap[url] = !preMap[url];
    this.setState({ previewImg: preMap });
  };

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

  fetchIngredientsData = url => {
    Loader.turnLoadingBarOn();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const entries = Object.entries(data);
        let previewMap = this.state.previewImg;

        //Generate Preview Map to save the enable/disable state of each preview image
        for(let [index, value] of entries) {
          if(value.previewItem !== null) {
            previewMap[value.previewItem.url] = false;
          }
        }

        this.setState({
          ingredients: data,
          previewImg: previewMap
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
          getFilter: this.getFilter,
          getTagStatus: this.getTagStatus,
          getPreviewImgState: this.getPreviewImgState,
          disablePreviewImg: this.disablePreviewImg,
          enablePreviewImg: this.enablePreviewImg,
          setPreviewImg: this.setPreviewImg,
          togglePreviewImg: this.togglePreviewImg,
          fetchFilter: this.fetchFilterData,
          fetchIngredients: this.fetchIngredientsData,
          toggleFilterTag: this.toggleFilterTag
        }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppContext;
