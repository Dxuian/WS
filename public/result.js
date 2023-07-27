import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ifDefined, unsafeHTML } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export default class Resultpanel extends LitElement {
  constructor() {
    super();
    this.var = false
    this.arr;
    this.arr2;
    this.ssid;
    this.listof;
    this.truthy;


  }
  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("resultsarehere", this.maker.bind(this));
    window.addEventListener("rematchhappening", this.rematchhappening.bind(this));
    window.addEventListener("lobicode", this.lobicode.bind(this));
  }
  DisconnectedCallback() {
    super.DisconnectedCallback()
    window.removeEventListener("resultsarehere", this.maker.bind(this));
    window.removeEventListener("rematchhappening", this.rematchhappening.bind(this));
    window.removeEventListener("lobicode", this.lobicode.bind(this));

  }



  async lobicode(e) {
    diconect(e.detail);
  }
  maker(e) {
    this.arr = e.detail.peopleinfo;
    this.ssid = e.detail.self
    this.arr2 = this.arr.sort((a, b) => b.scores - a.scores);
    this.var = true;
    this.rematch = false;
    this.time;
    this.namelist;
    this.requestUpdate();
  }
  async rematchhappening(e) {
    this.listof = e.detail;
    this.namelist = [];
    var time;
    for (const iterator of this.listof.name) {
      this.namelist.push(iterator);
    }
    this.rematch = true;
    if (this.listof.time) {
      this.time = this.listof.time / 1000
      this.truthy = true
    }
    await this.requestUpdate();
    if (e.detail.ssid.includes(this.ssid)) {
      await this.updateComplete;
      document.getElementById("todisable").disabled = true;
    }
    if (this.truthy) {
      this.timer();
    }
  }

  timer() {
    (async function () {
      var unnatElement = document.getElementById("u2345");
      if (unnatElement) {
        var countdownValue = parseInt(unnatElement.style.getPropertyValue('--value'));
        var countdownInterval = setInterval(function () {
          countdownValue--;
          if (countdownValue < 0) {
            clearInterval(countdownInterval);
            return;
          }
          unnatElement.style.setProperty('--value', countdownValue);
        }, 1000);
      }
    })();
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return html` 
       
  
  ${ifDefined(this.var ?
      html`<dialog id="my_modal_4" class="modal" open="">
       <div id="higher" class="container-xxl py-2 rounded-3 md:!overflow-hidden md:!static absolute !mx-1           
       overflow-scroll w-[97vw] mx-auto left-0 right-0">
       <h1 id="headingleft2" class="mb-4 pt-2 colorizedby px-3 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
             Results 
            </h1>
       <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>Rank</th>
          <th>Time taken</th>
        </tr>
      </thead>
      <tbody>
        ${this.arr2.map((x) => {
        return html`<tr>
          <th>${(this.ssid == x.ssid) ? html`You(${x.nameofperson})` : html`${x.nameofperson}`}</th>
          <td>${Math.round(x.scores)}</td>
          <td>${this.arr2.indexOf(x) + 1}</td>
          <td>${(Number(x.stats.time) / 1000).toFixed(2)}s</td>
        </tr>`
      })}
      </tbody>
    </table>
    <button id="leaveroflobbies" onclick="diconect()" class="middle  hover:scale-110 transition-all none center rounded-lg bg-violet-500 
  float-right py-3 px-6 font-sans text-xs font-bold !text-violet-900 uppercase  mx-2 my-2  shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
      Leave lobby
</button>

${ifDefined(this.rematch ? html`
<div>
<button id="todisable"  onclick="rematch()" class="middle none float-right center rounded-lg bg-rose-600 mx-2 my-2 py-3 px-6 
font-sans text-xs font-bold uppercase  shadow-md shadow-pink-500/20 !text-rose-900
 transition-all  hover:scale-110 hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]
  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " data-ripple-light="false"   data-tooltip-target="tooltip">
  Rematch 
  ${ifDefined(this.listof.time ? html` 
  <span  class="countdown">
        <span id="u2345" style="--value:${this.time};"></span>
  </span>`
        : html``)}
  </button>
  <div data-tooltip="tooltip" class="
  static md:absolute z-50 md:!bg-black min-w-max rounded-lg !bg-[#ba55d3] md:!text-white !text-violet-900 py-1.5 break-words right-[23%]    px-3  py-1.5 font-sans text-xs md:!text-sm font-bold text-white focus:outline-none
  ">
  ${this.namelist.map((x,index) => {
          return html`${
            index+1==this.namelist.length || this.namelist.length==1 ?
              html`${x}` : html`${x} , `
            
            }`
        })} 
${this.namelist.length == 1 ?
          html`is requesting rematch` :
          html`are down for rematch`} 
</div>
</div>
` : html`
 <button   id="todisable2" onclick="rematch()" class="middle none hover:scale-110 transition-all  float-right center rounded-lg bg-rose-600 mx-2 my-2 py-3 px-6 font-sans text-xs font-bold uppercase  shadow-md shadow-pink-500/20 !text-rose-900 hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="false">
  Rematch
  </button>
`)}




  </div>
       </div>
  </dialog>`: html``)}`

  }
}
customElements.define('resultboard-non', Resultpanel);






