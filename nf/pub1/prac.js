//{ file: "prac.html", lobbycode: randlobbycode , wscode: randlobbycode}
var socket;
if (wscode != null && lobbycode != null) {
    var socket = new WebSocket(wscode);
}
socket.on("message", (message) => {
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
    }
    // sendmsg(removeplayer, toall, null) at line 42
    else if(whathappen=="removeplayer")
    {
        
    }
})

