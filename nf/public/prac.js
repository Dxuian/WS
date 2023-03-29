//{ file: "prac.html", lobbycode: randlobbycode , wscode: randlobbycode}
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

