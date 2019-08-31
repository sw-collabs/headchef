import Element from 'Element';
import './css/ingredients.css';

const onIngredientRemove = ingredient => {
  console.log('Click remove!', ingredient);
};

function renderSelectedIngredient(ingredient) {
  return Element()
    .withClass('selected-ingredient')
    .withChildren(
      Element()
        .withClass('selected-ingredient-word')
        .withInnerHTML(ingredient),
      Element()
        .withClass('selected-ingredient-close')
        .withInnerHTML('x')
        .withEventHandler('click',  onIngredientRemove(ingredient))
    )
}

function render() {
  return Element()
    .withClass('selected-ingredients-wrapper')
    .withChildren(...this.props.selectedIngredients.map(
      ingredient => renderSelectedIngredient(ingredient)
    ));
}

export default function inputIngredients(props) {
  let _props = {
    selectedIngredients: props.selectedIngredients
  };

  return Element()
    .withProps(_props)
    .withCustomRender(render)
}