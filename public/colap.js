import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class Colap extends LitElement {


constructor(){
  super()
  this.lobbycode = this.getcok()
}



createRenderRoot() {
  return this;
}
render() {
  return html`
    
    <div id="colap" class="row mb-4 md:!mb-0 md:!px-40 px-4 opacity-100">
    <div id="joinshare" class="
    col-sm-6  bg-yellow-500 p-4 md:!p-0 xs:rounded-2xl m-1 relative right-1      
    md:static                                              md:!m-0 rounded-3xl md:!rounded-none md:!rounded-l-3xl    ">
      <div
        id="sharelink"
        class="
        sharelink col bg-orange-500  text-orange-900  md:w-1/2 md:py-3 p-4 md:p-0 md:pl-5 md:pr-2 md:m-3 rounded-5 relative md:left-32 box-border overflow-hidden
                ">
        <div class="sharelink-header font-bold ">
          <h2 class="text-left font-bold text-2xl m-1">Share Link:</h2>
          <p class="m-1 text-left">
            Share this link with your friends to invite them to play the game!
          </p>
        </div>
        <div class="sharelink-body  w-auto ">
          <input
            id="share-link-input"
            class="bg-transparent rounded-3 text-orange-700 font-thin border-4 border-red-500	 relative right-6 text-xl w-auto text-ellipsis text-left "
            Value="${this.lobbycode}"
            readOnly=""/>
          <button
            class="bg-rose-900 text-pink-400 hover:scale-110 transition-all font-extrabold rounded-3 text-2xl p-2 my-2 float-start shadow-md shadow-rose-500/50  hover:shadow-lg hover:shadow-rose-500/90 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onclick="copyToClipboard('share-link-input')">
            Copy
          </button>
          <button id="justforassigningid" 
            class="  bg-purple-900  font-extrabold text-blue-400   hover:scale-110 transition-all rounded-3 text-2xl p-2 my-2  ml-2 float-start shadow-md shadow-purple-500/50 hover:shadow-lg hover:shadow-purple-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
          onclick="joingame();disButton('justforassigningid');">Start game
          </button>
        </div>
        <div class="relative z-0">
    

</div>
      </div>
      <div
        id="joingame"
        class="joingame col bg-violet-500 md:w-1/2  !pb-0 p-5 m-2 !pr-0 rounded-5 md:relative md:left-32 box-border"
      >
        <div class="joingame-header font-bold	relative  right-8 bottom-8">
          <h2 class="text-left font-bold text-2xl m-1">Join game:</h2>
          <p class="m-1 text-left">
            To join a game, please paste the game link into the box below and
            click the "Join Game" button.
          </p>
        </div>
        <div class="joingame-body relative right-8 w-max bottom-8">
          <input
            id="joinlink-input"
            type="text"
            class="autofill:bg-yellow-200 bg-transparent  rounded-3 text-violet-700 font-thin border-4 border-red-500	  text-xl w-auto text-ellipsis	 text-left relative "
            defaultValue=""
            placeholder="enter a link here"
          />
          <br />
          <button
            id="paste-btn"
            class="bg-green-400    font-extrabold text-green-900 hover:scale-110 transition-all rounded-3 text-2xl px-1 p-2 mt-2 float-start shadow-md shadow-lime-500/50  hover:shadow-lg hover:shadow-lime-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onclick="copyFromClipboard('joinlink-input')"
          >
            Paste
          </button>
          <button
            id="join-btn"
            class="  rounded-3 text-2xl px-1 hover:scale-110 transition-all p-2 mt-2 bg-red-500 font-extrabold text-red-900 shadow-md shadow-red-500/50  hover:shadow-lg hover:shadow-red-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onclick="joingamebuttonclick();"
          >
            Join game
          </button>
        </div>
      </div>
    </div>
    <div id="startertext" class="    col-sm-6 rounded-3xl bg-yellow-500 mt-4 md:!mt-0 p-3 md:!rounded-none md:!p-0 md:!rounded-r-3xl   ">
      <div class="my-auto  md:relative md:top-20 md:right-12 text-2xl font-black   ">
        KeyChamp is a multiplayer typing speed competition game where you can
        play with your friends to find out who is the fastest <br />
        or set try to set a personal record and compare with <br />
         players from around the world to see who can type the fastest and most accurately. <br /> 
         Participate in real-time typing races to climb the leaderboard. <br />
        Join the KeyChamp community and become the ultimate <br />
        typing champion!
        <br />
      </div>
    </div>
  </div>
    `;
}
getcok(){
  var cookie = String((document.cookie)).split(";"), cok = [];
      for (let x = 0; x < cookie.length; x++) {
      cok.unshift(cookie[x]);
      }
      for (let x = 0; x < cookie.length; x++) {
       y = decodeURIComponent(cok[x]);
       cok[x] = y;
      }
      for (const iterator of cok) {
        if (iterator.trim().startsWith("lobbycode")) {
          return iterator.trim().substring(10).trim() ; 
        }
      }
     return ;
    }
}
customElements.define('colap-non', Colap);