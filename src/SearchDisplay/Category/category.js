import './css/category.css';
import Element from 'Element';

function handleOnFocus(event) {
  this.setState({
    hideSelector: !this.getState().hideSelector
  });
}

function renderIngredientsSelector(ingredients) {
  return Element()
    .withClass('category-ingredientsSelector-wrapper')
    .withChildren(
      Element()
        .withClass('category-ingredients-wrapper')
        .withChildren(...ingredients.map(ingredient =>
          Element()
            .withClass('category-ingredient-container')
            .withInnerHTML(ingredient)
        ))
    );
}

function render() {
  const children = [
    Element()
      .withClass('category-textField-wrapper')
      .withChildren(
        Element()
          .withClass('category-textField')
          .withInnerHTML(this.props.title)
      ),
    Element()
      .withClass('category-iconField-wrapper')
      .withChildren(
        Element()
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

  return Element()
    .withClass('category-inner-wrapper')
    .withState(this.state)
    .withChildren(
      Element()
        .withEventHandler('click', handleOnFocus.bind(this))
        .withClass(`category${!this.state.hideSelector ? '-clicked' : ''}`)
        .withChildren(...children),
      !this.state.hideSelector
        ? renderIngredientsSelector(this.props.ingredients)
        : null
    );
}

export default function category(props) {
  let _props = {
      title: props.title || '',
      image: props.image || null,
      ingredients: props.ingredients || []
  };
  let _state = {
    hideSelector: true
  };

  return Element()
    .withState(_state)
    .withProps(_props)
    .withCustomRender(render);
};
