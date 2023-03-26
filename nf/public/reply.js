
var socket;
try {
    socket.addEventListener("open", (event) => {
        socket.send({ text: "Hello Server!", textarea: k });
    });
} catch (error) {
    console.log(error);
}

function change() {
    try {
        var k = document.getElementById("one").value
    // Create WebSocket connection.
    socket = new WebSocket("http://127.0.0.1:5000");
    // Connection opened
    } catch (error) {
        console.log(error);
    }
    
    
}
// Listen for messages
socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
    document.getElementById("one").value = event.data
});