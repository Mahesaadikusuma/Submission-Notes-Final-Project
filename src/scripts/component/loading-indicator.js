class loadingIndicator extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="align-items-center mt-3 d-none" id="loadingIndicator">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden"></span>
    </div>
    <div class="ms-3">Loading...</div>
  </div>
          `;
  }
}

customElements.define("loading-indicator", loadingIndicator);
