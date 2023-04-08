import React from 'react';
import ReactDOM from 'react-dom/client';

function Car() {
  return (<><h2>I am a Car!</h2></>)
}

function Garage() {
  
  return (
    <div>
	    <h1>Who lives in my Garage?</h1>
	    <Car />
        </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);