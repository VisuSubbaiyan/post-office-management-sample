import React, {Component} from 'react';
import PropTypes from 'prop-types';
/**
`TextInput` component represent text-input
*/
class TextInput extends Component {
  /**
   @property {Object} props - Incoming react property
   @property {string | number} props.value - text-input value
   @property {string} props.placeholder - placeholder text
   @property {function} props.onChange - Event handler for change event
   @constructor
   @returns {React.Element} - React component responsible for rendering inputbox
  */
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	  placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    }
  }

  onChange = (event) => {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  render() {
    const {value} = this.state;
    return <input className="form-control" value={value} onChange={this.onChange} placeholder={this.props.placeholder} />;
  }
}

export default TextInput;
