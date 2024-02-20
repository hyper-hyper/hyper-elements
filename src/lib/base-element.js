import { registry } from "./registry.js";
import { toKebabCase } from "./utils.js";

/**
 * Base Element class
 * @extends HTMLElement
 */
export class BaseElement extends HTMLElement {
  static observedAttributes = [];
  
  get styles() {
    return `
      :host {
        display: flex;
      }
    `;
  }

  get template() {
    return `<slot></slot>`;
  }

  /**
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Render component template
   */
  render() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(this.styles);
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.innerHTML = this.template;
  }

  /**
   * Attribute Change Callback
   * @param {string} name Attribute name
   * @param {string} oldValue Old value
   * @param {string} newValue New value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if(oldValue !== newValue) {
      this.setAttribute(name, newValue);
    }
  }

  /**
   * Connected Callback
   */
  connectedCallback() {
    this.dispatchEvent(new Event("connected"));
    this.render();
  }
  
  /**
   * Disconnected Callback
   */
  disconnectedCallback() {
    this.dispatchEvent(new Event("disconnected"));
  }
  
  /**
   * Adopted Callback
   */
  adoptedCallback() {
    this.dispatchEvent(new Event("adopted"));
  }

  /**
   * Define Custom Element
   * @param {object | undefined} options
   * @returns {undefined}
   */
  static define(options = undefined) {
    const tag = toKebabCase(this.name);
    console.log(this.name, tag);
    registry.define(tag, this, options);
  }
}
