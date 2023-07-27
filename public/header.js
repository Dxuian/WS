import {LitElement, html ,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
//fix the postion of the globalwinners ; 
class Heade extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
<header>
<div>
<div class="center font-[1000]  md:!pt-2 md:!p-5  mb-8 pt-5 md:!text-8xl  text-2xl md:!text-center font-black md:!relative md:!left-40">
<div class="text-6xl font-[1000] md:text-8xl md:inline">KeyChamp</div>
<sup class="text-sm float-right md:!float-none md:static relative right-4 ">v1</sup>
    <span class="	text-xl relative top-4">a realtime competitve typing platform</span>
    <button class="hover:scale-110 float-right md:float-none md:!static     
            
    relative  bottom-32 right-4                                transition-all"><i class="ri-trophy-fill md:relative md:bottom-8 " onclick="diffsend()"></i>
    </button>
</div>
<div id="container" class=" md:inline-flex  !z-50 left-1 float-left md:!float-right fixed md:!left-10 top-0 flex-row !pb-0.5 !pt-0.5 !pr-3  p-2  flex-nowrap bg-[#1a1a1a] transition-all gap-2 rounded-b-2xl    "> <button title="Join discord server" class="hover:scale-150 transition-all"><a href="https://discord.gg/MCGh4EZUSj"><i id="discord-icon" class="ri-discord-fill text-purple-900  hover:text-purple-300 transition-all h2"></i></a></button> <button title="View github repo" class="hover:scale-150 transition-all"><a href="https://github.com/Dxuian"><i id="github-icon" class="ri-github-fill h2 text-white  hover:!text-black transition-all"></i></a></button> <button title="Copy email" class="hover:scale-125  text-2xl  h4 text-white  hover:!text-black transition-all" onclick="copyToClipboard('mail-icon')"><i id="mail-icon" class="fa-solid fa-envelope h2 md:relative md:top-2" style="color:mediumvioletred;"></i> </button></div>
</div>

   
   
    
</header>
    `;
  }
}
customElements.define('header-non', Heade);

