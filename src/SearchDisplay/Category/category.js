import element from '../element';
import './_css/category.css';

function handleOnFocus(event, nodeClass) {
  this.setState({
    hideSelector: !this.getState().hideSelector
  });
}

function renderIngredientsSelector(ingredients) {
  return element()
    .withClass('category-ingredientsSelector-wrapper')
    .withChildren(
      element()
        .withClass('category-ingredients-wrapper')
        .withChildren(...ingredients.map(ingredient =>
          element()
            .withClass('category-ingredient-container')
            .withInnerHTML(ingredient)
        ))
    );
}

function renderCategory(props, state) {
  return [
    element()
      .withClass('category-textField-wrapper')
      .withChildren(
        element()
          .withClass('category-textField')
          .withInnerHTML(props.title)
      ),
    element()
      .withClass('category-iconField-wrapper')
      .withChildren(
        element()
          .withInlineCSS({
            height: '100%',
            width: '100%',
            backgroundImage: `url(${props.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          })
      )
  ];
}

export default function category(initParameters) {
  let _props = Object.assign({
      title: '',
      image: '',
      ingredients: []
    },
    initParameters
  );
  let _state = {
    hideSelector: true
  };

  return element()
    .withClass('category-inner-wrapper')
    .withState(_state)
    .withChildren(
      element()
        .withEventHandler('click', handleOnFocus.bind(this))
        .withClass(`category${!_state.hideSelector ? '-clicked' : ''}`)
        .withChildren(...renderCategory(_props)),
      !_state.hideSelector
        ? renderIngredientsSelector(_props.ingredients)
        : null
    );
};
