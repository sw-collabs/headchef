import element from '../element';
import './css/searchBar.css';

export default function searchBar() {
  return element()
    .withClass('searchBar')
    .withChildren(
      element()
        .withClass('searchBar-input')
    );
}
