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
