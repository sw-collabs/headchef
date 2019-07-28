import uuidv4 from "uuid/v4";
import searchBar from './SearchBar/searchBar';
import category from './Category/category';
import Dairy from './Category/_resources/dairy.svg';
import Vegetables from './Category/_resources/harvest.svg';
import Meats from './Category/_resources/shawarma.svg';

import './_css/searchDisplay.css';

function createWrapper(className, ...children) {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add(className);

  children.forEach(child => node.appendChild(child));
  return node;
}

function render() {
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
    createWrapper(
      'category-wrapper',
      category.render(data))
  ));

  return node;
}

export default {
  render
}
