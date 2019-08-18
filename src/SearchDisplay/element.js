import uuidv4 from "uuid/v4";

export default function element(props) {
  let _props = props || {};
  let _state = {};
  let _children = [];
  let _classname = [];
  let _innerHTML = '';
  let _inlineCss = {};
  let _parent;
  let _render;

  /* The element itself */
  let node = document.createElement('div');
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
    withCustomRender(render) {
      if (typeof render === 'function') {
        _render = render;
      }
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
      if (_render) {
        /**
         * TODO: fix this ugly piece of code.
         * This is part of the custom rendering API:
         * (1) Calls withCustomRender to set custom render function
         * (2) Calls that here instead of regular render function
         *      - Set it's 'this' as the props, state, and pass the rest of
         *        available functions in Element.
         */
        const context = {props: _props, state: _state, ...this};
        const _node = _render.bind(context)().render(_parent);
        return (node = _node);
      }

      node.innerHTML = _innerHTML || '';
      Object.assign(node.style, _inlineCss);
      _classname.forEach(c => node.classList.add(c));
      _children.forEach(c => {
        node.appendChild(c)
      });
      return node;
    }
  }
}
