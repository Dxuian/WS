import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// import "/public/csslinker.js"
 class Whlesite extends LitElement {
  createRenderRoot() {
    return this;
  }
 
  constructor() {
    super();
  }
 
  render() {
     
    return html`
  <we-po></we-po>
    `
  }
  }
  customElements.define('we-bd', Whlesite);

  class Wholesite extends LitElement {
    createRenderRoot() {
      return this;
    }
    constructor() {
      super();
    }
    render() {
       
      return html`
  
  <!-- Open the modal using ID.showModal() method -->
  <div class="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" checked="checked" /> 
  <div class="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div class="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div class="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div class="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div class="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div class="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div class="collapse-content"> 
    <p>hello</p>
  </div>
</div>
      `
    }
    }

customElements.define('we-po', Wholesite);

  
  
  
  































































//eventlisteners begin here
window.addEventListener('connectionSuccess', (event) => {
  console.log(`Connection successful! Starting game with code ${event.detail}`);
});
window.addEventListener('connectionFail', (event) => {
  console.log(`Connection failed! Wrong code: ${event.detail}`);
});
window.addEventListener('socketErrorDetected', (event) => {
  console.error(`Socket error detected: ${event.detail}`);
});
window.addEventListener('socketErrorCaught', (event) => {
  console.warn(`Socket error caught: ${event.detail}`);
});
window.addEventListener("connectionClosed", () => {
  console.log('Connection closed with wrong code!');
});