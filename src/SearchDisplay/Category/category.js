import uuidv4 from "uuid/v4";
import './_css/category.css';

function createElemWrapper(classname, ...children) {
  let _children = [...children];
  let _classname = !!classname ? [classname] : [];
  let _innerHTML = '';
  let _inlineCss = {};
  let _hide = false;

  /* The element itself */
  const node = document.createElement('div');
  node.id = uuidv4();

  return {
    setIsHidden(hide) {
      _hide = hide;
      return this;
    },
    getIsHidden() {
      return _hide;
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

      children.forEach(child => {
        if (!_children.find(_c => _c.id === child.id)) {
          _children.push(child);
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
        console.log('event!', {name, event});
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
    render() {
      if (_hide) { return; }

      node.innerHTML = _innerHTML || '';
      Object.assign(node.style, _inlineCss);
      _classname.forEach(c => node.classList.add(c));
      _children.forEach(c => node.appendChild(c));
      return node;
    }
  }
}

function handleOnFocus(event, nodeClass) {
  console.log('hi there we in!');

}

function render(data) {
  const textField = createElemWrapper()
    .withClass('category-textField-wrapper')
    .withEventHandler('click', handleOnFocus)
    .withChildren(createElemWrapper()
      .withClass('category-textField')
      .withInnerHTML(data.title)
      .render()
    )
    .render();

  const iconField = createElemWrapper()
    .withClass('category-iconField-wrapper')
    .withChildren(createElemWrapper()
      .withInlineCSS({
        height: '100%',
        width: '100%',
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      })
      .render()
    )
    .render();

  return createElemWrapper()
    .withClass('category-inner-wrapper')
    .withChildren(
      createElemWrapper()
        .withClass('category')
        .withChildren(textField, iconField)
        .render(),
      createElemWrapper()
        .setIsHidden(true)
        .withClass('category-ingredientsSelector-wrapper')
        .render()
    )
    .render()
}

export default {
  render
}
