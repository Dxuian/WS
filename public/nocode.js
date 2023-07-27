import {LitElement, html ,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class Conectfailnocode extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
    <div id="conectfail-nocode" class="bg-red-600 p-24 z-50 absolute left-1/4 top-1/3	 rounded-3 text-2xl font-black text-red-300">
    Connection failed
    <div class="text-black text-justify text-xl">incorrect lobby code entered !!! <br>
        lobby codes are typically between 30-40 characters long</div>
    </div>
     
    `;
  }
}
customElements.define('conectfail-nocode', Conectfailnocode);