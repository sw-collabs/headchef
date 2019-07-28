import searchDisplay from '../SearchDisplay/searchDisplay';
import navBar from '../NavBar/navBar';
import mainDisplay from '../MainDisplay/mainDisplay';
import uuidv4 from "uuid/v4";
import './css/main.css';

function createCol(config, ...children) {
  let configSchema = {
    width: config.width,
    backgroundColor: config.backgroundColor,
    height: config.height,
    display: config.display,
    float: config.float
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
  node.classList.add('main');

  node.appendChild(createCol(
    {
      width: '25%',
      backgroundColor: '#f5f5f5',
      height: '100%',
      display: 'inline-block',
      float: 'left'
    },
    searchDisplay.render()
  ));

  node.appendChild(createCol(
    {
      width: '3%',
      backgroundColor: '#353535',
      height: '100%',
      display: 'inline-block',
      float: 'left'
    },
    navBar.render()
  ));

  node.appendChild(createCol(
      {
        width: '72%',
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'inline-block',
        float: 'left'
      },
    mainDisplay.render()
  ));

  return node;
}

(function main() {
  const app = document.getElementById('app');
  app.classList.add('app');
  app.appendChild(render());
})();

