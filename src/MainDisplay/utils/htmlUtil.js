import element from '../element';


function createTextField(text) {
  return element({elementType: 'span'})
    .withInnerHTML(text)
    .render();
}

export default {
  createTextField
}