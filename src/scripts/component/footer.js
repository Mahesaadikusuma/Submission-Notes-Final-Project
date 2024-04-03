class FooterBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
  
      }
      
      span {
          display: block;
          color: white;
          text-align: center;
          padding: 20px 0;
        }
      `;
  }

  connectedCallback() {
    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this.updateStyle();
    this._shadowRoot.append(this._style);
    this._shadowRoot.innerHTML += `      
        <span>
          Mahesa Notes App final resfull Api &copy; 2024
        </span>
      `;
  }
}

customElements.define("footer-bar", FooterBar);
