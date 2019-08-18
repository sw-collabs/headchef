import searchBar from './SearchBar/searchBar';
import category from './Category/category';
import Element from 'Element';
import Dairy from './Category/resources/dairy.svg';
import Vegetables from './Category/resources/harvest.svg';
import Meats from './Category/resources/shawarma.svg';

import './css/searchDisplay.css';

function renderSearchDisplay() {
  let categoryData = [
    {
      title: 'Dairy',
      image: Dairy,
      ingredients: ['milk', 'brie', 'feta', 'cheddar', 'yogurt', 'cream', 'butter', 'cream', 'casein', 'butterfat', 'custard', 'cheese', 'phosphate']
    },
    {
      title: 'Vegetables',
      image: Vegetables,
      ingredients: ['carrot', 'celery', 'broccoli', 'tomato']
    },
    {
      title: 'Meats',
      image: Meats,
      ingredients: ['bacon', 'ham', 'hog dog', 'jamon', 'prosciutto', 'salami', 'sausage', 'beef', 'lamb', 'mutton', 'chicken', 'turkey', 'venison', 'duck', 'wild boar', 'bison', 'goose']
    }
  ];

  return [
    Element()
      .withClass('searchDisplay-wrapper')
      .withChildren(searchBar()),
    ...categoryData.map(data => Element()
        .withClass('category-wrapper')
        .withChildren(category(data))
    )
  ];
}

export default function searchDisplay() {
  return Element()
    .withClass('searchDisplay')
    .withChildren(...renderSearchDisplay());
};
