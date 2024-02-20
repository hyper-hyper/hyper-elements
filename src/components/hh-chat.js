import { BaseElement } from "../lib/base-element.js";

export class HHChat extends BaseElement {
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
        display: block;
        height: 100%;
        width: 100%;
      }
      #container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      #conversation {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
      }
      #messages {
        display: flex;
        flex-flow: column nowrap;
        gap: var(--spacing);
        padding: var(--padding);
        justify-content: flex-end;
        min-height: 100%;
      }
      ai-chat-prompt {
        
      }
    `;
  }

  get template() {
    return `
      <div id="container">
        <hh-header icon="${this.icon}" title="${this.title}">
          <hh-menu icon="dots">
            <hh-menu-item value="export" kbd="⌘E">Export</hh-menu-item>
            <hh-menu-item value="quit" kbd="⌘Q">Quit</hh-menu-item>
          </hh-menu>
        </hh-header>
        <div id="conversation">
          <div id="messages">
            <slot></slot>
          </div>
        </div>
        <hh-chat-prompt id="prompt"></hh-chat-prompt>
      </div>
    `;
  }

  render() {
    super.render();
    this._conversation = this.shadowRoot.querySelector("#conversation");
    this._messages = this.shadowRoot.querySelector("#messages");
    this._prompt = this.shadowRoot.querySelector("#prompt");
  }

  connectedCallback() {
    super.connectedCallback();
    this._prompt.addEventListener("message", this.handleMessage.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._prompt.removeEventListener("message", this.handleMessage);
  }

  handleMessage(event) {
    const message = event.detail;
    this.appendMessage(message);
  }

  appendMessage(message) {
    console.log("appendMessage()", message);
    const newMessage = document.createElement("hh-chat-message");
    newMessage.setAttribute("type", message.type);
    newMessage.innerHTML = message.body;
    this._messages.appendChild(newMessage);
    this._conversation.scrollTop = this._messages.scrollHeight;
  }
}

HHChat.define();
