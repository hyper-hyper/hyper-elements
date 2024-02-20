import { BaseElement } from "../lib/base-element.js";

export class HHButton extends BaseElement {
  static observedAttributes = ["popovertarget"];

  get popovertarget() { return this.getAttribute("popovertarget"); }
  set popovertarget(value) { this.setAttribute("popovertarget", value); }

  constructor() {
    super();
  }

  get styles() {
    return `
      :host {
        display: flex;
        cursor: pointer;
      }
      button {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: var(--radius);
      }
      button > * {
        gap: var(--spacing);
        padding: var(--padding);
      }
    `;
  }

  get template() {
    return `
      <button>
        <slot></slot>
      </button>
    `;
  }
}

HHButton.define({ extends: "button" });