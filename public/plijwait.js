import {LitElement, html ,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class Plijwait extends LitElement {
  createRenderRoot() {
    return this;
  }
  firstUpdated() {
    setTimeout(function() {
      var alertDiv = document.getElementById("alertDiv2");
      alertDiv.style.transition = "opacity 1s";
      alertDiv.style.opacity = 0;
      setTimeout(function() {
        alertDiv.remove();
      }, 1000);
    }, 5000);
  }
  render() {
    return html`
    <div id="alertDiv2" class="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>Ongoing match proceeding please wait</span>
</div>
    `;
  }
}
customElements.define('plijwait-non', Plijwait);

