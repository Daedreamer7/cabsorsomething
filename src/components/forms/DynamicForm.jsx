import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faCheckCircle,
  faCalendar,
  faUpload
} from '@fortawesome/free-solid-svg-icons';

const FormField = ({ field, value, onChange, error }) => {
  const {
    type,
    name,
    label,
    placeholder,
    required,
    options,
    validation,
    helpText
  } = field;

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            type={type}
            name={name}
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={placeholder}
            required={required}
          />
        );

      case 'textarea':
        return (
          <textarea
            name={name}
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={placeholder}
            required={required}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required={required}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(name, e.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={name}
              checked={value || false}
              onChange={(e) => onChange(name, e.target.checked)}
              className="text-blue-500 focus:ring-blue-500 rounded"
            />
            <span>{label}</span>
          </label>
        );

      case 'date':
        return (
          <div className="relative">
            <input
              type="date"
              name={name}
              value={value || ''}
              onChange={(e) => onChange(name, e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required={required}
            />
            <FontAwesomeIcon
              icon={faCalendar}
              className="absolute right-3 top-3 text-gray-400"
            />
          </div>
        );

      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              name={name}
              onChange={(e) => onChange(name, e.target.files[0])}
              className="hidden"
              id={`file-${name}`}
              required={required}
            />
            <label
              htmlFor={`file-${name}`}
              className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                error ? 'border-red-500' : 'border-gray-300'
              } cursor-pointer hover:bg-gray-50`}
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              {value ? value.name : 'Choose a file'}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {type !== 'checkbox' && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const DynamicForm = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  initialValues = {}
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const value = values[field.name];
      if (field.required && !value) {
        newErrors[field.name] = 'This field is required';
      } else if (field.validation) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(values);
      setSubmitSuccess(true);
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error.message || 'An error occurred while submitting the form'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-500 flex items-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-500 flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Form submitted successfully!
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors`}
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
};

export default DynamicForm;
