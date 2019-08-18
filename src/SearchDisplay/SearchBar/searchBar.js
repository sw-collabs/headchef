import './css/searchBar.css';
import Element from 'Element';

export default function searchBar() {
  return Element()
    .withClass('searchBar')
    .withChildren(
      Element()
        .withClass('searchBar-input')
    );
}
