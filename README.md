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
  const { isChrome } = useCheckBrowsers();

  return (
    <div>
      <p>Detected browser: {browser}</p>
      {isChrome && <span>You are using Chrome!</span>}
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
