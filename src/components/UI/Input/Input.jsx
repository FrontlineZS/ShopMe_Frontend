import React, { Component } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(this.props.name, value);
    }
    this.setState({ errorMessage: '' });
  }

  checkValidity() {
    const { value } = this.state;
    const { validation, required, t } = this.props;
    const errorMessage = validation(required, value);

    if (errorMessage) {
      this.setState({ errorMessage: t(errorMessage) });
      return false;
    }

    this.setState({ errorMessage: '' });
    return true;
  }

  resetInput() {
    this.setState({ value: '' });
  }

  render() {
    const disabled = this.props.disabled ? 'disabled' : '';
    return (
      <label
        className={`input__wrapper input__wrapper--${this.props.display}`}
        htmlFor={this.props.name}
      >
        <span className={`input__label input__label--${this.props.size} input__label--${this.props.display} input__label--${disabled}`}>
          {this.props.label}{this.props.required ? ' *' : ''}
        </span>
        <input
          className={`input  input--${this.props.size} input--${this.props.color}`}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          value={this.state.value}
          onChange={this.handleChange}
          required={this.props.required}
          disabled={this.props.disabled}
        />
        <div className={`input__error-message input__error-message--${this.props.display}`}>
          {this.state.errorMessage}
        </div>
      </label>
    );
  }
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  maxLength: 524288,
  size: 'M',
  color: 'yellow',
  display: 'inline',
  required: false,
  disabled: false,
  validation() { return undefined; },
  onChange() {},
  value: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  size: PropTypes.string,
  color: PropTypes.string,
  display: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validation: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export { Input };
export default translate('translations', { withRef: true })(Input);