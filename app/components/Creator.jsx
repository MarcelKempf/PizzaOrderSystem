import React, { useContext, Component } from 'react';
import Filter from './Filter.jsx';
import { AppContext } from './AppContext';
import { Checkbox, Chip, Button, Icon, Modal } from 'react-materialize';
import { Loader } from './PageContext';
import { CheckoutCart } from './CheckoutCart';



class Creator extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleCheckboxClick.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  state = {
    alert: ''
  }

  //React: Component rendered!
  componentDidMount() {
    this.context.fetchIngredients("assets/database/ingredients.json");
  }

  //Format double into valid currency format
  formatter() {
    return new Intl.NumberFormat('en-AU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  })}

  handleCheckboxClick(item, input) {
    const { setPreviewImg, setCurrentPrice, getCurrentPrice, calcTotalPrice } = this.context;
    if(item.previewItem != null) {
      setPreviewImg(item.previewItem.url, input.currentTarget.checked);
    }
    const currentPrice = getCurrentPrice() + (input.currentTarget.checked ? item.price : (-item.price));
    setCurrentPrice(currentPrice);
    calcTotalPrice(this.context.state.size, currentPrice);
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if(!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  //Change pizza size (SMALL/MEDIUM/LARGE)
  handleSizeChange(size) {
    const { setCurrentSize, calcTotalPrice } = this.context;
    let prevTag = document.getElementById('purchase_' + this.context.state.size).children[0];
    let nextTag = document.getElementById('purchase_' + size).children[0];
    prevTag.style.background = '#e4e4e4';
    nextTag.style.background = '#d1d1d1';
    setCurrentSize(size);
    calcTotalPrice(size);
  }

  //Click on Purchase Button
  handlePurchase() {
    const { addItemToCart } = this.context;
    const pizzaItems = this.context.state.ingredients.filter((igd) => {
      if(document.getElementById('igdID_' + igd.id) != null) {
        if( document.getElementById('igdID_' + igd.id).checked ) {
          return true;
        }
      }
      return false;
    });
    if(pizzaItems.length !== 0)
      addItemToCart(pizzaItems);
    else
      this.setState({ alert: 'You must select at least one ingredient!' });
  }

  generateIngredientTags() {

    let { appliedFilter, ingredients } = this.context.state;
    const { getFilter } = this.context;
    let filter = [];

    //Collect all filter values to a filter property
    Object.keys(appliedFilter).forEach((key) => {
      if(appliedFilter[key] == true) {
        getFilter(key).forEach((value) => { if(!filter.includes(value)) filter.push(value) });
      }
    });

    //Build Ingredients
    let filteredIngredients = this.groupBy(ingredients, 'category');
    return Object.keys(filteredIngredients).map((topic, i) => {
      let category = filteredIngredients[topic].map((igd, i) => {
        const inclItem = !igd.filterValue.some((val) => filter.includes(val));
        if(inclItem == true) {
          return <span id={'igd_' + igd.id}  key={igd.id}><Checkbox id={'igdID_' + igd.id} onChange={this.handleClick.bind(this, igd)} className="igd_tag" value={igd.name} label={igd.name}></Checkbox>+{this.formatter().format(igd.price)}$ </span>;
        }
        return null;
      });
      const title = !category.every((value) => value === null) ? <div className="topic_title"><hr></hr><h4>{topic}</h4><hr></hr></div> : '';
      return <div key={i}>{title}{category}</div>;
    });
  }


  render() {
    let preMap = Object.keys(this.context.state.previewImg);
    const igd = this.generateIngredientTags();
    const onCloseModal = { onCloseEnd: () => { this.setState({ alert: ''}); } };
    return(
      <div className='creator'>
        <Filter url="assets/database/tag_filter.json"/>
        <div className="pizza_builder">

          <div className="ingredients_picker_1">
              {Object.keys(this.context.state.ingredients).length != 0 ?
                igd.slice(0, 2)
                :
                <Loader/>
              }
          </div>

          <div className="pizza_preview">
            { preMap.length != 0 ?
              preMap.map((k, i) => {
                return this.context.state.previewImg[k] == true ?
                  <img className="preview_item" key={i} src={k} /> : ''
              })
              :
              <Loader/>
            }
          </div>

          <div className="ingredients_picker_2">
              {Object.keys(this.context.state.ingredients).length != 0 ?
                igd.slice(2)
                :
                <Loader/>
              }
          </div>

        </div>
        <h5 className="pizza_price">{this.context.getTotalPrice() != 0 ? this.formatter().format(this.context.getTotalPrice()) : '0'}$</h5>
        <div className="sizebox">
          <span className="size_tag" id="purchase_Small" onClick={this.handleSizeChange.bind(this, 'Small')}><Chip>S<br/><p> + 0%</p></Chip></span>
          <span className="size_tag" id="purchase_Medium" onClick={this.handleSizeChange.bind(this, 'Medium')}><Chip>M<br/><p> + 20%</p></Chip></span>
          <span className="size_tag" id="purchase_Large" onClick={this.handleSizeChange.bind(this, 'Large')}><Chip >L<br/><p> + 30%</p></Chip></span>
      </div>
      <Modal header="Not possible" options={ onCloseModal } open={this.state.alert != '' ? true : false}><p>{this.state.alert}</p></Modal>
      <Button className="purchase_btn" type="submit" onClick={this.handlePurchase.bind(this)} waves="light">
        Add
        <Icon right>
          add_shopping_cart
        </Icon>
      </Button>
      <CheckoutCart shoppingCart={this.context.getShoppingCart()}/>
      </div>
    );
  }

}

Creator.contextType = AppContext;


export default Creator;
