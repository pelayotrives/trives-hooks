import { useState } from "react";

type FieldType =
  | "email"
  | "password"
  | "repeatPassword"
  | "text"
  | "number"
  | "textarea";

type FieldConfig = {
  type: FieldType;
  label?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minSpecialChars?: number;
  minUppercase?: number;
  minNumbers?: number;
  matchField?: string; // For repeatPassword
};

type FormConfig = {
  [field: string]: FieldConfig;
};

type FormValues = Record<string, string>;
type FormErrors = Record<string, string | null>;

export function useFormValidation(config: FormConfig) {
  const initialValues: FormValues = {};
  Object.keys(config).forEach((key) => (initialValues[key] = ""));

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  // Regex helpers
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const specialCharRegex = /[^a-zA-Z0-9]/g;
  const uppercaseRegex = /[A-Z]/g;
  const numberRegex = /[0-9]/g;

  /**
   * Validates a single form field based on its configuration and value.
   *
   * @param name - The name of the field to validate.
   * @param value - The current value of the field.
   * @returns A string describing the validation error, or `null` if the field is valid.
   *
   * The validation rules applied depend on the field's configuration:
   * - Checks if the field is required.
   * - For email fields, validates format and allowed characters.
   * - For password fields, validates minimum length, special characters, uppercase letters, and numbers.
   * - For repeat password fields, checks if the value matches the referenced password field.
   * - For text fields, ensures the value is not only numbers and checks length constraints.
   * - For textarea fields, checks length constraints.
   * - For number fields, ensures only digits are present and checks length constraints.
   */
  const validateField = (name: string, value: string): string | null => {
    const field = config[name];
    if (!field) return null;

    // Required
    if (field.required && !value) return `${field.label || name} is required.`;

    // Email
    if (field.type === "email" && value) {
      if (!emailRegex.test(value)) return "Invalid email format.";
      if (/[^a-zA-Z0-9@._\-+]/.test(value))
        return "Email contains invalid characters.";
    }

    // Password
    if (field.type === "password" && value) {
      if (field.minLength && value.length < field.minLength)
        return `Password must be at least ${field.minLength} characters.`;
      if (
        field.minSpecialChars &&
        (value.match(specialCharRegex)?.length || 0) < field.minSpecialChars
      )
        return `Password must contain at least ${field.minSpecialChars} special character(s).`;
      if (
        field.minUppercase &&
        (value.match(uppercaseRegex)?.length || 0) < field.minUppercase
      )
        return `Password must contain at least ${field.minUppercase} uppercase letter(s).`;
      if (
        field.minNumbers &&
        (value.match(numberRegex)?.length || 0) < field.minNumbers
      )
        return `Password must contain at least ${field.minNumbers} number(s).`;
    }

    // Repeat Password
    if (field.type === "repeatPassword" && value) {
      const matchValue = values[field.matchField || "password"];
      if (value !== matchValue) return "Passwords do not match.";
    }

    // Text
    if (field.type === "text" && value) {
      if (/^\d+$/.test(value)) return "Text cannot be only numbers.";
      if (field.minLength && value.length < field.minLength)
        return `Text must be at least ${field.minLength} characters.`;
      if (field.maxLength && value.length > field.maxLength)
        return `Text must be at most ${field.maxLength} characters.`;
    }

    // Textarea
    if (field.type === "textarea" && value) {
      if (field.minLength && value.length < field.minLength)
        return `Textarea must be at least ${field.minLength} characters.`;
      if (field.maxLength && value.length > field.maxLength)
        return `Textarea must be at most ${field.maxLength} characters.`;
    }

    // Number
    if (field.type === "number" && value) {
      if (/[^\d]/.test(value)) return "Only numbers are allowed.";
      if (field.minLength && value.length < field.minLength)
        return `Number must be at least ${field.minLength} digits.`;
      if (field.maxLength && value.length > field.maxLength)
        return `Number must be at most ${field.maxLength} digits.`;
    }

    return null;
  };

  /**
   * Handles input changes for form fields, updating both the form values and validation errors state.
   *
   * @param e - The change event from an input or textarea element.
   *
   * Updates the corresponding field in the form values state with the new value,
   * and sets the validation error for that field by calling `validateField`.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  /**
   * Validates all form fields based on the provided configuration.
   *
   * Iterates through each field defined in the `config` object, validates its value using `validateField`,
   * and collects any validation errors. Updates the form's error state with the new errors.
   *
   * @returns {boolean} Returns `true` if all fields are valid (i.e., no errors), otherwise returns `false`.
   */
  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let valid = true;
    Object.keys(config).forEach((name) => {
      const error = validateField(name, values[name]);
      newErrors[name] = error;
      if (error) valid = false;
    });
    setErrors(newErrors);
    return valid;
  };

  /**
   * Resets the form state to its initial values and clears all validation errors.
   *
   * @remarks
   * This function sets the form values back to the provided `initialValues`
   * and empties the errors object, effectively resetting the form to its
   * pristine state.
   *
   * @example
   * reset();
   */
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateAll,
    reset,
    setValues,
    setErrors,
  };
}
