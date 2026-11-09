import { LitElement, css, html, nothing } from "lit";
import type { CSSResultGroup, PropertyValues, TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";

/**
 * Shared behavior for single-control form fields (`ds-input`, `ds-textarea`):
 * label/hint/error wiring, native form participation, and constraint validation.
 */
export abstract class DsField extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  static override styles: CSSResultGroup = css`
    :host {
      display: block;
      font-family: var(--ds-font-familySans, sans-serif);
      color: var(--ds-color-text, #0f172a);
    }

    :host([hidden]) {
      display: none;
    }

    label {
      display: block;
      margin-bottom: var(--ds-spacing-xs, 0.25rem);
      font-size: var(--ds-font-sizeSm, 0.875rem);
      font-weight: var(--ds-font-weightSemibold, 600);
    }

    :host([hide-label]) label {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    [part="required-indicator"] {
      color: var(--ds-color-danger, #b91c1c);
    }

    .control {
      display: block;
      box-sizing: border-box;
      width: 100%;
      /* mutedText rather than border: form control outlines need 3:1 contrast. */
      border: 1px solid var(--ds-color-mutedText, #475569);
      border-radius: var(--ds-radius-md, 0.5rem);
      background: var(--ds-color-background, #ffffff);
      color: inherit;
      font: inherit;
      font-size: var(--ds-font-sizeMd, 1rem);
      padding: var(--ds-spacing-sm, 0.5rem) var(--ds-spacing-md, 0.75rem);
    }

    :host([size="sm"]) .control {
      font-size: var(--ds-font-sizeSm, 0.875rem);
      padding: var(--ds-spacing-xs, 0.25rem) var(--ds-spacing-sm, 0.5rem);
    }

    :host([size="lg"]) .control {
      font-size: var(--ds-font-sizeLg, 1.125rem);
      padding: var(--ds-spacing-md, 0.75rem) var(--ds-spacing-lg, 1rem);
    }

    .control::placeholder {
      color: var(--ds-color-mutedText, #475569);
      opacity: 1;
    }

    .control:focus-visible {
      outline: 2px solid var(--ds-color-primary, #2563eb);
      outline-offset: 1px;
    }

    .control[aria-invalid="true"] {
      border-color: var(--ds-color-danger, #b91c1c);
    }

    .control:disabled {
      background: var(--ds-color-surface, #f8fafc);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .control:read-only:not(:disabled) {
      background: var(--ds-color-surface, #f8fafc);
    }

    [part="hint"],
    [part="error"] {
      margin: var(--ds-spacing-xs, 0.25rem) 0 0;
      font-size: var(--ds-font-sizeSm, 0.875rem);
    }

    [part="hint"] {
      color: var(--ds-color-mutedText, #475569);
    }

    [part="error"] {
      color: var(--ds-color-danger, #b91c1c);
    }
  `;

  /** Accessible name. Always set it; use `hide-label` to hide it visually. */
  @property()
  label?: string | undefined;

  @property({ type: Boolean, reflect: true, attribute: "hide-label" })
  hideLabel = false;

  @property()
  hint?: string | undefined;

  /** Displays a message and marks the field invalid. Does not block form submission. */
  @property()
  error?: string | undefined;

  @property({ reflect: true })
  name?: string | undefined;

  @property()
  value = "";

  @property()
  placeholder?: string | undefined;

  @property()
  autocomplete?: string | undefined;

  @property({ type: Number })
  minlength?: number | undefined;

  @property({ type: Number })
  maxlength?: number | undefined;

  @property({ reflect: true })
  size: "sm" | "md" | "lg" = "md";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Disabled state reported by the browser, e.g. from a disabled `<fieldset>`. */
  @state()
  protected formDisabled = false;

  @query("#control")
  protected control!: HTMLInputElement | HTMLTextAreaElement | null;

  private readonly internals = this.attachInternals();

  get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  checkValidity(): boolean {
    return this.internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.internals.reportValidity();
  }

  formDisabledCallback(disabled: boolean): void {
    this.formDisabled = disabled;
  }

  formResetCallback(): void {
    this.value = this.getAttribute("value") ?? "";
  }

  formStateRestoreCallback(state: File | string | FormData | null): void {
    if (typeof state === "string") {
      this.value = state;
    }
  }

  protected abstract renderControl(): TemplateResult;

  protected get isDisabled(): boolean {
    return this.disabled || this.formDisabled;
  }

  protected get describedBy(): string | undefined {
    const ids = [this.hint ? "hint" : "", this.error ? "error" : ""].filter(Boolean);
    return ids.length > 0 ? ids.join(" ") : undefined;
  }

  protected handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  /** Native `change` is not composed, so it must be re-dispatched from the host. */
  protected handleChange(): void {
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has("value")) {
      this.internals.setFormValue(this.value);
    }

    const control = this.control;
    // Barred controls (disabled/readonly) report an empty message, which setValidity rejects.
    if (control?.willValidate && !control.validity.valid) {
      this.internals.setValidity(control.validity, control.validationMessage, control);
    } else {
      this.internals.setValidity({});
    }
  }

  override render() {
    return html`<div part="container">
      ${this.label
        ? html`<label for="control" part="label"
            >${this.label}${this.required
              ? html`<span part="required-indicator" aria-hidden="true"> *</span>`
              : nothing}</label
          >`
        : nothing}
      ${this.renderControl()}
      ${this.hint ? html`<p id="hint" part="hint">${this.hint}</p>` : nothing}
      <div aria-live="polite">
        ${this.error ? html`<p id="error" part="error">${this.error}</p>` : nothing}
      </div>
    </div>`;
  }
}
