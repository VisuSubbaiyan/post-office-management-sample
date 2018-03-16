import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
  `Button` component represents simple button
  @param {Object} props - Incoming react property
  @param {string} props.className - additional classes for button
  @param {function} props.onClick - Event handler for click event
  @param {string} props.text - Text has to be rendered
  @constructor
  @returns {React.Element} - React component responsible for rendering simple button  
*/
const Button = ({className, onClick, text}) => {
  const buttonClassName = `btn ${className}`;
  
  return (
	<button className={buttonClassName} onClick={onClick} >
	  {text}
	</button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
