import './css/searchBar.css';
import Element from 'Element';


function render() {
  return Element()
    .withClass('searchBar')
    .withChildren(
      Element('input')
        .withEventHandler('focus', () => {
          console.log('focus in');
          this.props.onInputEnter();
        })
        .withEventHandler('blur', () => {
          console.log('focus out');
          this.props.onInputExit();
        })
        .withClass('searchBar-input')
    );
}

export default function searchBar(props) {
  let _props = {
    onInputEnter: props.onInputEnter,
    onInputExit: props.onInputExit
  };

  return Element()
    .withProps(_props)
    .withCustomRender(render);
}
