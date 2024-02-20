import { BaseElement } from "../lib/base-element.js";

export class HHChatMessage extends BaseElement {
  static observedAttributes = ["model", "type", "tokens", "words"];

  get model() { return this.getAttribute("model"); }
  set model(value) { this.setAttribute("model", value); }

  get title() {
    switch(this.type) {
      case "instructions": return "Instructions"; break;
      case "user": return "User"; break;
      case "model": return "Model"; break;
      case "context": return "Context"; break;
      case "tool": return "Tool"; break;
      case "task": return "Task"; break;
      case "output": return "Output"; break;
      default: return "-"; break;
    }
  }

  get type() { return this.getAttribute("type"); }
  set type(value) { this.setAttribute("type", value); }

  get tokens() { return this.getAttribute("tokens"); }
  set tokens(value) { this.setAttribute("tokens", value); }

  get words() { return this.getAttribute("words"); }
  set words(value) { this.setAttribute("words", value); }

  constructor() {
    super();
  }

  get styles() {
    return `
      :host {
        display: flex;
      }
      #message {
        color: var(--text-color);
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        background-color: var(--secondary);
        gap: var(--spacing);
        padding: var(--padding);
        border-radius: var(--radius);
        overflow: hidden;
      }
      #type {
        width: 24px;
      }
      #body {
        flex-grow: 1;
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
      }
      h1 { font-size: var(--s5); }
      h2 { font-size: var(--s4); }
      h3 { font-size: var(--s3); }
      h4 { font-size: var(--s2); }
      h5 { font-size: var(--s1); }
      h6 { font-size: var(--s0); }
      p,
      pre,
      code {
        font-size: var(--s-1);
      }
      footer span {
        font-size: var(--s-2);
        color: var(--lightgray);
      }
    `;
  }

  get template() {
    return `
      <div id="message">
        <div id="type">
          <hh-icon key="${this.type}"></hh-icon>
        </div>
        <div id="body">
          <header>
            <h6>${this.title}</h6>
            <hh-menu name="action" value="">
              <hh-menu-item value="reply" autofocus>Reply</hh-menu-item>
              <hh-menu-item value="copy">Copy</hh-menu-item>
              <hh-menu-item value="edit">Edit</hh-menu-item>
              <hh-menu-item value="delete">Delete</hh-menu-item>
            </hh-menu>
          </header>
          <slot></slot>
          <footer>
            <span id="model">Model: ${this.model}</span>
            <span id="words">Words: ${this.words}</span>
            <span id="tokens">Tokens: ${this.tokens}</span>
          </footer>
        </div>
      </div>
    `;
  }
}

HHChatMessage.define();