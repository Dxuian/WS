// import { error } from "console";
const API_BASE_URL = "ws://keychamp.azurewebsites.net/ws/" ; 
const HTTPS_API_BASE_URL = "https://keychamp.azurewebsites.net/retrieve" ;
//"https://keychamp.onrender.com/retreive"
//
function disButton(e) {
  var button = document.getElementById(e);
  button.disabled = true;
}

function enableButton(e) {
  var button = document.getElementById(e);
  button.removeAttribute("disabled");
}





var socket, holder , temphold,joinornot;
var cookie  =  String((document.cookie)).split(";");
var cok = [] ;  
var joinbt = document.querySelector("#join-btn");
var leavebt = document.querySelector("#leavegame");
var gamestleftpanel = document.querySelector("#gamestleftpanel");
var colap = document.querySelector("#colap");
var conectfail =  document.querySelector("#conectfail") ; 

//here
for (let x = 0; x <cookie.length; x++) {
    cok.unshift(cookie[x]);
}
for (let x = 0; x < cookie.length; x++) {
    y=decodeURIComponent(cok[x]) ; 
    cok[x] =y ; 
}
console.log(cookie);
var lobbbbycode ;
for (const iterator of cok) {
  if (iterator.trim().startsWith("lobbycode")) {
    lobbbbycode =  iterator.trim().substring(10).trim() ; 
  }
}
//"wss://keychamp.onrender.com/ws/"
var wscode = API_BASE_URL+lobbbbycode , connectfail ; 
async function joingamebuttonclick() {
  disButton('joinlink-input') ; 
  await   joingame('joinlink-input');
  enableButton('joinlink-input') ; 
    // if (joinornot) {
    //   // colap.classList.remove("opacity-100")
    //   // colap.classList.add("opacity-0");
    //   // setTimeout(() => {
    //   //   colap.remove();
    //   //   document.querySelector(".main")[0].appendChild(gamestleftpanel);
    //   //   gamestleftpanel.classList.remove("opacity-0")
    //   //   gamestleftpanel.classList.add("opacity-100");
    //   // }, 1200);
    // }
    // else
    // {
    //   // colap.classList.remove("opacity-100")
    //   // colap.classList.add("opacity-0");
    //   // setTimeout(() => {
    //   //   colap.remove();
    //   //   document.querySelector(".main")[0].appendChild(gamestleftpanel);
    //   //   gamestleftpanel.classList.remove("opacity-0")
    //   //   gamestleftpanel.classList.remove("opacity-0")
    //   //   gamestleftpanel.classList.add("opacity-100");
    //   // }, 1200);
    // }
};  
var globallobbycode  ; 
async function joingame(lc) {
    lc==null ? after = lobbbbycode : after = document.querySelector("#"+lc).value
    globallobbycode = after ; 
    if (after.length<30 || after.length>40) {
      await window.dispatchEvent(noLobbyCodeEvent);
     
      return ; 
    }
    var nc = API_BASE_URL + after;
    console.log(`attempting to connect to  wscode : ${wscode}`) ; 
    console.log(`attempting to connect to after  : ${after}`) ; 
    console.log(`attempting to connect to nc : ${nc}`) ; 
    try {
      var handler = new WebSocket(nc);
    } catch (error) {
      window.dispatchEvent(socketErrorCaughtEvent);
      joinornot= false ; 
      console.log(error);
      return
    }
    joinornot =true ; 
    temphold = socket;
    socket = handler;
    socket.addEventListener('close', handleClose);
    await setTimeout(() => {
      //do nothing but wait 
    }, 1000);
    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', event => handleMessage(event.data));
    socket.addEventListener('error', handleError);
    console.log("ok it worked")
    if (!lc) {
      cookie = String((document.cookie)).split(";"), cok = [];
      for (let x = 0; x < cookie.length; x++) {
      cok.unshift(cookie[x]);
      }
      for (let x = 0; x < cookie.length; x++) {
       y = decodeURIComponent(cok[x]);
       cok[x] = y;
      }
      document.cookie =  `globallobbycode:${after}` ; 
   
     
    }
}
function chekckforgloballobbycode()
{
  var cookie = String((document.cookie)).split(";"), cok = [];
        for (let x = 0; x < cookie.length; x++) {
        cok.unshift(cookie[x]);
        }
        for (let x = 0; x < cookie.length; x++) {
         y = decodeURIComponent(cok[x]);
         cok[x] = y;
        }
        if (cok[0][3]=="c")
        {//globallobbycode
          cok.unshift( `globallobbycode: ${globallobbycode}`)
        }
        else
        {
          cok[0] = `globallobbycode: ${globallobbycode}` ; 
        }
        var tempstr ;
        for (const iterator of cok) {
          tempstr += `${iterator};`
        }
        document.cookie = tempstr.substr(9) ; 
}
function copyToClipboard(id) {
  // Get the text field
  var copyText = document.querySelector("#" + id);
 
if (id=='mail-icon') {
      navigator.clipboard.writeText("dxudevacc@gmail.com");
      return ; 
  }
  // Select the text field
  copyText.innerHTML;
  copyText.setSelectionRange(0, 99999); // For mobile devices
 
   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  console.log("Copied the text: " + copyText.value);
}
function copyFromClipboard(id) {
    ele = document.querySelector("#" + id);
    navigator.clipboard.readText()
  .then((text) => {
    ele.value = text;
    console.log("Text read from clipboard: ", text);
  })
  .catch((err) => {
    
    console.error("Error reading text from clipboard: ", err);
  });

    
}

