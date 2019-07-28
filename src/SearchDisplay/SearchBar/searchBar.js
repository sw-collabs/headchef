import uuidv4 from "uuid/v4";
import './css/searchBar.css';

function createInput({ onFocus, ...config }) {
  const configSchema = {
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

    /* Border */
    borderRadius: config.borderRadius,
    border: config.border,
    outline: config.outline
  };

  const onFocusSchema = {
    /* Position */
    position: onFocus.position,
    display: onFocus.display,
    top: onFocus.top,
    width: onFocus.width,
    height: onFocus.height,

    /* Width */
    margin: onFocus.margin,
    padding: onFocus.padding,
    boxSizing: onFocus.boxSizing,

    /* Font */
    fontSize: onFocus.fontSize,
    color: onFocus.color,

    /* Background */
    backgroundColor: onFocus.backgroundColor,

    /* Border */
    borderRadius: onFocus.borderRadius,
    border: onFocus.border,
    outline: onFocus.outline
  };

  const node = document.createElement('input');
  node.id = uuidv4();
  Object.assign(node.style, configSchema);

  node.addEventListener('focusin', () => {
    const style = { };
    Object.keys(onFocusSchema).forEach(
      s => style[s] = node.style[s]
    );
    Object.assign(node.style, onFocusSchema);

    node.addEventListener('focusout', () => {
      Object.assign(node.style, style);
    });
  });

  return node;
}

function render() {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('searchBar');

  // main css, etc here.

  node.appendChild(createInput({
    width: '100%',
    height: '100%',
    padding: '20px 20px',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '25px',
    boxSizing: 'border-box',
    fontSize: '17px',
    color: 'grey',
    onFocus: {
      border: '1px solid #5b95cf',
      outline: 'none',
    }
  }));

  return node;
}

export default {
  render
}
