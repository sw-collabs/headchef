import uuidv4 from "uuid/v4";

export default function element(props) {
  let _children = [];
  let _classList = [];
  let _innerHTML = '';
  let _inlineCSS = {};

  const node = document.createElement(props.elementType);
  node.id = uuidv4();
  return {
    withClassList(...classList) {
      classList.forEach(c => {
        if (!_classList.find(_c => _c === c)) {
          _classList.push(c);
        }
      });
      return this;
    },
    withInnerHTML(innerHTML) {
      _innerHTML = innerHTML;
      return this;
    },
    withInlineCSS(inlineCSS) {
      _inlineCSS = inlineCSS;
      return this;
    },
    withChildren(...children) {
      children.forEach(c => _children.push(c));
      return this;
    },
    render() {
      node.innerHTML = _innerHTML;
      Object.assign(node.style, _inlineCSS);
      _classList.forEach(c => node.classList.add(c));
      _children.forEach(c => node.appendChild(c));

      return node;
    }
  }
}
