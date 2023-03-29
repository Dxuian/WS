var socket = new WebSocket("ws://127.0.0.1:5000/ws");
try {
    socket.addEventListener("open", (event) => {
        socket.send({ text: "Hello Server!", textarea: 123 });
        document.getElementsByTagName("body")[0].style.background="green"


    });
} catch (error) {
    console.log(error);
}

function change() {
    try {
        var k = document.getElementById("one").value
        socket.send(k)
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

    console.log("Message from server ", event.data);
    document.getElementById("two").value = event.data
});