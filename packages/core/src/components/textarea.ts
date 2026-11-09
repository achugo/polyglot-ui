import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { DsField } from "./field.js";

@customElement("ds-textarea")
export class DsTextarea extends DsField {
  static override styles = [
    DsField.styles,
    css`
      textarea {
        resize: vertical;
      }

      :host([resize="none"]) textarea {
        resize: none;
      }
    `
  ];

  @property({ type: Number })
  rows = 3;

  @property({ reflect: true })
  resize: "vertical" | "none" = "vertical";

  protected override renderControl() {
    return html`<textarea
      id="control"
      class="control"
      part="textarea"
      rows=${this.rows}
      .value=${live(this.value)}
      ?disabled=${this.isDisabled}
      ?required=${this.required}
      ?readonly=${this.readonly}
      placeholder=${ifDefined(this.placeholder)}
      autocomplete=${ifDefined(this.autocomplete)}
      minlength=${ifDefined(this.minlength)}
      maxlength=${ifDefined(this.maxlength)}
      aria-describedby=${ifDefined(this.describedBy)}
      aria-invalid=${ifDefined(this.error ? "true" : undefined)}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-textarea": DsTextarea;
  }
}
