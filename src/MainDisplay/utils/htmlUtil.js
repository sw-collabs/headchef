
import Element from 'Element';

function createTextField(text) {
  return Element('span')
    .withInnerHTML(text);
}

export default {
  createTextField
}