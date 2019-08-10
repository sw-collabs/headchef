import element from '../element.js';
import htmlUtil from '../utils/htmlUtil.js';
import uuidv4 from 'uuid/v4';
import './css/recipe.css';


const GREEN_HEX = '#C1EfB7';
const YELLOW_HEX = '#FFF38A';

function createRecipeBottomText(recipe) {
  const ingredientsIcon = element({elementType: 'span'})
                          .withInlineCSS({
                            height: '1em',
                            width: '1em',
                            backgroundColor: recipe.hasAllIngredients ? GREEN_HEX : YELLOW_HEX,
                            borderRadius: '50%',
                            display: 'inline-block'
                          }).render();

  const recipeTitle = htmlUtil.createTextField(recipe.title);

  return element({elementType: 'div'})
    .withClassList('recipe-title')
    .withChildren(ingredientsIcon,
                  recipeTitle)
    .render();
}

function createRecipeHoverOverlay(recipe) {
  return element({elementType: 'div'})
    .withClassList('recipe-info-overlay')
    .withChildren(createRecipeInfoText(recipe.info))
    .render();
}

function createRecipeInfoText(data) {
  return element({elementType: 'div'})
    .withClassList('recipe-overlay-text')
    .withChildren(
      htmlUtil.createTextField(`<b>Prep:</b> ${data.prepTime}`),
      htmlUtil.createTextField(`<b>Total:</b> ${data.totalTime}`),
      htmlUtil.createTextField(`<b>Difficulty:</b> ${data.difficulty}`),
      htmlUtil.createTextField(`<b>Cuisine:</b> ${data.cuisine}`),
      htmlUtil.createTextField(`</br>${data.description}`)
    ).render();
}

function createRecipeGridItem(recipe) {
  return element({elementType: 'div'})
    .withInlineCSS( {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255,0,0,0)), url(${recipe.imgSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    })
    .withClassList('recipe-overlay')
    .withChildren(createRecipeHoverOverlay(recipe),
                  createRecipeBottomText(recipe)
    ).render();
}

function render(recipe) {
  return element({elementType: 'div'})
    .withClassList('grid-item')
    .withChildren(createRecipeGridItem(recipe))
    .render();
}

export default {
  render
}