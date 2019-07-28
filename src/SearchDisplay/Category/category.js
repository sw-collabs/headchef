import uuidv4 from "uuid/v4";
import './_css/category.css';

function createWrapper(className, props, ...children) {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.innerHTML = props.innerHTML || '';
  node.classList.add(className);

  children.forEach(
    child => node.appendChild(child)
  );
  return node;
}

function render(data) {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('category');

  // main _css, etc here.
  const textField = createWrapper(
    'category-textField-wrapper', {},
    createWrapper('category-textField', { innerHTML: data.title })
  );
  const iconField = createWrapper('category-iconField', {});

  // assign children to current element
  node.appendChild(textField);
  node.appendChild(iconField);

  return node;
}

export default {
  render
}
