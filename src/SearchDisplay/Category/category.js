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

function render() {
  const children = [
    element()
      .withClass('category-textField-wrapper')
      .withChildren(
        element()
          .withClass('category-textField')
          .withInnerHTML(this.props.title)
      ),
    element()
      .withClass('category-iconField-wrapper')
      .withChildren(
        element()
          .withInlineCSS({
            height: '100%',
            width: '100%',
            backgroundImage: `url(${this.props.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          })
      )
  ];

  return element()
    .withClass('category-inner-wrapper')
    .withState(this.state)
    .withChildren(
      element()
        .withEventHandler('click', handleOnFocus.bind(this))
        .withClass(`category${!this.state.hideSelector ? '-clicked' : ''}`)
        .withChildren(...children),
      !this.state.hideSelector
        ? renderIngredientsSelector(this.props.ingredients)
        : null
    );
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
    .withState(_state)
    .withInitParameters(_props)
    .withCustomRender(render);
};
