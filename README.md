# Trives Hooks

## Project Overview

Trives Hooks is a collection of custom React hooks designed to simplify and optimize web application development. The goal is to provide reusable and efficient solutions for managing state, effects, and complex logic in React projects.

## Technologies Used

- **React**: Main library for building user interfaces.
- **TypeScript**: Strongly typed language for robust and maintainable code.
- **Vite**: Modern bundler for fast and efficient development.
- **Jest**: Testing framework to ensure hook quality.
- **ESLint & Prettier**: Tools for code consistency and style.

## Features

- Reusable and well-documented hooks.
- Usage examples and unit tests included.
- Scalable and maintainable architecture.
- Designed for modern React projects.

## Available Hooks

### `useCheckBrowsers`

A custom React hook to detect the user's browser. It checks the `userAgent` string and returns boolean flags for Chrome, Safari, Edge, Opera, Firefox, or Other browsers, as well as the detected browser name.

**Usage Example:**

```typescript
import { useCheckBrowsers } from "./src/hooks/useCheckBrowsers";

function MyComponent() {
  const { isChrome, browser } = useCheckBrowsers();

  return (
    <div>
      <p>Detected browser: {browser}</p>
      {isChrome && <span>You are using Chrome!</span>}
    </div>
  );
}
```

---

### `useToggle`

A custom React hook to easily manage boolean state with toggle functionality. You can toggle the value or set it explicitly.

**Usage Example:**

```typescript
import { useToggle } from "./src/hooks/useToggle";

function ToggleComponent() {
  const [isActive, toggle] = useToggle();

  return (
    <div>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Set Active</button>
      <button onClick={() => toggle(false)}>Set Inactive</button>
      <p>Active: {isActive ? "Yes" : "No"}</p>
    </div>
  );
}
```

---

### `useCopy`

A custom React hook to copy text to the clipboard and track the copy state.

**Usage Example:**

```typescript
import { useCopy } from "./src/hooks/useCopy";

function CopyComponent() {
  const { copy, copied } = useCopy();

  return (
    <div>
      <button onClick={() => copy("Hello World!")}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
```

---

### `useBreakpoint`

A custom React hook to detect the current screen breakpoint. It returns boolean flags for each breakpoint and the current breakpoint name as `breakpoint`.

**Breakpoints:**

- `smartwatch`: 0 - 320 px
- `mobileSmall`: 321px - 390 px
- `mobileLarge`: 391px - 480 px
- `phablet`: 481 px - 600px
- `tabletSmall`: 601px - 768 px
- `tabletLarge`: 769px - 991 px
- `desktopSmall`: 992px – 1200 px
- `desktopMedium`: 1201px – 1440 px
- `desktopLarge`: 1441px – 1600 px
- `widescreen`: 1601px+

**Usage Example:**

```typescript
import { useBreakpoint } from "./src/hooks/useBreakpoints";

function ResponsiveComponent() {
  const {
    isSmartwatch,
    isMobileSmall,
    isMobileLarge,
    isPhablet,
    isTabletSmall,
    isTabletLarge,
    isDesktopSmall,
    isDesktopMedium,
    isDesktopLarge,
    isWidescreen,
    breakpoint,
  } = useBreakpoint();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {isMobileSmall && <span>You are on a small mobile device.</span>}
      {isTabletLarge && <span>You are on a large tablet.</span>}
      {isWidescreen && <span>Widescreen detected!</span>}
    </div>
  );
}
```

---

### `useFormValidation`

A custom React hook to easily manage and validate form fields with minimal configuration.  
**Now supports `textarea` fields** with the same validation options as text fields (required, minLength, maxLength).

#### Field Parameters

- `type`: `"email" | "password" | "repeatPassword" | "text" | "number" | "textarea"` (**required**)
- `label`: Field label for error messages (optional)
- `required`: `true` if the field is mandatory (optional)
- `minLength`: Minimum length for the field value (optional)
- `maxLength`: Maximum length for the field value (optional)
- `minSpecialChars`: Minimum number of special characters (only for password) (optional)
- `minUppercase`: Minimum number of uppercase letters (only for password) (optional)
- `minNumbers`: Minimum number of digits (only for password) (optional)
- `matchField`: Name of the field to match (only for repeatPassword) (optional)

#### Returned values

- `values`: Object with the current values of the form fields.
- `errors`: Object with the current validation errors for each field.
- `handleChange`: Function to use as `onChange` in your inputs and textareas.
- `validateAll`: Function to validate all fields at once (returns `true` if valid).
- `reset`: Function to reset the form to its initial state.
- `setValues`, `setErrors`: Functions to manually set values or errors if needed.

#### Usage Example

```typescript
import { useFormValidation } from "./src/hooks/useFormValidation";

export default function ExampleForm() {
  const formConfig = {
    email: {
      type: "email",
      label: "Email",
      required: true,
    },
    password: {
      type: "password",
      label: "Password",
      required: true,
      minLength: 8,
      minSpecialChars: 1,
      minUppercase: 1,
      minNumbers: 2,
    },
    repeatPassword: {
      type: "repeatPassword",
      label: "Repeat Password",
      required: true,
      matchField: "password",
    },
    username: {
      type: "text",
      label: "Username",
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    age: {
      type: "number",
      label: "Age",
      required: true,
      minLength: 1,
      maxLength: 3,
    },
    bio: {
      type: "textarea",
      label: "Bio",
      required: true,
      minLength: 10,
      maxLength: 200,
    },
  };

  const { values, errors, handleChange, validateAll, reset } = useFormValidation(formConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      alert("Form is valid!");
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>Repeat Password:</label>
        <input
          name="repeatPassword"
          type="password"
          value={values.repeatPassword}
          onChange={handleChange}
        />
        {errors.repeatPassword && <span>{errors.repeatPassword}</span>}
      </div>
      <div>
        <label>Username:</label>
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Age:</label>
        <input
          name="age"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age && <span>{errors.age}</span>}
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={values.bio}
          onChange={handleChange}
        />
        {errors.bio && <span>{errors.bio}</span>}
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}
```

**You can use only the fields you need! For example, just an email and a textarea:**

```typescript
const formConfig = {
  email: {
    type: "email",
    label: "Email",
    required: true,
  },
  bio: {
    type: "textarea",
    label: "Bio",
    required: true,
    minLength: 10,
    maxLength: 200,
  },
};
const { values, errors, handleChange, validateAll } = useFormValidation(formConfig);
```

## Getting Started

Open your terminal and run the following commands to clone the repository:

```bash
git clone https://github.com/pelayotrives/trives-hooks.git
cd trives-hooks
```

Install dependencies:

```bash
npm install
```

You are now ready to explore and use the hooks in your React projects!
