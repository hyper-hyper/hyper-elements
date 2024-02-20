/** Gets `CustomElementRegistry` from window */
export const registry = "customElements" in window && customElements;
