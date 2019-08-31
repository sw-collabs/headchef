import searchBar from './SearchBar/searchBar';
import category from './Category/category';
import Element from 'Element';
import {categoryData} from './data';

import './css/searchDisplay.css';


function renderSearchBar() {
  return Element()
    .withClass('searchDisplay-wrapper')
    .withChildren(searchBar({
      onInputEnter: () => this.setState({ whichView: 'INPUT' }),
      onInputExit: () => this.setState({ whichView: 'CATEGORY' })
    }));
}

function renderBottom(whichView) {
  switch (whichView) {
    case 'CATEGORY':
      return Element()
        .withChildren(...categoryData.map(data => Element()
          .withClass('category-wrapper')
          .withChildren(category(data))
        ));
    case 'INPUT':
      return Element()
        .withInnerHTML('hi there!');
    default:
      return null;
  }
}

function render() {
  return Element()
    .withClass('searchDisplay')
    .withChildren(
      renderSearchBar.bind(this)(),
      renderBottom(this.state.whichView)
    );
}

export default function searchDisplay() {
  let _state = {
    whichView: 'CATEGORY' // CATEGORY, INPUT, ...
  };

  return Element()
    .withState(_state)
    .withCustomRender(render)
};
