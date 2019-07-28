import uuidv4 from 'uuid/v4';
import './css/recipe.css';


function createContainer(className, ...children) {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add(className);

  children.forEach(
    child => node.appendChild(child)
  );
  return node;
}

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

function createDotIcon(config) {
  const css = {
    height: config.height,
    width: config.width,
    backgroundColor: config.color,
    borderRadius: config.radius,
    display: config.display
  }
  const node = document.createElement('span');
  node.id = uuidv4();

  Object.assign(node.style, css);
  return node;
}

function createOverlayTitle(title) {
  const node = document.createElement('span');
  node.id = uuidv4();
  node.textContent = title;
  return node;
}

function createRecipeBackground(recipe) {
  // Recipe image
  const background = createBackgroundImage({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255,0,0,0)), url(${recipe.imgSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });


  // Add text to the bottom of the grid item
  const ingredientsIcon = createDotIcon({
    height: '1em',
    width: '1em',
    color: recipe.hasAllIngredients ? '#C1EfB7' : '#FFF38A',
    radius: '50%',
    display: 'inline-block'
  });
  const recipeTitle = createOverlayTitle(recipe.title);
  const bottomText = createContainer('recipe-title', ingredientsIcon, recipeTitle);

  const recipeOverlay = createContainer('recipe-overlay', bottomText);
  background.appendChild(recipeOverlay);

  return background;
}

function render(recipe) {
  /*
  TODO:
  2. Add difficulty icon
  3. Add onHover() event listener - create overlay + animation
 */


  const recipeImgBg = createRecipeBackground(recipe);
  const gridItem = createContainer('grid-item', recipeImgBg);
  return gridItem;
}

export default {
  render
}