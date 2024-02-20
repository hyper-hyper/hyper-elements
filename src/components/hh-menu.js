import { BaseElement } from "../lib/base-element.js";
import { toPixels } from "../lib/utils.js";

export class HHMenu extends BaseElement {
  static observedAttributes = ["icon", "name", "value"];
  
  get icon() { return this.getAttribute("icon"); }
  set icon(value) { this.setAttribute("icon", value); }

  get name() { return this.getAttribute("name"); }
  set name(value) { this.setAttribute("name", value); }

  get value() { return this.getAttribute("value"); }
  set value(value) { this.setAttribute("value", value); }

  constructor() {
    super();
  }

  get styles() {
    return `
      :host {
        display: flex;
      }
      :popover-open {
        background: var(--secondary);
        display: block;
        position: absolute;
        margin: 0;
        inset: unset;
        border: none;
        padding: 0;
      }
      #button {
        padding: var(--s-5) var(--padding-x);
      }
      #menu > * {
        
      }
    `;
  }

  get template() {
    return `
      <nav id="menu">
        <button id="button" popovertarget="popover">
          <hh-icon name="${this.icon}"></hh-icon>
        </button>
        <div role="menu" id="popover" popover>
          <slot></slot>
        </div>
      </nav>
    `;
  }

  render() {
    super.render();
    this._menu = this.shadowRoot.querySelector("#menu");
    this._button = this.shadowRoot.querySelector("#button");
    this._popover = this.shadowRoot.querySelector("#popover");
    this._slot = this.shadowRoot.querySelector("slot");
  }

  connectedCallback() {
    super.connectedCallback();
    this._popover.addEventListener("toggle", this.handleToggle.bind(this));
    this._slot.addEventListener("slotchange", this.handleSlotChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._popover.removeEventListener("toggle", this.handleToggle);
    this._slot.removeEventListener("slotchange", this.handleSlotChange);
  }

  handleToggle(event) {
    const buttonRect = this._button.getBoundingClientRect();
    const documentRect = document.documentElement.getBoundingClientRect();
    this._popover.style.top = "auto";
    this._popover.style.left = "auto";
    this._popover.style.right = "auto";
    this._popover.style.bottom = "auto";
    if(buttonRect.top < 100) {
      this._popover.style.top = toPixels(buttonRect.bottom);
    }
    else {
      this._popover.style.bottom = toPixels(documentRect.height-buttonRect.top);
    }
    if(buttonRect.left < 100) {
      this._popover.style.left = toPixels(buttonRect.left);
    }
    else {
      this._popover.style.right = toPixels(documentRect.width-buttonRect.right);
    }
  }

  handleSlotChange(event) {
    this._items = this._slot.assignedElements();
    console.log(this._items);
    this.value = this._items[0].value;
    this._items[0].selected = true;
    this._items.forEach(item => item.addEventListener("click", this.handleItemClick.bind(this)));
  }
  
  handleItemClick(event) {
    this._items.forEach(item => item.selected = false);
    event.target.selected = true;
    this.value = event.target.value;
    this._popover.hidePopover();
    this.dispatchEvent(new Event("change"));
  }
}

HHMenu.define();