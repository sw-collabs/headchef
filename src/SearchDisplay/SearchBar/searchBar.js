import './css/searchBar.css';
import Element from 'Element';

function handleOnFocus() {
  console.log('Focus in');
  this.setState({ isFocused: true });
  this.props.onInputEnter();
}

function handleOnBlur() {
  console.log('Focus out');
  this.setState({ isFocused: true });
  this.props.onInputExit();
}

function render() {
  return Element()
    .withClass('searchBar')
    .withChildren(
      Element('input')
        .withClass(`searchBar-input${this.state.isFocused ? '-focused' : ''}`)
        .withEventHandler('focus', handleOnFocus.bind(this))
        .withEventHandler('blur', handleOnBlur.bind(this))
    );
}

export default function searchBar(props) {
  let _props = {
    onInputEnter: props.onInputEnter,
    onInputExit: props.onInputExit
  };

  let _state = {
    isFocused: true
  };

  return Element()
    .withProps(_props)
    .withState(_state)
    .withCustomRender(render);
}
