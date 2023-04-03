var socket;
var cookie  =  String((document.cookie)).split(";");
var cok = [] ;  
for (let x = 0; x <cookie.length; x++) {
    cok.unshift(cookie[x]);
    
}
for (let x = 0; x < cookie.length; x++) {

    y=decodeURIComponent(cok[x]) ; 
    cok[x] =y ; 
}
console.log(cookie);
var lobbycode = cok[1].substring(10)
var wscode = "ws://localhost:5000/ws/"+lobbycode , connectfail ; 

if (wscode != null && lobbycode != null) {
    try {
        var socket = new WebSocket(wscode);
    } catch (error) {
        console.log(error)
    }
}
else
{
    connectfail =true
}
socket.onmessage =  (message) => {
    var msgrec = JSON.parse(message);
    var whathappen = msgrec.info;



    // sendmsg({info:"timerstart"}, toall, wsh) at line 56    
    if (whathappen == "timerstart") {


    }
    else if (whathappen==""){

    }
    else if (whathappen=="playerjoin")
    {
        const gamestleftpanel = document.querySelector("#gamestleftpanel");

 // example place value
const html = `
    <div class="text-left text-xl p-2 m-1 font-black bg-danger rounded-4">
        <h1 class="inline-flex">placeholder_name</h1>
        <div class="float-end text-2xl">icon</div>
        Typing speed: <span id="typespd">${speed}</span> wpm
        position: <span id="place">${place}</span>
    </div>
`;

gamestleftpanel.insertAdjacentHTML("beforeend", html);

    }
        // sendmsg({info:playertype}, nottoself, wsh) at line 72
    else if(whathappen=="playertype"){}
    // sendmsg({info:"maxnumber"}, toself ,null) at line 70
    else if (whathappen == "maxnumber") {
        showui()
    }
    // sendmsg({info:calculatewinner(message)}, toall, wsh) at line 75
    else if (whathappen.includes("is the winner")) { }
    // sendmsg({ info:"clrall", timerstartnewmatch:x }, toall, wsh) at line 76
    else if (whathappen == "clrall") {
        if (!msgrec.timerstartnewmatch){
            socket.close() ; 
        }
        else{
            restart() ; 
        }
    }
    // sendmsg(removeplayer, toall, null) at line 42
    else if(whathappen=="removeplayer")
    {
        
    }
}

function copyToClipboard(id) {
  // Get the text field
  var copyText = document.getElementById(id);

  // Select the text field
  copyText.innerHTML;
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}
function copyFromClipboard(id) {
    ele = document.getElementById(id);
    navigator.clipboard.readText()
  .then((text) => {
    ele.value = text;
    console.log("Text read from clipboard: ", text);
  })
  .catch((err) => {
    
    console.error("Error reading text from clipboard: ", err);
  });

    
}
function joingame(lc) {
    socket.close() ;
    alert(lc)
    socket = WebSocket(lc)
}
// const join = document.getElementById("join-btn")
// join.onclick = () => {
//     const element = document.getElementById('colap');
// element.style.transition = 'opacity 1s';
// element.style.opacity = 0;
// setTimeout(() => {
//     element.classList.toggle("absolute")
//   element.parentNode.removeChild(element)
//   document.getElementById("gamestart").classList.toggle("hidden");
// }, 1000);

// }





// ReactDOM.render(bigboard, document.getElementById('root'));

// <!-- <div class="share link">
        
// </div>
// <div class="join">
    
// </div>
// <div class="start">

// </div>
// <div class="keyboards">

// </div>

// <script src="\public\prac.js"></script> -->
//{ file: "prac.html", lobbycode: randlobbycode , wscode: randlobbycode}
// import { bigboard } from "./public/reactprac.js";
// if (bigboard) {
//     console.log(bigboard);
    
// }