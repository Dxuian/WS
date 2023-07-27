import {LitElement, html ,css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ifDefined,unsafeHTML } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export default  class Gamesleftpanel extends LitElement {
    
constructor(){
    super()
    this.currlobbycode = this.getcokkie()
    this.peopleinfo = []
    this.leader = false ; 
    this.delaytimer = false ; 
    this.timerdelayinms ; 
    this.modtimerval = false ; 
    this.newtimerforgame ; 
    this.selfname ; 
    this.removetimer=true ; 
    this.delayworker  ;
    this.ssidfromboardval ; 
    
  }
createRenderRoot() {
return this;
}
  connectedCallback() {
    super.connectedCallback();
    // Add event listener when component is connected to the DOM
    window.addEventListener('playerjoined', this.handlePlayerJoinedEvent.bind(this));
    window.addEventListener('leaderfound', this.handleleaderjoindorchange.bind(this));
    window.addEventListener('SomeoneHasJoined', this.SomeoneHasJoined.bind(this));
    window.addEventListener('playerLeftEvent', this.playerLeftEvent.bind(this));
    window.addEventListener('wpmaccupdate', this.wpmaccupdateevent.bind(this));
    window.addEventListener('preparedelaytimer', this.preparedelaytimer.bind(this));
    window.addEventListener('timerstarted', this.modtimer.bind(this));
    window.addEventListener('ssidfromboard', this.ssidfromboard.bind(this));
    window.addEventListener('meinfo', this.ssidfromboard.bind(this));
    window.addEventListener('namehasbeenupdated', this.namehasbeenupdated.bind(this));
    window.addEventListener('tellmenewnamessssss', this.nameupdatesendersender.bind(this));
    window.addEventListener('restettogames', this.restettogames.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove event listener when component is removed from the DOM
    window.removeEventListener('leaderfound',  this.handleleaderjoindorchange.bind(this));
    window.removeEventListener('playerjoined', this.handlePlayerJoinedEvent.bind(this));
    window.removeEventListener('SomeoneHasJoined', this.SomeoneHasJoined.bind(this));
    window.removeEventListener('playerLeftEvent', this.playerLeftEvent.bind(this));
    window.removeEventListener('wpmaccupdate', this.wpmaccupdateevent.bind(this));
    window.removeEventListener('preparedelaytimer', this.preparedelaytimer.bind(this));
    window.removeEventListener('timerstarted', this.modtimer.bind(this));
    window.removeEventListener('ssidfromboard', this.ssidfromboard.bind(this));
    window.removeEventListener('meinfo', this.ssidfromboard.bind(this));
    window.removeEventListener('namehasbeenupdated', this.namehasbeenupdated.bind(this));
    window.removeEventListener('tellmenewnamessssss', this.nameupdatesendersender.bind(this));
    window.removeEventListener('restettogames', this.restettogames.bind(this));
  }
  restettogames()
  {
    window.dispatchEvent(new CustomEvent("lobicode",{detail:{lobbycode:this.currlobbycode,leader:this.leader}})) ; 
  }
  nameupdatesendersender()
  {
   if (!this.delaytimer && !this.modtimerval)   {
    this.selfname = document.getElementById("selfnamerplsno").value ; 
    window.dispatchEvent(new CustomEvent(`namechangesssssssss`,{detail:{ssid:this.ssidfromboardval,name:document.getElementById("selfnamerplsno").value}}))
   }
  }
  async namehasbeenupdated(e)
  {
      var ssid = e.detail.ssid , name= e.detail.name ;
      for (const iterator of this.peopleinfo) {
       if (iterator.ssid==ssid) {
          iterator.nameofperson = name ; 
       }
     }
      await this.requestUpdate();
      if (this.selfname) {
        document.getElementById("selfnamerplsno").value = this.selfname ; 
      }  
  }
  ssidfromboard(e)
  {
    this.ssidfromboardval = e.detail ; 
    this.requestUpdate() ; 
  }
  async modtimer(e)
  {
    this.modtimerval = true ; 
    this.delaytimer = false ;
    this.newtimerforgame = e.detail.dnfinfo
   await this.requestUpdate() ; 
    this.timertaker()
  }
  async preparedelaytimer(e)
  {
    this.delaytimer = true ;
    this.timerdelayinms = e.detail.delay ; 
    this.delayworker = this.timerdelayinms ; 
   await  this.requestUpdate() ; 
   this.timertaker()
  }
 
  async timertaker()
  {
    (async function () {
      var unnatElement = document.getElementsByClassName('countdown')[0].children[0];
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
  
  wpmaccupdateevent(e)
  {
    var  score = []  ; 
   
   var  wpmaccarr = e.detail
   if (!wpmaccarr) {
    return  ; 
   }
    // var position= [] ; 
    // const wpmWeight = 0.6;
    //   const accuracyWeight = 0.4;
    
    // for (let index = 0; index < wpmaccarr.length; index++) {
    //   const element = wpmaccarr[index];
    //   ((this.peopleinfo)[index]).wpm = element.wpm[0] ; 
    //   ((this.peopleinfo)[index]).accuracy = element.accuracy[0] ; 
    //   const overallScore = (element.wpm * wpmWeight) + (element.accuracy * accuracyWeight);
    //   score.push(overallScore) ; 
    // }
    // const sortedScores = score.slice().sort((a, b) => b - a);
    // const rankMapping = {};
    // sortedScores.forEach((score, index) => {
    //   const rank = index + 1;
    //   rankMapping[score] = rank;
    // });
    // const ranks = score.map((score) => rankMapping[score]);
    
    for (let index = 0; index < this.peopleinfo.length; index++) {
      // const element = ranks[index];
      if (Array.isArray(wpmaccarr[index].accuracy)) {
        (this.peopleinfo)[index].accuracy = wpmaccarr[index].accuracy[0] ;
        (this.peopleinfo)[index].wpm = wpmaccarr[index].wpm[0] ;
      }
      else{
        (this.peopleinfo)[index].accuracy = wpmaccarr[index].accuracy ;
      (this.peopleinfo)[index].wpm = wpmaccarr[index].wpm ; 
      }
    }
    this.requestUpdate()
  }
  async playerLeftEvent(event)
  {
    for (const iterator of this.peopleinfo) {
      if (iterator.ssid==event.detail.ssid) {
        x = iterator
        this.peopleinfo.splice((this.peopleinfo.indexOf(x)),1)
      }
    }
    await  this.requestUpdate() ; 
    window.dispatchEvent(new CustomEvent("updatemeinfoagainplease",{detail:this.ssidfromboardval})) ; 
     
  }
  SomeoneHasJoined(event)
  {
   
    this.peopleinfo.push({nameofperson:event.detail.name , wpm:"n/a" , accuracy:"n/a" ,ssid:event.detail.ssid})
    this.requestUpdate() ; 
  }
  handlePlayerJoinedEvent(event) {

    var x = event.detail;
    if (!(Array.isArray(x)))
    {
      this.peopleinfo.push({nameofperson:x.name , wpm:x.wpm , accuracy:"n/a" , ssid:x.ssid})
    }
    else{
    for (const iterator of x) {
      this.peopleinfo.push({nameofperson:iterator.stuff.name , wpm:"n/a", accuracy:"n/a", ssid:iterator.ssid})
    }}
    console.log(typeof this.peopleinfo)
    this.requestUpdate();
  }
  handleleaderjoindorchange(event)
  {
    this.leader=true ; 
    this.requestUpdate();
  }
render() {    

return html`
<div class="flex md:inline flex-col">
${ifDefined(this.delaytimer ?  html `
<div id="coverallandstarts" class="md:float-right  order-last  !p-2.5 md:mr-16 bg-emerald-900	m-4 rounded text-emerald-300">
<span class="text-xl font-extrabold">  Prepare to type in:  </span>
<br>
<div class="flex justify-center items-center ">
  <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div class="flex flex-col">
      <span class="countdown font-mono text-6xl">
      <span style="--value:${Math.floor(this.delayworker/1000)};"></span>
      </span>
      s
    </div>
  </div>
</div>
</div>
` :  html``)}
${ifDefined(this.modtimerval ? html`
<div class="float-end self-center my-3 relative right-[10%] md:static order-last block  mr-12  mt-24 font-extrabold p-3 float-end bg-emerald-900	 rounded-2xl text-emerald-300">
Time remaining: 
<br> 
<span class="countdown font-mono text-6xl">
  <span style="--value:${(this.newtimerforgame/1000)};"></span>
</span>
s
</div>















`:html``)}
<div
    id="gamestleftpanel"
    class=" 
    inline-flex bg-cyan-400  w-[90vw] md:w-auto ml-4 flex-col float-left md:!ml-4 sm:max-w-full rounded                                      
    mt-2 mb-4  md:mt-0 md:mb-0                                                                           "
    >
    <div class="bg-sky-500 rounded-t-lg text-left">
        <span class="text-2xl font-black text-left p-1"> In lobby:</span>
       ${ifDefined(((this.leader && !this.delaytimer ) && (this.leader && !this.modtimerval)) ? html` <button onclick="startgame()" id="strtgame" class="bg-danger  text-left font-black hover:scale-110 transition-all p-1 m-1 text-xl rounded-2">Start</button>` :
       html``)}
        <br />
        ${ifDefined(this.peopleinfo && this.ssidfromboardval ? (()=>{
            var temp = "" ; 
            for (let index = 0; index < this.peopleinfo.length; index++) {
            const element = this.peopleinfo[index];
            if (element.ssid!=this.ssidfromboardval) {
              temp+= `<div class="text-left text-xl p-2 m-1 font-black bg-danger rounded-4">
            <h1 class="inline-flex">${element.nameofperson}</h1>
            <br>
            Typing speed: <span id="typespd" class="!text-md">${(Number(element.wpm) ? Math.round(element.wpm) : element.wpm)} ${ifDefined(element.wpm=="n/a" ?  ``:  `wpm`)}</span>
            <br>
            accuracy: <span id="place">${(Number(element.accuracy) ? Math.round(element.accuracy) : element.accuracy)}${ifDefined(element.accuracy=="n/a" ?  ``:  `%`)}</span>
        </div>`
            }
            else{
              temp+= `<div class="text-left text-xl p-2 m-1 font-black bg-danger rounded-4">
              <div id="pleasedonttriiger"   class="relative z-0">

              <form >
              <button onclick="nameplkiok() " class=" z-99 float-right " type="button">
    <span   id="heraldofchange" class="material-symbols-outlined bg-orange-950 rounded-5 !grid !w-10 !place-content-center !text-red-900 !pointer-events-none">
        edit
    </span>
    </button>
              
    <input autocomplete="off" onfocus="toggletick()" onblur="toggletick()" type="text" id="selfnamerplsno" class="!block text-left !py-2.5 !px-0 !w-full !text-sm !text-gray-900 !bg-transparent !border-0 !border-b-4 !border-red-500 !appearance-none focus:outline-none placeholder:text-red-900  placeholder:text-left !focus:border-red-600 !peer" placeholder="Enter name here"/>
    
   
    </form>
    
</div>
            <div class="text-left">
            Typing speed: <span id="typespd" class="!text-md">${(Number(element.wpm) ? Math.round(element.wpm) : element.wpm)} ${ifDefined(element.accuracy=="n/a"?  ``:  `wpm`)}</span> 
            <br>
            accuracy: <span id="place">${(Number(element.accuracy) ? Math.round(element.accuracy) : element.accuracy)}${ifDefined(element.accuracy=="n/a"?  `` :  `%`)}</span>
        </div>
        </div>`
            }
         
        }
        var varys = temp.replace(/\\/g, ''); 
        console.log(varys)
        return unsafeHTML(varys)})() :html``)}
    </div>
    <div id="gamestart" class=" bg-cyan-400 rounded p-2">
        <div class="my-1 font-extrabold text-2xl text-left text-yellow-900 bg-amber-500 rounded p-2">
            Share link:
            <button onclick="copyToClipboard('sharegamestart')" class="bg-danger p-1 hover:scale-110 transition-all font-extrabold text-left  rounded-2
            bg-rose-900 text-pink-400 
            rounded-3  mb-2 text-xl  
             shadow-md shadow-rose-500/50 
              hover:shadow-lg hover:shadow-rose-500/90 focus:opacity-[0.85] 
              focus:shadow-none active:opacity-[0.85] active:shadow-none 
              disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Copy</button>
            <br />
            <input
                id="sharegamestart"
                class="bg-transparent  !font-semibold rounded-3 text-orange-900 relative right-0.5 
                 border-4 border-red-500 text-xl w-auto text-ellipsis text-left  "
                value=${this.currlobbycode}
                onclick="copyToClipboard('sharegamestart')"
                readOnly=""
                />
        </div>
        <div class="text-left text-2xl p-2 font-extrabold  bg-violet-900 text-violet-300 rounded ">
            Leave game:
            <br />
            <button
                id="leavegame"
                class=" p-1 text-left m-1 
                bg-rose-900 text-pink-400 
                rounded-3  mb-2 text-xl  
                 shadow-md shadow-rose-500/50 hover:scale-110 transition-all 
                  hover:shadow-lg hover:shadow-rose-500/90 focus:opacity-[0.85] 
                  focus:shadow-none active:opacity-[0.85] active:shadow-none 
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                "
                onclick="disButton('leavegame');diconect();enableButton('leavegame');"
                >
            Leave
            </button>
        </div>
    </div>
    </div>  
</div>
`;
}
getcokkie(){
    var cookie = String((document.cookie)).split(";"), cok = [];
        for (let x = 0; x < cookie.length; x++) {
        cok.unshift(cookie[x]);
        }
        for (let x = 0; x < cookie.length; x++) {
         y = decodeURIComponent(cok[x]);
         cok[x] = y;
        }
        if (cok.length>=3)
        {
          for (const iterator of cok) {
            if (iterator.trim().startsWith("globallobbycode")) {
              return iterator.trim().substr(16).trim()
            }
          }
        }
        else{
          for (const iterator of cok) {
            if (iterator.trim().startsWith("lobbycode")) {
              return iterator.trim().substring(10).trim() ; 
            }
          }
        }
        
      }
jsx(){
    
}
}
customElements.define('gamesleftpanel-non', Gamesleftpanel);



// class Insideboxes extends Gamestleftpanel {
//   createRenderRoot() {
//     return this;
//   } 
//   constructor()
//   {
//     super(); 
//   }
  
//   render() {
//     return html`
   
   
     
//     `;
//   }
// }
// customElements.define('insideboxes-non', Insideboxes);


