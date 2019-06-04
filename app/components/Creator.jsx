import React, { useContext, Component } from 'react';
import Filter from './Filter.jsx';
import {AppContext} from './AppContext';
import {Checkbox, Row, Col, Preloader} from 'react-materialize';

class Creator extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleCheckboxClick.bind(this);
  }

  state = {}

  //React: Component rendered!
  componentDidMount() {
    this.context.fetchIngredients("assets/database/ingredients.json");

  }

  //Format double into valid currency format
  formatter() { return new Intl.NumberFormat('en-AU', {
    minimumFractionDigits: 2
  })}

  handleCheckboxClick(item, input) {
    const { setPreviewImg } = this.context;
    if(item.previewItem != null) {
      setPreviewImg(item.previewItem.url, input.currentTarget.checked);
    }
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

  //onClick={}
  generateIngredientTags() {

    let { appliedFilter, ingredients } = this.context.state;
    const { getFilter } = this.context;
    let filter = [];

    Object.keys(appliedFilter).forEach((key) => {
      if(appliedFilter[key] == true) {
        getFilter(key).forEach((value) => { if(!filter.includes(value)) filter.push(value) });
      }
    });

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
    return(
      <div className='creator'>
        <Filter url="assets/database/tag_filter.json"/>
        <div className="pizza_builder">

          <div className="ingredients_picker_1">
              {Object.keys(this.context.state.ingredients).length != 0 ?
                igd.slice(0, 2)
                :
                <Row className="center">
                  <Col s={4}><Preloader size="small" /></Col>
                </Row>
              }
          </div>

          <div className="pizza_preview">
            { preMap.length != 0 ?
              preMap.map((k, i) => {
                return this.context.state.previewImg[k] == true ?
                  <img className="preview_item" key={i} src={k} /> : ''
              })
              :
              <Row className="center">
                <Col s={4}><Preloader size="small" /></Col>
              </Row>
            }
          </div>

          <div className="ingredients_picker_2">
              {Object.keys(this.context.state.ingredients).length != 0 ?
                igd.slice(2)
                :
                <Row className="center">
                  <Col s={4}><Preloader size="small" /></Col>
                </Row>
              }
          </div>

        </div>

      </div>
    );
  }

}
Creator.contextType = AppContext;


export default Creator;
