import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ds-button")
export class DsButton extends LitElement {
  @property({ reflect: true })
  variant: "primary" | "secondary" = "primary";

  @property({ reflect: true })
  size: "sm" | "md" | "lg" = "md";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--ds-font-familySans, sans-serif);
    }

    button {
      border: 1px solid transparent;
      border-radius: var(--ds-radius-md, 0.5rem);
      font-weight: var(--ds-font-weightSemibold, 600);
      cursor: pointer;
      transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
    }

    :host([size="sm"]) button {
      font-size: var(--ds-font-sizeSm, 0.875rem);
      padding: var(--ds-spacing-sm, 0.5rem) var(--ds-spacing-md, 0.75rem);
    }

    :host([size="md"]) button {
      font-size: var(--ds-font-sizeMd, 1rem);
      padding: var(--ds-spacing-sm, 0.5rem) var(--ds-spacing-lg, 1rem);
    }

    :host([size="lg"]) button {
      font-size: var(--ds-font-sizeLg, 1.125rem);
      padding: var(--ds-spacing-md, 0.75rem) var(--ds-spacing-xl, 1.5rem);
    }

    :host([variant="primary"]) button {
      background: var(--ds-color-primary, #2563eb);
      color: var(--ds-color-primaryText, #ffffff);
    }

    :host([variant="primary"]) button:hover:not(:disabled) {
      background: var(--ds-color-primaryHover, #1d4ed8);
    }

    :host([variant="secondary"]) button {
      background: var(--ds-color-surface, #f8fafc);
      color: var(--ds-color-text, #0f172a);
      border-color: var(--ds-color-border, #cbd5e1);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `;

  override render() {
    return html`<button ?disabled=${this.disabled} part="button"><slot></slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-button": DsButton;
  }
}
