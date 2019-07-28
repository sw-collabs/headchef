import uuidv4 from "uuid/v4";
import searchBar from './SearchBar/searchBar';
import './css/searchDisplay.css';

function createWrapper(config, ...children) {
  let configSchema = {
    width: config.width,
    height: config.height,
    margin: config.margin,
    padding: config.padding,
    backgroundColor: config.backgroundColor,
    display: config.display
  };

  const node = document.createElement('div');
  node.id = uuidv4();
  Object.assign(node.style, configSchema);

  children.forEach(
    child => node.appendChild(child)
  );
  return node;
}

function render() {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('searchDisplay');

  // assign children to current element
  node.appendChild(createWrapper(
    {
      width: '100%',
      height: '8%',
      margin: '10% 0 0 0',
      display: 'block'
    },
    searchBar.render())
  );

  return node;
}

export default {
  render
}
