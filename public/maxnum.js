import {LitElement, html ,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class Maxnum extends LitElement {
  createRenderRoot() {
    return this;
  }
  firstUpdated() {
    setTimeout(function() {
      var alertDiv = document.getElementById("alertDiv");
      alertDiv.style.transition = "opacity 1s";
      alertDiv.style.opacity = 0;
      setTimeout(function() {
        alertDiv.remove();
      }, 1000);
    }, 5000);
  
  }
  render() {
    return html`
    <div  id="alertDiv" class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <span>Lobby already has maximum of 4 players!</span>
</div>
    `;
  }
}
customElements.define('maxnum-non', Maxnum);

