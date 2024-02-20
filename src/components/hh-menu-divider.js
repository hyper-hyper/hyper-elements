import { BaseElement } from "../lib/base-element.js";

export class HHMenuDivider extends BaseElement {
  constructor() {
    super();
  }
  
  get styles() {
    return `
      :host {
        display: flex;
        width: 100%;
        height: 1px;
        background-color: var(--secondary);
      }  
    `;
  }
}

HHMenuDivider.define();