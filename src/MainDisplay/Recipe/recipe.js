import uuidv4 from 'uuid/v4';
import './css/recipe.css';


const GREEN_HEX = '#C1EfB7';
const YELLOW_HEX = '#FFF38A';

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

function createTextField(title) {
  const node = document.createElement('span');
  node.id = uuidv4();
  node.innerHTML = title;
  return node;
}

function createRecipeInfoText(data) {
  const textContainer = createContainer('recipe-overlay-text');

  textContainer.appendChild(createTextField(`<b>Prep:</b> ${data.prepTime}`));
  textContainer.appendChild(createTextField(`<b>Total:</b> ${data.totalTime}`));
  textContainer.appendChild(createTextField(`<b>Difficulty:</b> ${data.difficulty}`));
  textContainer.appendChild(createTextField(`<b>Cuisine:</b> ${data.cuisine}`));
  textContainer.appendChild(createTextField(`${data.description}`));

  return textContainer;
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
    color: recipe.hasAllIngredients ? GREEN_HEX : YELLOW_HEX,
    radius: '50%',
    display: 'inline-block'
  });
  const recipeTitle = createTextField(recipe.title);
  const bottomText = createContainer('recipe-title', ingredientsIcon, recipeTitle);

  // Display on hover
  const recipeInfoText = createRecipeInfoText(recipe.info);
  const recipeInfoOverlay = createContainer('recipe-info-overlay', recipeInfoText);

  const recipeContainer = createContainer('recipe-overlay', recipeInfoOverlay, bottomText);
  background.appendChild(recipeContainer);
  return background;
}

function toggleElementDisplay(id) {
  const node = document.getElementById(id);
  node.style.display = node.style.display !== 'hidden'? 'inline-block' : 'hidden';
}

function render(recipe) {
  return createContainer('grid-item', createRecipeBackground(recipe));
}

export default {
  render
}