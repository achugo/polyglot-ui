import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { DsField } from "./field.js";

@customElement("ds-input")
export class DsInput extends DsField {
  @property({ reflect: true })
  type: "text" | "email" | "password" | "search" | "tel" | "url" | "number" = "text";

  @property()
  pattern?: string | undefined;

  @property()
  inputmode?: string | undefined;

  @property()
  min?: string | undefined;

  @property()
  max?: string | undefined;

  @property()
  step?: string | undefined;

  protected override renderControl() {
    return html`<input
      id="control"
      class="control"
      part="input"
      type=${this.type}
      .value=${live(this.value)}
      ?disabled=${this.isDisabled}
      ?required=${this.required}
      ?readonly=${this.readonly}
      placeholder=${ifDefined(this.placeholder)}
      autocomplete=${ifDefined(this.autocomplete)}
      minlength=${ifDefined(this.minlength)}
      maxlength=${ifDefined(this.maxlength)}
      pattern=${ifDefined(this.pattern)}
      inputmode=${ifDefined(this.inputmode)}
      min=${ifDefined(this.min)}
      max=${ifDefined(this.max)}
      step=${ifDefined(this.step)}
      aria-describedby=${ifDefined(this.describedBy)}
      aria-invalid=${ifDefined(this.error ? "true" : undefined)}
      @input=${this.handleInput}
      @change=${this.handleChange}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-input": DsInput;
  }
}
