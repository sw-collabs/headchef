import uuidv4 from "uuid/v4";
import './_css/searchBar.css';

function createInput() {
    const node = document.createElement('input');
  node.id = uuidv4();
  node.classList.add('searchBar-input');

  return node;
}

function render() {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('searchBar');

  node.appendChild(createInput());
  return node;
}

export default {
  render
}