function finishedER(params) {
  window.dispatchEvent(new CustomEvent("finishkrnacha")) ; 
}
function startgame() {
  disButton("strtgame")
  socket.send("start game")
  enableButton("strtgame")
}
async function handleMessage(message) {
  var msgrec = JSON.parse(message);
  var whathappen = msgrec.info;
  if(whathappen.startsWith("you have created a lobby"))
  {
    p = whathappen.substr(27) ; 
     x = (JSON.parse(p)).tempara ; 
     s = (JSON.parse(p)).ssid ; 
     x = {name:x[0].name,accuracy: "n/a" , wpm : "n/a",ssid:s}
    await window.dispatchEvent(gameStartSelfEvent);    
    await window.dispatchEvent(new CustomEvent('playerjoined', {detail: x}));
    window.dispatchEvent(leaderFoundEvent);
    await window.dispatchEvent(new CustomEvent('meinfo', {detail:s}))
  }
  else if (whathappen.startsWith("you have joined someone elses lobby")) {
    chekckforgloballobbycode()
     p = whathappen.substr(38)
     x = (JSON.parse(p)).tempara
    await window.dispatchEvent(gameStartSelfEvent);
      await window.dispatchEvent(new CustomEvent('playerjoined', {detail: x }));
      await window.dispatchEvent(new CustomEvent('meinfo', {detail:Object(x.slice(-1))[0].ssid}))

  }
  else if (whathappen.startsWith("playertype")){
    p = whathappen.substr(13) ; 
    window.dispatchEvent(new CustomEvent('playertype', { detail: p }));
  }
  else if(whathappen.startsWith("someone has joined", 0))
  {
    p = whathappen.substr(21)
    indetail = ((JSON.parse(p)).tempara)[0]
    indetail.ssid = ((JSON.parse(p))).ssid
    const SomeoneHasJoined = new CustomEvent('SomeoneHasJoined', { detail:indetail });
    window.dispatchEvent(SomeoneHasJoined); 
  }
  else if(whathappen.startsWith("newname"))
  {
    var p = whathappen.substr(10) ; 
    indetail = JSON.parse(p) ; 
    window.dispatchEvent(new CustomEvent("namehasbeenupdated",{detail:indetail})) ; 
  }
  else if(whathappen=="you are now the leader")
  {
    window.dispatchEvent(leaderFoundEvent);
  }
  if (whathappen.startsWith("timerstart")) {
    p = whathappen.substr(13)
    indetail = JSON.parse(p)
    window.dispatchEvent( new CustomEvent('timerstarted', { detail: indetail })) ;
    sender("begin tracking")
  }
  if (whathappen.startsWith("wpmupdate")) {
    p = whathappen.substr(12) ; 
    indetail = (JSON.parse(p)).wpmacc ; 
    window.dispatchEvent(new CustomEvent("wpmaccupdate" , {detail:indetail}))    
  }
  if(whathappen=="stoptypeingnow")
  {
    window.dispatchEvent( new CustomEvent('timerstopevent')) ;
  }
  else if (whathappen.startsWith("preparedelaytimer"))
  {
    p = whathappen.substr(20);
    indetail = JSON.parse(p) ; 
    window.dispatchEvent(new CustomEvent("preparedelaytimer",{detail:indetail})) ; 
  }
  else if (whathappen.startsWith("rematch happening"))
  {
    var p = whathappen.substr(20) ; 
    var indetail = JSON.parse(p) ; 
    window.dispatchEvent(new CustomEvent("rematchhappening",{detail:indetail})) ; 
  }
  else if (whathappen=="maxnumber") {
    window.dispatchEvent(new CustomEvent("maxnumberalert"));
  }
  else if (whathappen=="restettogames")
  {
    window.dispatchEvent(new CustomEvent("restettogames")) ; 
  }
  else if (whathappen.startsWith("finalresultscompiled")) {
    p = whathappen.substr(23) ; 
    indetail = JSON.parse(p) ; 
    window.dispatchEvent(new CustomEvent("finalresultscompiled",{detail:indetail}))
    
  }
  else if (whathappen == "clrall") {
    if (!msgrec.timerstartnewmatch){
      socket.close() ; 
    }
    else{
      restart() ; 
    }
  }
  else if (whathappen.startsWith("removeplayer")) {
    
    indetail = JSON.parse(whathappen.substr(15))
    window.dispatchEvent(new CustomEvent('playerLeftEvent', { detail: indetail }));
  }
  else if(whathappen.startsWith("plswait"))
  {
    window.dispatchEvent(new CustomEvent("pliswait")) ; 
  }
}
function handleOpen() {
    window.dispatchEvent(connectionSuccessEvent);
} 
x = 1
async function handleClose(event) {

    if (event.code === 3636  ) {
      if(x==1)
      {
        await window.dispatchEvent(wrongLobbyCodeEvent);
      joinornot = false ; 
      console.log("fake") ; 
      socket = holder ; 
      console.log("ok that closed!!!!");
      console.log("ws has been closed!!!");
      setTimeout(()=>{ 
        const conectfail = document.getElementById('conectfail');

        conectfail.style.display = 'block';
  
      // after 1.5 seconds, make the element disappear smoothly
      setTimeout(() => {
        conectfail.style.opacity = '0';
        conectfail.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          // reset the element's styles
          conectfail.style.display = 'none';
          conectfail.style.opacity = '1';
          conectfail.style.transition = '';
        }, 500);
      }, 1500);}, 1000);
      }
      
    }
    else if (event.code==3000){
      console.log("forcefully breaching the wrong lobbycode")
    }
    else if (event.code==2626)
    {
      window.dispatchEvent("plijwait") ; 
    }
    if (event.code==3001) {
      location.replace("public/404.html") ; 

    }
    //window.dispatchEvent(connectionClosedEvent);
}
function handleError(error) {
  window.dispatchEvent(socketErrorDetectedEvent);

}
(function(){window.addEventListener('offline', () => {console.log('Became offline')
window.dispatchEvent(connectionFailEvent);
});})()
const connectionFailEvent = new CustomEvent('connectionFail', { detail: '5678' });
const socketErrorDetectedEvent = new CustomEvent('socketErrorDetected', { detail: 'Connection lost' });
const socketErrorCaughtEvent = new CustomEvent('socketErrorCaught', { detail: 'Failed to reconnect' });
const connectionSuccessEvent = new CustomEvent('connectionSuccess', { detail: '1234' });
const connectionClosedEvent = new CustomEvent('connectionClosed', { detail: '3636' });
const wrongLobbyCodeEvent = new CustomEvent('wronglobbycode', {detail: {errorMessage: 'Invalid lobby code entered'}});
const noLobbyCodeEvent = new CustomEvent('NOonglobbycode', {detail:{errorMessage: 'NO lobby code entered'}})
const gameStartSelfEvent = new CustomEvent('game_start_self', { detail: 'Starting the game for self' });
const leaderFoundEvent = new CustomEvent('leaderfound', { detail: 'Leader has been found!' });
window.addEventListener("hideresult",()=>{window.dispatchEvent("hideresult") ; })
window.addEventListener("externalVerificationanddisplay",sender) ;
window.addEventListener("finalvalidation",sender) ;
window.addEventListener("finished",sender) ;
window.addEventListener("fetchjs",diffsend) ; 
window.addEventListener("namechangesssssssss",sender) ; 

