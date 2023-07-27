import {LitElement, html ,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class Conectfail extends LitElement {
  createRenderRoot() {
    return this;
  }
  
  render() {
    return html`
    <div id="conectfail" class="bg-red-600 p-24 z-50  mt-44 absolute rounded-3 text-2xl font-black text-red-300">
    Connection failed
    <div class="text-black text-justify text-xl">check your internet connection or <br>
        retry entering the correct lobby code</div>
    </div>
     
    `;
  }
}
customElements.define('conectfail-non', Conectfail);