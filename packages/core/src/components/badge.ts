import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ds-badge")
export class DsBadge extends LitElement {
  @property({ reflect: true })
  variant: "neutral" | "primary" | "info" | "success" | "warning" | "danger" = "neutral";

  @property({ reflect: true })
  size: "sm" | "md" = "md";

  /** Screen-reader-only context read before the content, e.g. "Unread messages". */
  @property()
  label?: string | undefined;

  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--ds-font-familySans, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    [part="badge"] {
      display: inline-block;
      border: 1px solid transparent;
      border-radius: var(--ds-radius-sm, 0.375rem);
      background: var(--ds-color-surface, #f8fafc);
      color: var(--ds-color-text, #0f172a);
      border-color: var(--ds-color-border, #cbd5e1);
      font-size: var(--ds-font-sizeSm, 0.875rem);
      font-weight: var(--ds-font-weightSemibold, 600);
      padding: var(--ds-spacing-xs, 0.25rem) var(--ds-spacing-sm, 0.5rem);
    }

    :host([size="sm"]) [part="badge"] {
      padding: 0 var(--ds-spacing-xs, 0.25rem);
    }

    :host([variant="primary"]) [part="badge"] {
      background: var(--ds-color-primary, #2563eb);
      border-color: var(--ds-color-primary, #2563eb);
      color: var(--ds-color-primaryText, #ffffff);
    }

    :host([variant="info"]) [part="badge"] {
      background: var(--ds-color-infoSubtle, #dbeafe);
      border-color: var(--ds-color-infoSubtle, #dbeafe);
      color: var(--ds-color-info, #1e40af);
    }

    :host([variant="success"]) [part="badge"] {
      background: var(--ds-color-successSubtle, #dcfce7);
      border-color: var(--ds-color-successSubtle, #dcfce7);
      color: var(--ds-color-success, #166534);
    }

    :host([variant="warning"]) [part="badge"] {
      background: var(--ds-color-warningSubtle, #fef3c7);
      border-color: var(--ds-color-warningSubtle, #fef3c7);
      color: var(--ds-color-warning, #92400e);
    }

    :host([variant="danger"]) [part="badge"] {
      background: var(--ds-color-dangerSubtle, #fee2e2);
      border-color: var(--ds-color-dangerSubtle, #fee2e2);
      color: var(--ds-color-danger, #b91c1c);
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `;

  override render() {
    return html`<span part="badge"
      >${this.label
        ? html`<span class="visually-hidden">${this.label} </span>`
        : nothing}<slot></slot
    ></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-badge": DsBadge;
  }
}
