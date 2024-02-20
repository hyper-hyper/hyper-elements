import { BaseElement } from "../lib/base-element.js";

export class HHHeader extends BaseElement {
  static observedAttributes = ["icon", "title"];

  get icon() { return this.getAttribute("icon"); }
  set icon(value) { this.setAttribute("icon", value); }

  get title() { return this.getAttribute("title"); }
  set title(value) { this.setAttribute("title", value); }

  constructor() {
    super();
  }

  get styles() {
    return `
      :host {
        display: flex;
      }
      header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: var(--padding);
        gap: var(--spacing);
        border-bottom: 1px solid var(--dimgray);
      }
      #left,
      #right {
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
        align-items: center;
      }
    `;
  }

  get template() {
    return `
      <header>
        <div id="left">
          ${this.icon && `<hh-icon name="${this.icon}"></hh-icon>`}
          ${this.title}
        </div>
        <div id="right">
          <slot></slot>
        </div>
      </header>
    `;
  }
}

HHHeader.define();