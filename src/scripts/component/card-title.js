class CardTitle extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="card-header">
    <h5 class="card-title">Input Notes</h5>
  </div>
          `;
  }
}

customElements.define("card-title", CardTitle);