function sender(e)
{
  if (e.type=='namechangesssssssss') {
    var y  = JSON.stringify(e.detail) ; 
    socket.send(`namechange---${y}`)
    return  ; 
  }
  if (e.type==`finished`) {
    time = String((new Date).getTime())
   var  p = {}
    p.detail = e.detail
    p.time = time
    p = JSON.stringify(p)
    socket.send(`finished---${p}`) ;
    return ; 
  }
  if (e=="begin tracking") {
    socket.send(e) ;
    return ; 
  }
  
 if(e.type=="finalvalidation"){
  socket.send(`playertypf---${e.detail}`) ; 
  return ; 
 }
  socket.send(`playertype---${e.detail}`) ; 
}
async function diffsend()
{
  topten = await fetch(HTTPS_API_BASE_URL) ; 
  topten = await topten.json() ;
  var lp = topten.data
  // if (!topten.ok) {
  //   console.log(topten) ;
  // }
  window.dispatchEvent(new CustomEvent("topten",{detail:lp}))
  console.log(topten)
}
function closerofg()
{
  window.dispatchEvent(new CustomEvent("closeg")) ; 
}
function nameplkiok() {
  if ( document.getElementById("heraldofchange").innerHTML != "done"  ) {
    window.dispatchEvent(new CustomEvent("tellmenewnamessssss"))  ;
    return false;
  }
 
}
async function diconect(e)
{
  socket.close() ; 
  await window.dispatchEvent(new CustomEvent("leavinglobby",{detail:e})) ;  
}
function rematch(params) {
  socket.send("rematch");

}

