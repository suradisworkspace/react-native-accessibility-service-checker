# react-native-accessibility-service-checker

check enabled accessibility service for react-native

work on android only

## Installation

npm

```sh
npm install react-native-accessibility-service-checker
```

yarn

```sh
yarn add react-native-accessibility-service-checker
```

## Usage

### Import Library

```ts
import AccessibilityManager from 'react-native-accessibility-service-checker';
```

### Method

---

#### `getEnabledServices(feedbackType?: FEEDBACK_TYPE): AccessibilityServiceType[]`

**Description:**

Get enabled accessibility service

**Example:**

```tsx
...
const enabledList = AccessibilityManager.getEnabledServices()
...
```

---

#### `getInstalledService(): AccessibilityServiceType[]`

**Description:**
Get install accessibility service

**Example:**

```tsx
...
const installedList = AccessibilityManager.getInstalledService()
...
```

---

#### `addListener(callback: (result:Boolean) => void): EmitterSubscription`

**Description:**
Get callback when accessibility change which accessibility service enable or not

**Example:**

```tsx
...
useEffect(() => {
  const listener = AccessibilityManager.addListener((result) =>
    console.log(result)
  );
  return () => {
    listener.remove();
  };
}, []);
...
```

---

### Types

#### AccessibilityServiceType

```ts
type AccessibilityServiceType = {
  id: string;
  eventTypes: string;
  capabilities: string;
  description: null | string;
  flag: null | string;
};
```

---

#### FEEDBACK_TYPE

```ts
enum FEEDBACK_TYPE {
  FEEDBACK_ALL_MASK = -1,
  FEEDBACK_AUDIBLE = 4,
  FEEDBACK_BRAILLE = 32,
  FEEDBACK_GENERIC = 16,
  FEEDBACK_HAPTIC = 2,
  FEEDBACK_SPOKEN = 1,
  FEEDBACK_VISUAL = 8,
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
