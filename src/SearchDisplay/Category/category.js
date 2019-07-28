import element from '../element';
import './_css/category.css';

function handleOnFocus(event, nodeClass) {
  this.setState({
    hideSelector: !this.getState().hideSelector
  });
}

function renderCategory(props, state) {
  const children = [
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

  return element()
    .withClass('category-inner-wrapper')
    .withChildren(
      element()
        .withEventHandler('click', handleOnFocus.bind(this))
        .withClass('category')
        .withChildren(...children),
      !state.hideSelector
        ? element()
          .withClass('category-ingredientsSelector-wrapper')
        : null
    );
}

export default function category(initParameters) {
  let node;
  let _parent;
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

  return {
    setState(changeSet) {
      _parent.rerenderChild(this, _props, changeSet);
    },
    getState() {
      return _state;
    },
    getInitParameters() {
      return _props;
    },
    withInitParameters(initParameters) {
      _props = Object.assign(_props, initParameters);
      return this;
    },
    withState(state) {
      _state = Object.assign(_state, state);
      return this;
    },
    getNode() {
      return node;
    },
    render(parent) {
      _parent = parent;
      node = renderCategory.bind(this)(_props, _state).render(this);
      return node;
    },
    rerender(nodeClass, changeSet) {
      _parent.rerender(this, changeSet);
    },
    rerenderChild(nodeClass, propsChangeSet, stateChangeSet) {
      const id = nodeClass.getNode().id;
      let child;
      for (let i = 0; i < node.children.length; i++) {
        child = node.children[i];
        if (child.id === id) {
          node.replaceChild(nodeClass.withInitParameters({
            ...nodeClass.getInitParameters(),
            ...propsChangeSet
          }).withState({
            ...nodeClass.getState(),
            ...stateChangeSet
          }).render(this), child);
        }
      }
    }
  }
};
