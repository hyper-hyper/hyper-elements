import { BaseElement } from "../lib/base-element.js";

export class HHMenuItem extends BaseElement {
  static observedAttributes = ["icon", "kbd", "selected", "value"];

  get icon() { return this.getAttribute("icon"); }
  set icon(value) { this.setAttribute("icon", value); }

  get kbd() { return this.getAttribute("kbd"); }
  set kbd(value) { this.setAttribute("kbd", value); }

  get selected() { return this.getAttribute("selected"); }
  set selected(value) { this.setAttribute("selected", value); }

  get value() { return this.getAttribute("value"); }
  set value(value) { this.setAttribute("value", value); }

  constructor() {
    super();
  }

  get styles() {
    return `
      :host {

      }
      #item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        gap: var(--spacing);
        padding: var(--padding);
        font-size: var(--s0);
      }
      #item kbd {
        color: var(--darkgray);
        font-size: var(--s-3s);
        justify-content: flex-end;
      }
    `;
  }

  get template() {
    return `
      <button id="item" role="menuitem">
        ${this.icon && `<hh-icon name="${this.icon}"></hh-icon>` || ""}
        <slot></slot>
        ${this.kbd && `<kbd>${this.kbd}</kbd>` || ""}
      </button>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

  }

  disconnectedCallback() {
    super.disconnectedCallback();

  }
}

HHMenuItem.define();