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
    /**
     * Tells this element's parent to re-render it. In the case that
     * the changeSet deepEquals the current state, no re-render will
     * happen.
     *
     * @param changeSet - A subset of the state that is to be updated
     */
    setState(changeSet) {
      let isRerender = false;
      Object.keys(changeSet).forEach(key => {
        if (!_state.hasOwnProperty(key)) {
          throw new Error(`setState key: ${key} is not defined`);
        }
        if (JSON.stringify(_state[key]) !== JSON.stringify(changeSet[key])) {
          isRerender = true;
        }
      });

      if (isRerender) {
        _parent.rerenderChild(this, _props, changeSet);
      }
    },
    getState() {
      return _state;
    },
    withState(state) {
      _state = Object.assign(_state, state);
      return this;
    },
    getProps() {
      return _props;
    },
    withProps(props) {
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
    /**
     * Custom Render function - if set, 'render' will be called
     * instead of execution of the default render mechanism.
     * 'render' MUST return an element object - not DOM.Node.
     *
     * @param render
     */
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
          node.replaceChild(nodeClass.withProps({
            ...nodeClass.getProps(),
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
         * Custom Render:
         * (1) Calls custom '_render' function set by 'withCustomRender'
         *      - Set context ('this') so the render function has access
         *        to props, state, and other functions (e.g. 'setState')
         * (2) '_render' will return an 'element' object
         * (3) Call 'render()' from the returned element object to obtain
         *     the DOM.Node object and replace the default 'node' that was
         *     created upon element creation with the returned 'node'
         * (4) Return the DOM.Node object
         */
        const context = {props: _props, state: _state, ...this};
        const _node = _render.bind(context)().render(_parent);
        return (node = _node);
      }

      /**
       * Default Render:
       * (1) Set innerHTML of the 'node'
       * (2) Set inline CSS of the 'node'
       * (3) Set classList for the 'node'
       * (4) Append any children to the 'node'
       */
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