function toggletick() {
  if (document.getElementById("heraldofchange").innerHTML == "done" ) {
    document.getElementById("heraldofchange").innerHTML = "edit" ; 
  document.getElementById("heraldofchange").classList.add("!pointer-events-none")
  document.getElementById("heraldofchange").classList.remove("cursor-pointer")
  }
  else
  {
    document.getElementById("heraldofchange").innerHTML = "done"
    document.getElementById("heraldofchange").classList.remove("!pointer-events-none")
    document.getElementById("heraldofchange").classList.add("cursor-pointer")
  
  }
}

function disableButtonOnClick() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      button.disabled = true;
      // button.innerText = 'Processing...'; // Optional: Update button text
      console.log("okads")
      // Optional: Add additional processing logic here
      
      // Example: Simulate an async operation with a delay of 2 seconds
      setTimeout(function() {
        button.innerText = 'Disabled';
        // Optional: Re-enable button after processing is complete
        button.disabled = false;
      }, 2000);
    });
  });
}
disableButtonOnClick() ; 








































































































/*   ██╗██╗   ██╗███╗   ██╗██╗  ██╗    ██████╗ ███████╗██╗   ██╗ ██████╗ ███╗   ██╗██████╗     ████████╗██╗  ██╗██╗███████╗    ██████╗  ██████╗ ██╗███╗   ██╗████████╗    
     ██║██║   ██║████╗  ██║██║ ██╔╝    ██╔══██╗██╔════╝╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔══██╗    ╚══██╔══╝██║  ██║██║██╔════╝    ██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝    
     ██║██║   ██║██╔██╗ ██║█████╔╝     ██████╔╝█████╗   ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ██║       ██║   ███████║██║███████╗    ██████╔╝██║   ██║██║██╔██╗ ██║   ██║       
██   ██║██║   ██║██║╚██╗██║██╔═██╗     ██╔══██╗██╔══╝    ╚██╔╝  ██║   ██║██║╚██╗██║██║  ██║       ██║   ██╔══██║██║╚════██║    ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║       
╚█████╔╝╚██████╔╝██║ ╚████║██║  ██╗    ██████╔╝███████╗   ██║   ╚██████╔╝██║ ╚████║██████╔╝       ██║   ██║  ██║██║███████║    ██║     ╚██████╔╝██║██║ ╚████║   ██║       
 ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝       
                                                                                                                                                                           */




// if (wscode != null && lobbycode != null) {
//     try {
//         socket = new WebSocket(wscode);
//     } catch (error) {
//         console.log(error)
//     }
// }
// else
// {
//     connectfail =true
// }



// socket.onclose = function(event) {
//     console.log(`WebSocket closed with status code ${event.code}`);
//     if (socket.readystate===3) { 
//         if(event.code==3636)
//     {
//         document.getElementsByTagName("main")[0].appendChild(conectfail)
//      conectfail.classList.replace("opacity-0","opacity-100")
//     setTimeout(() => {
//         conectfail.classList.replace("opacity-100","opacity-0")
//         conectfail.remove() ; 
//     }, 1200);
//     }
//     }
    
//   };















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


// const eventi = new CustomEvent('myEvent', { detail: { message: 'Hello from script 1!' } });
//   setTimeout(() => {
//     window.dispatchEvent(eventi)
//   }, 2000);

// leavebt.addEventListener('click', function() {
//     gamestleftpanel.classList.remove("opacity-100");
//     gamestleftpanel.classList.add("opacity-0")
//     setTimeout(() => {
//       gamestleftpanel.remove();
//       document.querySelector(".main")[0].appendChild(colap)
//       colap.classList.remove("opacity-0")
//       colap.classList.add("opacity-100")
//     }, 1001);
//   });