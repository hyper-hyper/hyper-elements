import { BaseElement } from "../lib/base-element.js";
import { detectPlatform } from "../lib/utils.js";

export class HHChatPrompt extends BaseElement {
  static observedAttributes = ["type"];
  
  constructor() {
    super();
  }

  get styles() {
    return `
      :host {
        display: block;
        border: 1px solid var(--secondary);
        margin: var(--spacing);
      }
      :host([focused]) {
        border-color: var(--primary);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: var(--s-3);
      }
      #wrap {
        display: grid;
        width: 100%;
      }
      #wrap::after {
        content: attr(data-mirrored-value) " ";
        white-space: pre-wrap;
        visibility: hidden;
      }
      #wrap::after,
      #wrap > textarea {
        border: none;
        font-size: var(--s0);
        grid-area: 1 / 1 / 2 / 2;
        line-height: var(--s1);
        outline: none;
        padding: var(--padding);
      }
      #wrap > textarea {
        resize: none;
      }
      #meta {
        display: flex;
        flex-direction: row;
        gap: var(--spacing);
        justify-content: space-between;
      }
      #meta > button {
        padding: var(--padding);
        line-height: 1;
        cursor: pointer;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        font-size: var(--s0);
        align-self: flex-end;
      }
      #meta > button:hover {
        background-color: #0056b3;
      }
    `;
  }

  get template() {
    return `
      <form id="form">
        <div id="wrap">
          <textarea id="body" name="body" placeholder="Type a message..." rows="1"></textarea>
        </div>
        <div id="meta">
          <hh-menu icon="user" id="type" name="type" value="user">
            <hh-menu-item icon="instructions" value="instructions" autofocus selected>Instructions</hh-menu-item>
            <hh-menu-item icon="context" value="context">Context</hh-menu-item>
            <hh-menu-item icon="tools" value="tools">Tools</hh-menu-item>
            <hh-menu-item icon="task" value="task">Task</hh-menu-item>
            <hh-menu-item icon="output" value="output">Output</hh-menu-item>
            <hh-menu-item icon="model" value="model">Model</hh-menu-item>
            <hh-menu-item icon="user" value="user">User</hh-menu-item>
          </hh-menu>
          <button id="send" type="submit">Send</button>
        </div>
      </form>
    `;
  }

  render() {
    super.render();
    this._form = this.shadowRoot.querySelector("#form");
    this._wrap = this.shadowRoot.querySelector("#wrap");
    this._body = this.shadowRoot.querySelector("#body");
    this._send = this.shadowRoot.querySelector("#send");
    this._type = this.shadowRoot.querySelector("#type");
  }

  connectedCallback() {
    super.connectedCallback();
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
    this._body.addEventListener("focus", this.handleFocus.bind(this));
    this._body.addEventListener("blur", this.handleBlur.bind(this));
    this._body.addEventListener("input", this.handleInput.bind(this));
    this._body.addEventListener("keydown", this.handleKeyBindings.bind(this));
    this._type.addEventListener("change", this.handleTypeChange.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._form.removeEventListener("submit", this.handleSubmit);
    this._body.removeEventListener("keydown", this.handleKeyBindings);
    this._body.removeEventListener("input", this.handleInput);
    this._body.removeEventListener("focus", this.handleFocus);
    this._body.removeEventListener("blur", this.handleBlur);
    this._type.removeEventListener("change", this.handleTypeChange);
  }

  handleTypeChange(event) {
    console.log(event);
    event.target.setAttribute("icon", event.target.value);
  }

  handleInput() {
    this._wrap.dataset.mirroredValue = this._body.value;
  }

  handleFocus() {
    this.setAttribute("focused", "true");
  }

  handleBlur() {
    this.removeAttribute("focused");
  }

  handleKeyBindings(event) {
    if("macintosh" === detectPlatform() && event.metaKey && "Enter" === event.key) {
      this._form.dispatchEvent(new Event("submit"));
    }
    if("windows" === detectPlatform() && event.ctrlKey && "Enter" === event.key) {
      this._form.dispatchEvent(new Event("submit"));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this._body.value);
    if(0 === this._body.value.length) {
      return false;
    }
    const formData = new FormData(event.target);
    const message = {};
    formData.forEach((value, key) => (message[key] = value));
    this.sendMessage(message);
    this._body.value = "";
    this._body.dispatchEvent(new Event("input"));
  }

  sendMessage(message) {
    this.dispatchEvent(new CustomEvent("message", {
      detail: message,
      bubbles: true,
      cancelable: true
    }));
  }

}

HHChatPrompt.define();