import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
export default class Topten extends LitElement {
    constructor() {
      super()
      this.listerforstuff  ; 
      
    }
    connectedCallback() {
      super.connectedCallback();
      // Add event listener when component is connected to the DOM
      window.addEventListener('updatetop10', this.topten.bind(this));
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      // Remove event listener when component is removed from the DOM
      window.removeEventListener('updatetop10', this.topten.bind(this));
    }
    topten(event)
    {
      this.listerforstuff = event.detail ; 
      this.requestUpdate() ; 
    }
    createRenderRoot() {
      return this;
    }
    render() {
      return html`
  
        <dialog id="my_modal_4" class="modal" open="">
        <div id="highestofall" class="container-xxl rounded-3 absolute !mx-auto           
        overflow-scroll md:!overflow-hidden w-[97vw] md:!w-full left-0  right-0 ">
        <button type="button" class="float-end p-3" onclick="closerofg()" disabled="" aria-label="Close"><i class="fa fa-close hover:!text-fuchsia-500	 hover:scale-110 transition-all " onclick="closerofg()" style="font-size:48px;color: #eb72db;"></i></button>          <h1 id="headingleft" class="mb-4 pt-2 colorizedby px-3 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Top KeyChamp players
          </h1>
          <p  class="px-3 colorizedby text-left font-black ">The fastest typists we've recorded !</p>
          <div class="relative p-3 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 rounded-3xl !font-extrabold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 rounded-tl-2xl py-2">
                    Player name
                  </th>
                  <th scope="col" class="px-6 py-2">
                    Average wpm
                  </th>
                  <th scope="col" class="px-6 py-2">
                    Average accuracy
                  </th>
                  <th scope="col" class="px-6 py-2">
                    Peak wpm
                  </th>
                  <th scope="col" class="px-6  rounded-tr-2xl py-2">
                    Peak accuracy
                  </th>
                </tr>
              </thead>
              <tbody class="!font-extrabold">
  
      ${
        this.listerforstuff.map((x) => {
        var bg, font ,fx , whole=  "", prepender=  "", appender =  ""; 
        
      if (this.listerforstuff.indexOf(x)==0) {
        var bg = "bg-gold"
        fx = "font-effect-fire" ; 
        font = "!text-white"
      }
      else if  (this.listerforstuff.indexOf(x)==1)
      {
        var bg = "bg-silver"
        font = "!text-[#c0c0c0]"
        // fx = "font-effect-fire" ; 
      }
      else if(this.listerforstuff.indexOf(x)==2)
      {
        var bg = "bg-bronze"
        font = "!text-[#f4a460]"
  
      }
      else if(this.listerforstuff.indexOf(x)+1==this.listerforstuff.length)
      {
        whole = "!rounded-3xl !border-b-0"
        appender = "!rounded-br-3xl"
        prepender = "!rounded-bl-3xl"
        bg = "!bg-purple-950"
        font = "!text-white"
  
      }
      
      else{
        var bg = "!bg-purple-950"
        font = "!text-white"
      }
      if (fx!= "font-effect-fire") {
        fx=""
      }

      return html ` <tr class="${bg} border-b ${" " +fx +" " + whole +" " +  font +" " } dark:bg-gray-800 dark:border-gray-700     ">
                  <th scope="row" class="px-6 py-2.5 ${ " "+prepender+" " }  font-extrabold whitespace-nowrap">
                    ${x.name}
                  </th>
                  <td class="px-6 py-2.5">
                    ${Number(x.avgwpm).toFixed(2)}
                  </td>
                  <td class="px-6 py-2.5">
                    ${Number(x.avgacc).toFixed(2)}
                  </td>
                  <td class="px-6 py-2.5">
                    ${Number(x.peakwpm).toFixed(2)}
                  </td>
                  <td class="px-6 py-2.5 ${" "+appender+" "}">
                    ${Number(x.score).toFixed(2)}
                  </td>
                </tr>` }
      )}
      </tbody>
            </table>
          </div>
        </div>
</dialog>
        
      `;
    }
  }
customElements.define('topten-non', Topten);













  
  