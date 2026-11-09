import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

const LIVE_ROLES = {
  assertive: "alert",
  polite: "status",
  off: undefined
} as const;

@customElement("ds-alert")
export class DsAlert extends LitElement {
  @property({ reflect: true })
  variant: "info" | "success" | "warning" | "danger" = "info";

  /** Bold lead-in text. Deliberately not a heading element, to keep the page outline intact. */
  @property()
  heading?: string | undefined;

  /** How assistive tech announces changes: `polite` (status), `assertive` (alert), or `off`. */
  @property({ reflect: true })
  live: keyof typeof LIVE_ROLES = "polite";

  @property({ type: Boolean, reflect: true })
  dismissible = false;

  /** Accessible name of the dismiss button; override to localize. */
  @property({ attribute: "dismiss-label" })
  dismissLabel = "Dismiss";

  static override styles = css`
    :host {
      display: block;
      font-family: var(--ds-font-familySans, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    [part="container"] {
      --_accent: var(--ds-color-info, #1e40af);
      display: flex;
      align-items: flex-start;
      gap: var(--ds-spacing-md, 0.75rem);
      border: 1px solid var(--_accent);
      border-radius: var(--ds-radius-md, 0.5rem);
      background: var(--ds-color-infoSubtle, #dbeafe);
      color: var(--ds-color-text, #0f172a);
      font-size: var(--ds-font-sizeMd, 1rem);
      padding: var(--ds-spacing-md, 0.75rem) var(--ds-spacing-lg, 1rem);
    }

    :host([variant="success"]) [part="container"] {
      --_accent: var(--ds-color-success, #166534);
      background: var(--ds-color-successSubtle, #dcfce7);
    }

    :host([variant="warning"]) [part="container"] {
      --_accent: var(--ds-color-warning, #92400e);
      background: var(--ds-color-warningSubtle, #fef3c7);
    }

    :host([variant="danger"]) [part="container"] {
      --_accent: var(--ds-color-danger, #b91c1c);
      background: var(--ds-color-dangerSubtle, #fee2e2);
    }

    [part="content"] {
      flex: 1;
      min-width: 0;
    }

    [part="heading"] {
      margin: 0 0 var(--ds-spacing-xs, 0.25rem);
      color: var(--_accent);
      font-weight: var(--ds-font-weightSemibold, 600);
    }

    [part="dismiss"] {
      border: 0;
      border-radius: var(--ds-radius-sm, 0.375rem);
      background: transparent;
      color: inherit;
      cursor: pointer;
      font: inherit;
      line-height: 1;
      padding: var(--ds-spacing-xs, 0.25rem) var(--ds-spacing-sm, 0.5rem);
    }

    [part="dismiss"]:focus-visible {
      outline: 2px solid var(--_accent);
      outline-offset: 1px;
    }
  `;

  private handleDismiss(): void {
    const proceed = this.dispatchEvent(
      new CustomEvent("ds-dismiss", { bubbles: true, composed: true, cancelable: true })
    );
    if (proceed) {
      this.hidden = true;
    }
  }

  override render() {
    return html`<div part="container" role=${ifDefined(LIVE_ROLES[this.live])}>
      <slot name="icon"></slot>
      <div part="content">
        ${this.heading ? html`<p part="heading">${this.heading}</p>` : nothing}
        <slot></slot>
      </div>
      ${this.dismissible
        ? html`<button
            type="button"
            part="dismiss"
            aria-label=${this.dismissLabel}
            @click=${this.handleDismiss}
          >
            <span aria-hidden="true">&times;</span>
          </button>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-alert": DsAlert;
  }
}
