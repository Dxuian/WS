var socket = new WebSocket("ws://127.0.0.1:5000/wss");
// try {
//     socket.addEventListener("open", (event) => {
//         const now = new Date();
//         const minutes = now.getMinutes();
//         const seconds = now.getSeconds();
//         const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
//         socket.send(timeString);
//         document.getElementsByTagName("body")[0].style.background="green"


//     });
// } catch (error) {
//     console.log(error);
// }
var kw = 1 ; 
function change() {
    try {
        var k = document.getElementById("one").value
        // const nows = new Date();
        // const minute = nows.getMinutes();
        // const second = nows.getSeconds();
        // const timeStrings = `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
        var  timeStrings = k ;
        socket.send(timeStrings)
        document.getElementsByTagName("body")[0].style.background="pink"

        

    // Create WebSocket connection.
    
    // Connection opened
    } catch (error) {
        console.log(error);
    }
    
    
}
// Listen for messages
socket.addEventListener("message", (event) => {
    document.getElementsByTagName("body")[0].style.background="purple"
    var text ; 
    if(event.data.slice(0,4)=="[Obj"){
        text = JSON.parse(event.data) ; 
    }
    else{text = event.data}
    console.log("Message from server ", text);
    document.getElementById("two").value = text ; 
});