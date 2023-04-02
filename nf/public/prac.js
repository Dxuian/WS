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
        // sendmsg({info:playertype}, nottoself, wsh) at line 72
    if(whathappen=="playertype"){}
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
const joinBtn = document.getElementById('join-btn');
const joinShareDiv = document.getElementById('joinshare');
const starterTextDiv = document.getElementById('startertext');
const colap = document.getElementById("colap");
joinBtn.addEventListener('click', () => {
    joinShareDiv.classList.add('collapsed');
    colap.classList.remove("px-40")
    colap.classList.add("w-50")
    joinShareDiv.classList.remove("left-32")
    starterTextDiv.classList.add('collapsed');
});


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