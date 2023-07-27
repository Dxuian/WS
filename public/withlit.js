import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ifDefined } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import "/public/header.js"
import "/public/colap.js"
import "/public/gamesleftpanel.js"
import "/public/conectfail.js"
import "/public/nocode.js"
import "/public/board.js"
import "/public/topten.js"
import "/public/plijwait.js"
import "/public/maxnum.js"
// import "/public/csslinker.js"
 class Wholesite extends LitElement {
  createRenderRoot() {
    return this;
  }
  static get properties() {
    return {
      gameStarted: { type: Boolean },
    };
  }
  constructor() {
    super();
    this.gameStarted = false;
    // Bind event listener to `this` so it can access the component instance
    this.incorrectcodevar = false;
    this.nocorrectcodevar = false;
    this.handleGameStartSelf = this.handleGameStartSelf.bind(this);
    this.incorrectcode = this.incorrectcode.bind(this);
    this.nocorrectcode = this.nocorrectcode.bind(this);
    this.topten = false ;
    this.dataholdertemp ; 
    this.polpo= false ;  
    this.maxnumber = false ; 
    this.pliswaitval  = false ; 
  }
  connectedCallback() {
    super.connectedCallback();
    // Add event listener when component is connected to the DOM
    window.addEventListener('game_start_self', this.handleGameStartSelf);
    window.addEventListener('wronglobbycode', this.incorrectcode);
    window.addEventListener('NOonglobbycode', this.nocorrectcode);
    window.addEventListener('closeg', this.closeg.bind(this));
    window.addEventListener('topten', this.updateit.bind(this));
    window.addEventListener('leavinglobby', this.leavinglobby.bind(this));
    window.addEventListener('passeroffn', this.passeroffn.bind(this));
    window.addEventListener('maxnumberalert', this.maxnumberalert.bind(this));
    window.addEventListener('pliswait', this.pliswait.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove event listener when component is removed from the DOM
    window.removeEventListener('game_start_self', this.handleGameStartSelf);
    window.removeEventListener('wronglobbycode', this.incorrectcode);
    window.removeEventListener('NOonglobbycode', this.nocorrectcode);
    window.removeEventListener('closeg', this.closeg.bind(this));
    window.removeEventListener('topten', this.updateit.bind(this));
    window.removeEventListener('leavinglobby', this.leavinglobby.bind(this));
    window.removeEventListener('passeroffn', this.passeroffn.bind(this));
    window.removeEventListener('maxnumberalert', this.maxnumberalert.bind(this));
    window.removeEventListener('pliswait', this.pliswait.bind(this));
  }
 async pliswait()
  {
    this.pliswaitval = true  ;
    this.requestUpdate()
    await this.updateComplete;
    setTimeout(() => {
      this.pliswaitval  = false ; 
      this.requestUpdate()
    }, 5100);
  }
 async maxnumberalert()
  {
    this.maxnumber=  true ;
    this.requestUpdate()
    await this.updateComplete;
    setTimeout(()=>{
      this.maxnumber = false;
      this.requestUpdate() ;
    },5100)
    
  }
  async passeroffn(e)
  {
    if (e.detail.leader ==true) {
      // joingame() ; 
      var lcd = e.detail.lobbycode ; 
      document.getElementById("joinlink-input").value = lcd ; 
      joingamebuttonclick() ; 
    }
    else{
      await setTimeout(() => {
        
      }, 300);
     
    var lcd = e.detail.lobbycode ; 
    document.getElementById("joinlink-input").value = lcd ; 
    joingamebuttonclick() ; 
  }
  }
  async leavinglobby(e)
  { 
    this.gameStarted = false ; 
    this.polpo = true ; 
    this.dataholdertemp = e.detail ; 
    this.requestUpdate() ; 
  }
  async updated(changedProperties){
    if (this.polpo) {
      await this.updateComplete;
      this.polpo =  false  ; 
      window.dispatchEvent(new CustomEvent("passeroffn",{detail:this.dataholdertemp})) ;   
    }
  }
  closeg()
  {
    this.topten = false ; 
    this.requestUpdate()
  }
  async updateit(event) {
    this.topten = true;
    await this.requestUpdate()
    window.dispatchEvent(new CustomEvent("updatetop10",{detail:event.detail})) ;
  }
  async nocorrectcode() {
    this.nocorrectcodevar = true;
    
      this.requestUpdate()
      await this.updateComplete;
      
      setTimeout(()=>{ 
        const conectfailnocode = document.getElementById('conectfail-nocode');
        conectfailnocode.style.display = 'block';
      // after 1.5 seconds, make the element disappear smoothly
      setTimeout(() => {
        conectfailnocode.style.opacity = '0';
        conectfailnocode.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          // reset the element's styles
          conectfailnocode.style.display = 'none';
          conectfailnocode.style.opacity = '1';
          conectfailnocode.style.transition = '';
        }, 500);
      }, 500);}, 400);
      this.nocorrectcodevar = false;


  }
 async  incorrectcode() {
    this.incorrectcodevar = true;
    setTimeout(() => {
      this.incorrectcodevar = false;
      this.requestUpdate()
    }, 3000);
  }
  handleGameStartSelf() {
    this.gameStarted = true;

    this.requestUpdate(); // Update the component to re-render with the new state
  }
  render() {
    return html`
<header-non ></header-non>
<main>


  ${ifDefined(this.topten ? html`<topten-non></topten-non>` : html``)}



    ${ifDefined(!this.nocorrectcodevar ?
      ifDefined(this.incorrectcodevar ?
        html`
    <conectfail-non></conectfail-non>
    <colap-non></colap-non>`
        :
        ifDefined(this.maxnumber ? html`<maxnum-non></maxnum-non><colap-non></colap-non>` : 
        ifDefined(this.pliswaitval? html`<plijwait-non></plijwait-non><colap-non></colap-non>`:
        (this.gameStarted ?
          html`<gamesleftpanel-non></gamesleftpanel-non><board-non></board-non>` :
          html`<colap-non></colap-non>`))))
      :
      html`<conectfail-nocode></conectfail-nocode><colap-non></colap-non>`
    )}

   
</main>
`;
  }
}
customElements.define('wholesite-bd', Wholesite);

  
  
  
  































































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






// <!-- ${ifDefined(this.gameStarted ?
//   html`<gamesleftpanel-non></gamesleftpanel-non>` :
//   html`<colap-non></colap-non>`)} -->