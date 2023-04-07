import  { Greeting }  from "./retwo.js";

const { useState } = React;

function FavoriteColor() {
    const [color, setColor] = useState("red");

    return <h1>My favorite color is {color}!</h1>
}


// Render the component to the DOM  
function MyApp() {
    return  (
        <div><FavoriteColor />
        <Greeting /></div>)
    
       

}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
