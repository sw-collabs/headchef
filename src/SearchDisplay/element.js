import uuidv4 from "uuid/v4";

export default function element(props) {
  let _props = props || {};
  let _state = {};
  let _children = [];
  let _classname = [];
  let _innerHTML = '';
  let _inlineCss = {};
  let _parent;

  /* The element itself */
  const node = document.createElement('div');
  node.id = uuidv4();

  return {
    setState(changeSet) {
      _parent.rerenderChild(this, _props, changeSet);
    },
    getState() {
      return _state;
    },
    withState(state) {
      _state = Object.assign(_state, state);
      return this;
    },
    getInitParameters() {
      return _props;
    },
    withInitParameters(props) {
      _props = Object.assign(_props, props);
      return this;
    },
    getNode() {
      return node;
    },
    withClass(...classname) {
      classname.forEach(c => {
        if (!_classname.find(_c => _c === c)) {
          _classname.push(c);
        }
      });
      return this;
    },
    withChildren(...children) {
      // check if any children are undefined (e.g. hidden)
      children = children.filter(c => !!c);

      children.forEach(childClass => {
        const childNode = childClass.render(this);
        if (!!childNode) {
          if (!_children.find(_c => _c.id === childNode.id)) {
            _children.push(childNode);
          }
        }
      });
      return this;
    },
    withInnerHTML(innerHTML) {
      _innerHTML = innerHTML;
      return this;
    },
    withEventHandler(name, handler) {
      node.addEventListener(name, (event) => {
        handler(event, this);
      });
      return this;
    },
    withInlineCSS(config) {
      const cssSchema = {
        /* Position */
        position: config.position,
        display: config.display,
        top: config.top,
        width: config.width,
        height: config.height,

        /* Width */
        margin: config.margin,
        padding: config.padding,
        boxSizing: config.boxSizing,

        /* Font */
        fontSize: config.fontSize,
        color: config.color,

        /* Background */
        backgroundColor: config.backgroundColor,
        backgroundImage: config.backgroundImage,
        backgroundSize: config.backgroundSize,
        backgroundRepeat: config.backgroundRepeat,
        backgroundPosition: config.backgroundPosition,

        /* Border */
        borderRadius: config.borderRadius,
        border: config.border,
        outline: config.outline
      };
      _inlineCss = Object.assign(_inlineCss, cssSchema);
      return this;
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
    },
    render(parent) {
      _parent = parent;

      node.innerHTML = _innerHTML || '';
      Object.assign(node.style, _inlineCss);
      _classname.forEach(c => node.classList.add(c));
      _children.forEach(c => node.appendChild(c));
      return node;
    }
  }
}
