import htmlUtil from '../utils/htmlUtil.js';
import Element from 'Element';
import instruction from '../Instruction/instruction.js';
import './css/recipe.css';


const GREEN_HEX = '#C1EfB7';
const YELLOW_HEX = '#FFF38A';

function createRecipeBottomText(recipe) {
  const ingredientsIcon = Element('span')
                          .withInlineCSS({
                            height: '1em',
                            width: '1em',
                            backgroundColor: recipe.hasAllIngredients ? GREEN_HEX : YELLOW_HEX,
                            borderRadius: '50%',
                            display: 'inline-block'
                          });

  const recipeTitle = htmlUtil.createTextField(recipe.title);

  return Element()
    .withClass('recipe-title')
    .withChildren(ingredientsIcon,
                  recipeTitle);
}

function createRecipeHoverOverlay(recipe) {
  return Element()
    .withClass('recipe-info-overlay')
    .withChildren(createRecipeInfoText(recipe.info));
}

function createRecipeInfoText(data) {
  return Element()
    .withClass('recipe-overlay-text')
    .withChildren(
      htmlUtil.createTextField(`<b>Prep:</b> ${data.prepTime}`),
      htmlUtil.createTextField(`<b>Total:</b> ${data.totalTime}`),
      htmlUtil.createTextField(`<b>Difficulty:</b> ${data.difficulty}`),
      htmlUtil.createTextField(`<b>Cuisine:</b> ${data.cuisine}`),
      // htmlUtil.createTextField(`</br>${data.description}`)
    );
}

function handleOnClick() {
  this.setState(
    { selected: !this.getState().selected }
  );
}

function render() {
  return Element()
    .withInlineCSS( {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(255,0,0,0)), url(${this.props.imgSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    })
    .withClass('recipe-overlay')
    .withChildren(this.getState().selected ? instruction(this.props) : null,
                  // createRecipeHoverOverlay(this.props),
                  createRecipeBottomText(this.props)
    )
    // .withEventHandler('click', handleOnClick.bind(this));
}

export default function recipe(props) {
  let _state = { selected: false };

  return Element()
    .withProps(props)
    .withState(_state)
    .withCustomRender(render);



}