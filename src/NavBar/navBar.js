import uuidv4 from "uuid/v4";

function render() {
  const node = document.createElement('div');
  node.id = uuidv4();

  // main _css, etc here.

  // assign children to current element

  return node;
}

export default {
  render
}
