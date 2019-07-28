import uuidv4 from 'uuid/v4';
import './css/recipe.css';

function createBackgroundImage(config) {
  const css = {
    width: config.width,
    height: config.height,
    objectFit: config.objectFit,
    background: config.background,
    backgroundSize: config.backgroundSize,
    backgroundPosition: config.backgroundPosition
  };
  const node = document.createElement('div');
  node.id = uuidv4();
  Object.assign(node.style, css)
  return node;
}

function createOverlayTitle(text) {
  let node = document.createElement('div');
  node.id = uuidv4();
  node.textContent = text;
  node.classList.add('recipe-title')
  return node;
}

function createGridItem() {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('grid-item');
  return node;
}

function render(recipe) {
  const gridItem = createGridItem();

  const recipeImg = createBackgroundImage({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255,0,0,0)), url(${recipe.imgSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });

  const recipeTitle = createOverlayTitle(recipe.title);
  recipeImg.appendChild(recipeTitle);

  /*
    TODO:
    1. Add title
    2. Add difficulty icon
    3. Add onHover() event listener - create overlay + animation
   */
  gridItem.appendChild(recipeImg);
  return gridItem;
}

export default {
  render
}