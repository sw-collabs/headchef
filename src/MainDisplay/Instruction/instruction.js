import htmlUtil from '../utils/htmlUtil.js';
import Element from 'Element';
import './css/instruction.css';


function render() {
  if (this.selected) {

  }
}

export default function(props) {
  let state = {
    selected: false
  };

  return Element()
    .withClass('instruction')
    .withProps(props)
    .withState(state)
}