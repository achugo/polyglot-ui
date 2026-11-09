# agnostic-ds-framework

`agnostic-ds-framework` is a framework-agnostic design system foundation for Node.js/npm frontend projects.

The project is built so that the same design system can be consumed in React, Vue, Angular, Svelte, Astro, and vanilla web apps by using standards-based Web Components and shared design tokens.

## What this project does

- Defines **design tokens** as the single source of truth (colors, spacing, radius, typography, shadows).
- Exposes token outputs in TypeScript utilities and CSS custom property format.
- Implements **Web Components** with Lit for broad framework compatibility.
- Provides foundational setup utilities for:
  - registering components
  - injecting default theme tokens into the DOM

## Current implementation status

This repository currently includes:

- ✅ Monorepo workspace structure using npm workspaces
- ✅ Shared TypeScript configuration
- ✅ `@agnostic-ds/tokens` package
- ✅ `@agnostic-ds/core` package
- ✅ Components:
  - `ds-button`
  - `ds-card`
  - `ds-input`
  - `ds-textarea`
  - `ds-badge`
  - `ds-alert`
- ✅ Theme injection utility (`defineDesignSystem`, `injectDefaultTheme`)

Not implemented yet:

- ⏳ Additional core components (selects, dialogs, tabs, dropdowns, etc.)
- ⏳ Accessibility hardening and keyboard interaction matrix
- ⏳ Framework-specific wrappers (`@agnostic-ds/react`, `@agnostic-ds/vue`, ...)
- ⏳ Storybook/docs site and contribution guidelines
- ⏳ Unit/integration/visual regression test setup
- ⏳ Versioning/release automation and change management

## Repository structure

```txt
.
├─ package.json
├─ tsconfig.base.json
├─ tsconfig.json
└─ packages/
   ├─ tokens/
   │  └─ src/
   │     ├─ index.ts
   │     └─ tokens.ts
   └─ core/
      └─ src/
         ├─ components/
         │  ├─ alert.ts
         │  ├─ badge.ts
         │  ├─ button.ts
         │  ├─ card.ts
         │  ├─ field.ts      # shared base for input and textarea
         │  ├─ input.ts
         │  └─ textarea.ts
         ├─ index.ts
         └─ setup.ts
```

## Local development

### 1) Install dependencies

```bash
npm install
```

### 2) Build packages

```bash
npm run build
```

### 3) Type-check packages

```bash
npm run typecheck
```

## Usage example

```ts
import { defineDesignSystem } from "@agnostic-ds/core";

defineDesignSystem();
```

Then in HTML:

```html
<ds-button variant="primary" size="md">Save</ds-button>
<ds-card>Framework-agnostic card content</ds-card>

<ds-input label="Email" name="email" type="email" hint="We never share this." required></ds-input>
<ds-textarea label="Notes" name="notes" rows="4"></ds-textarea>

<ds-badge variant="success">Active</ds-badge>
<ds-badge variant="danger" label="Unread messages">3</ds-badge>

<ds-alert variant="warning" heading="Heads up" dismissible>Your trial ends tomorrow.</ds-alert>
```

## Component reference

### `ds-input` and `ds-textarea`

Both are form-associated: they submit with a parent `<form>`, respond to form reset and disabled `<fieldset>`s, and take part in native constraint validation.

| Attribute | Applies to | Notes |
| --- | --- | --- |
| `label` | both | Accessible name; always set it |
| `hide-label` | both | Hides the label visually but keeps it for screen readers |
| `hint` | both | Help text linked with `aria-describedby` |
| `error` | both | Shows a message, sets `aria-invalid`, and announces politely; does not block form submission |
| `name`, `value`, `placeholder`, `autocomplete` | both | Same as the native attributes |
| `required`, `disabled`, `readonly`, `minlength`, `maxlength` | both | Same as the native attributes |
| `size` | both | `sm`, `md` (default), `lg` |
| `type` | `ds-input` | `text` (default), `email`, `password`, `search`, `tel`, `url`, `number` |
| `pattern`, `inputmode`, `min`, `max`, `step` | `ds-input` | Same as the native attributes |
| `rows` | `ds-textarea` | Defaults to `3` |
| `resize` | `ds-textarea` | `vertical` (default), `none` |

- **Events:** `input` and `change`; read the value from `event.target.value`.
- **Methods:** `checkValidity()`, `reportValidity()`, `focus()`.
- **CSS parts:** `container`, `label`, `required-indicator`, `input` or `textarea`, `hint`, `error`.

### `ds-badge`

| Attribute | Notes |
| --- | --- |
| `variant` | `neutral` (default), `primary`, `info`, `success`, `warning`, `danger` |
| `size` | `sm`, `md` (default) |
| `label` | Screen-reader-only context read before the content; use it when the content alone is unclear, such as a bare count |

- **CSS parts:** `badge`.

### `ds-alert`

| Attribute | Notes |
| --- | --- |
| `variant` | `info` (default), `success`, `warning`, `danger` |
| `heading` | Bold lead-in text; not a heading element, so it doesn't affect the page outline |
| `live` | `polite` (default, `role="status"`), `assertive` (`role="alert"`), `off` (no role, for static content) |
| `dismissible` | Shows a dismiss button |
| `dismiss-label` | Accessible name of the dismiss button; defaults to `Dismiss` |

- **Events:** `ds-dismiss`, fired before the alert hides. Call `preventDefault()` to keep it visible.
- **Slots:** default for the message, `icon` for a leading icon.
- **CSS parts:** `container`, `heading`, `content`, `dismiss`.

```css
ds-input::part(input) {
  border-radius: 0;
}
```

## Design principles

1. **Framework agnostic first**: core functionality lives in Web Components.
2. **Token-driven theming**: all visual decisions should resolve to design tokens.
3. **Accessibility by default**: interactive components must ship with accessible semantics and behavior.
4. **Thin adapters**: framework wrappers should add DX, not duplicate core behavior.
