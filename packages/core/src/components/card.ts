import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ds-card")
export class DsCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    article {
      background: var(--ds-color-background, #ffffff);
      border: 1px solid var(--ds-color-border, #cbd5e1);
      border-radius: var(--ds-radius-lg, 0.75rem);
      box-shadow: var(--ds-shadow-sm, 0 1px 2px 0 rgb(15 23 42 / 0.08));
      color: var(--ds-color-text, #0f172a);
      padding: var(--ds-spacing-xl, 1.5rem);
      font-family: var(--ds-font-familySans, sans-serif);
    }
  `;

  override render() {
    return html`<article part="container"><slot></slot></article>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-card": DsCard;
  }
}
