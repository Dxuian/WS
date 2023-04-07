var socket, holder , temphold;
var cookie  =  String((document.cookie)).split(";");
var cok = [] ;  
const joinbt = document.getElementById("join-btn");
const leavebt = document.getElementById("leavegame");
const gamestleftpanel = document.getElementById("gamestleftpanel");
const colap = document.getElementById("colap");gamestleftpanel.remove();
const conectfail =  document.getElementById("conectfail")
conectfail.remove() ; 





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
        socket = new WebSocket(wscode);
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
    // else if(whathappen=="closecodewrong")
    // {
    //     socket.close();
    // }
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

socket.onclose = (event) => {
  if (event.code === 3636) {
    joinornot = false ; 
    console.log("fake") ; 
    socket = holder ; 
    console.log("ok that closed!!!!");
    alert("ws has been closed!!!");
  }
};




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

joinbt.addEventListener('click', async function() {
    joingame('joinlink-input');
    await setTimeout(() => {
        
    }, 1000);
    if (joinornot) {
    
      colap.classList.remove("opacity-100")
      colap.classList.add("opacity-0");
      setTimeout(() => {
        colap.remove();
        document.getElementsByTagName("main")[0].appendChild(gamestleftpanel);
        gamestleftpanel.classList.remove("opacity-0")
        gamestleftpanel.classList.add("opacity-100");
      }, 1200);
    }
    else
    {
      colap.classList.remove("opacity-100")
      colap.classList.add("opacity-0");
      setTimeout(() => {
        colap.remove();
        document.getElementsByTagName("main")[0].appendChild(gamestleftpanel);
        gamestleftpanel.classList.remove("opacity-0")
        gamestleftpanel.classList.add("opacity-100");
      }, 1200);
    }
  });
  
  leavebt.addEventListener('click', function() {
    gamestleftpanel.classList.remove("opacity-100");
    gamestleftpanel.classList.add("opacity-0")
    setTimeout(() => {
      gamestleftpanel.remove();
      document.getElementsByTagName("main")[0].appendChild(colap)
      colap.classList.remove("opacity-0")
      colap.classList.add("opacity-100")
    }, 1001);
  });
  

var joinornot ; 
  async function joingame(lc) {
    var nc = "ws://localhost:5000/ws/" + document.getElementById(lc).value;
    try {
      var handler = new WebSocket(nc);
      joinornot =true ; 
      temphold = socket;
      socket = handler;
      
    } catch (error) {
     
      console.log(error);
    }
  }
  









/*     ██╗██╗   ██╗███╗   ██╗██╗  ██╗    ██████╗ ███████╗██╗   ██╗ ██████╗ ███╗   ██╗██████╗     ████████╗██╗  ██╗██╗███████╗    ██████╗  ██████╗ ██╗███╗   ██╗████████╗    
     ██║██║   ██║████╗  ██║██║ ██╔╝    ██╔══██╗██╔════╝╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔══██╗    ╚══██╔══╝██║  ██║██║██╔════╝    ██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝    
     ██║██║   ██║██╔██╗ ██║█████╔╝     ██████╔╝█████╗   ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ██║       ██║   ███████║██║███████╗    ██████╔╝██║   ██║██║██╔██╗ ██║   ██║       
██   ██║██║   ██║██║╚██╗██║██╔═██╗     ██╔══██╗██╔══╝    ╚██╔╝  ██║   ██║██║╚██╗██║██║  ██║       ██║   ██╔══██║██║╚════██║    ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║       
╚█████╔╝╚██████╔╝██║ ╚████║██║  ██╗    ██████╔╝███████╗   ██║   ╚██████╔╝██║ ╚████║██████╔╝       ██║   ██║  ██║██║███████║    ██║     ╚██████╔╝██║██║ ╚████║   ██║       
 ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝       
                                                                                                                                                                           */




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