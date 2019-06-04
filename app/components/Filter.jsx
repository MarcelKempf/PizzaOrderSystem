import React, {Component} from 'react';
import {Chip, Row, Col, Preloader} from 'react-materialize';
import {AppContext} from './AppContext';

class Filter extends Component {

  constructor(props) {
    super(props);
  }

  //React: Component rendered!
  componentDidMount() {
    this.context.fetchFilter(this.props.url);
  }

  //Toggle Tag and all including other tags like Vegan: eggs, fish, meat, ...
  toggleTag(name, e, state) {
    if(this.context.state.filterData[name] !== undefined) {
      state = (state === undefined ? !this.context.getTagStatus(name) : state);
      this.context.setTagStatus(name, state);
      this.checkForIncludingTags(name, state);                                                            //Recursive!
      this.toggleTagHighlight(name);
      this.checkForImages();
    }
  }

  //Checks for combined tags like Vegan => No Meat(Just filter don't has it's own tag) but also no Fish(Tag), Egg(Tag)
  checkForIncludingTags(name, state) {
    this.context.state.filterData[name].filterof.forEach((filterof) => {
      if(filterof !== name) {
        this.toggleTag(filterof, null, state);
      }
    });
  }

  //Check for preview images which are active but through filter unchecked
  checkForImages() {
    let { appliedFilter, ingredients } = this.context.state;
    const { getFilter, getPreviewImgState, disablePreviewImg } = this.context;
    let filter = [];

    Object.keys(appliedFilter).forEach((key) => {
      if(appliedFilter[key] == true) {
        getFilter(key).forEach((value) => { if(!filter.includes(value)) filter.push(value) });
      }
    });

    ingredients.map((igd) => {
      const inclItem = !igd.filterValue.some((val) =>
        filter.includes(val)
      );
      if(inclItem == false) {
        if(igd.previewItem != null && getPreviewImgState(igd.previewItem.url) != false)
          disablePreviewImg(igd.previewItem.url);
      }
    });
  }

  //Changes the background of the tags to show the state if selected or not
  toggleTagHighlight(name) {
    document.getElementById('filter_' + name).children[0].style.background = this.context.getTagStatus(name) === true ? '#d1d1d1' : '#e4e4e4';
  }

  //Generate HTMLDOM with all tag out of this.context.filterData
  generateFilterTags() {
    let tags = Object.keys(this.context.state.filterData).map((tag, i) => <span id={'filter_' + tag} onClick={this.toggleTag.bind(this, tag)} key={i}><Chip className="filter_tag">{tag}</Chip></span>);
    return tags;
  }

  render() {
    return (
      <div className="filter_box">
        {Object.keys(this.context.state.filterData).length != 0 ?
          this.generateFilterTags()
          :
          <Row className="center">
            <Col s={4}><Preloader size="small" /></Col>
          </Row>
        }
      </div>
    );
  }
}
Filter.contextType = AppContext;

export default Filter;
