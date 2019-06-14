import React, { Component } from 'react';
import { LoaderBar } from './PageContext';

export const AppContext = React.createContext();

export class AppProvider extends Component {

  constructor(props){
    super(props);
    this.cartCount = 0;
    this.fetchFilterData = this.fetchFilterData.bind(this);
  }

  state = {
    filterData: {},
    appliedFilter: {},
    previewImg: {},
    size: 'Small',
    pizzaprice: 0.00,
    totalprice: 0.00,
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

  setCurrentSize = size => { this.setState({ 'size': size}); }

  setCurrentPrice = price => { this.setState({ 'pizzaprice': price}); }

  getTotalPrice = price => this.state.totalprice;

  getCurrentPrice = () => this.state.pizzaprice;

  getCurrentSize = () => this.state.size;

  increaseCartCount = () => this.cartCount++;
  decreaseCartCount = () => this.cartCount--;
  getCartCount = () => this.cartCount;

  addItemToCart = (items, id = this.getCartCount()) => {
    let currentCart = this.getShoppingCart();
    let cartItem = {
      size: this.getCurrentSize(),
      ingredients: items
    };
    currentCart[id] = cartItem;
    this.setState({ 'shoppingCart': currentCart});
    this.increaseCartCount();
  }

  removeItemFromCart = (id) => {
    let currentCart = this.getShoppingCart();
    delete currentCart[id];
    //currentCart[id] = undefined;
    this.setState({ 'shoppingCart': currentCart});
  }

  getShoppingCart = () => this.state.shoppingCart;

  clearShoppingCart = () => this.setState({ 'shoppingCart': [] });;

  //CalculatePizzaPrice
  calcTotalPrice = (size, price = this.state.pizzaprice) => {
    switch(size) {
      case 'Small':
        this.setState({'totalprice': price});
        break;
      case 'Medium':
        this.setState({'totalprice': price * 1.2});
        break;
      case 'Large':
        this.setState({'totalprice': price * 1.3});
        break;
    }

  }

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

  disableAllPreviewImg = () => {
    let preMap = this.state.previewImg;
    Object.keys(preMap).forEach((img) => preMap[img] = false);
    this.setState({ previewImg: preMap});
  };

  formatter = () => new Intl.NumberFormat('en-AU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  fetchFilterData = url => {
    LoaderBar.turnLoadingBarOn();
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
        LoaderBar.turnLoadingBarOff();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchIngredientsData = url => {
    LoaderBar.turnLoadingBarOn();
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

        LoaderBar.turnLoadingBarOff();
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
          setCurrentSize: this.setCurrentSize,
          getCurrentSize: this.getCurrentSize,
          setCurrentPrice: this.setCurrentPrice,
          getCurrentPrice: this.getCurrentPrice,
          addItemToCart: this.addItemToCart,
          removeItemFromCart: this.removeItemFromCart,
          getShoppingCart: this.getShoppingCart,
          clearShoppingCart: this.clearShoppingCart,
          calcTotalPrice: this.calcTotalPrice,
          getTotalPrice: this.getTotalPrice,
          setPreviewImg: this.setPreviewImg,
          disableAllPreviewImg: this.disableAllPreviewImg,
          togglePreviewImg: this.togglePreviewImg,
          currencyFormatter: this.formatter,
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
