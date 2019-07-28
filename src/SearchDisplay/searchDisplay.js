import uuidv4 from "uuid/v4";
import searchBar from './SearchBar/searchBar';
import category from './Category/category';
import Dairy from './Category/_resources/dairy.svg';
import Vegetables from './Category/_resources/harvest.svg';
import Meats from './Category/_resources/shawarma.svg';

import element from './element';

import './_css/searchDisplay.css';

function createWrapper(className, ...children) {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add(className);

  children.forEach(child => node.appendChild(child));
  return node;
}

function renderSearchDisplay(data, parent) {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('searchDisplay');

  node.appendChild(createWrapper(
    'searchDisplay-wrapper',
    searchBar.render()
  ));

  let categoryData = [
    {
      title: 'Dairy',
      image: Dairy,
      ingredients: ['milk', 'brie', 'feta', 'cheddar', 'yogurt', 'cream']
    },
    {
      title: 'Vegetables',
      image: Vegetables,
      ingredients: ['carrot', 'celery', 'broccoli', 'tomato']
    },
    {
      title: 'Meats',
      image: Meats,
      ingredients: []
    }
  ];

  categoryData.forEach(data => node.appendChild(
    element()
      .withClass('category-wrapper')
      .withChildren(category(data))
      .render(parent)
  ));
  return node;
}

export default function searchDisplay() {
  let node;
  let _parent;

  return {
    render(data) {
      return (node = renderSearchDisplay(data, this));
    },
    rerender(nodeClass, changeSet) {
      _parent.rerender(this, changeSet);
    },
    rerenderChild(nodeClass, changeSet) {
      const id = nodeClass.getNode().id;
      let child;
      for (let i = 0; i < node.children.length; i++) {
        child = node.children[i];
        if (child.id === id) {
          node.replaceChild(
            nodeClass.withInitParameters({
              ...nodeClass.getInitParameters(),
              ...changeSet
            }).render(this), child
          );
        }
      }
    }
  }
};
