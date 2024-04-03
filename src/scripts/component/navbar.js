class Navbar extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav class="navbar navbar-dark bg-primary">
            <div class="container">
                <a href="index.html" class="navbar-brand mb-0 h1">Notes App</a>
            </div>
        </nav>
        `;
  }
}

customElements.define("app-navbar", Navbar);
