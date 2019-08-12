import React from 'react';

import PropTypes from 'prop-types';

import './button.css';

const Button = ({ title, disabled = false, handleClick }) => {
  return (
    <button
      id="button-component"
      disabled={disabled}
      onClick={event => {
        event.preventDefault();
        handleClick(event);
      }}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

export default Button;
