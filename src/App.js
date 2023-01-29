// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Map, {Layer} from 'react-map-gl';
import points from './points.png';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import mapboxgl from "mapbox-gl"
import {writeEventData, writeUserData, changeEventStatus, incrementEvent, deleteEvent, deleteUser} from './Database.js';
import glasssvg from "./icons/glass.svg";
import plasticsvg from "./icons/plastic.svg";
import metalsvg from "./icons/metal.svg";
import organicsvg from "./icons/organic.svg";
import papersvg from "./icons/paper.svg";
import othersvg from "./icons/other.svg";
import clientjs from "./js/clientscripts.js";
// import happy from "./models/happy/" // :)
// import sad from "./models/sad/" // :(


function App() {
  // get_all_players();
  const [state, setState] = useState({
    isPaneOpen: false
  });
  const [counter, setCounter] = useState(40);
  const increase = () => {
    setCounter(count => count + 1);
  };
  const writeUD = () => {writeUserData(0,400)};
  const writeED = () => {writeEventData(0, 0, 0, 0, [], 1, 0, "not started")};
  const changeE = () => {changeEventStatus(0, "Morbin")};
  const incrementE = () => {incrementEvent(0)};
  const deleteE = () => {deleteEvent(0)};
  const deleteU = () => {deleteUser(0)};

    //event listener
    React.useEffect(() => {
      const progressbar = document.getElementById("progressbar_id");
      console.log("fdgdfgfg")
      console.log(progressbar)
      // window.addEventListener('keydown', (event) => {
      //   console.log("TEST");
      // });
    }, []);

  return (
    <div>
      <Map
      initialViewState={{
        longitude: -93.265,
        latitude: 44.977,
        zoom: 14,
        pitch: 60,
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/candidlyred/cldh1hkyc000301nx47j3fu4m"
      mapboxAccessToken="pk.eyJ1IjoiY2FuZGlkbHlyZWQiLCJhIjoiY2w4dzRtdWsxMGtncjNwbzhxa2w4cHEwMCJ9.bzjtpnh-EQlcRPUTqMdenA"
    >
    </Map>
    
    <a onClick={() => setState({ isPaneOpen: true })} style={{position: 'absolute', top: '50vh', right: '1vh', height: '5vmin'}}>
        <img src={points} alt=""/>
    </a>
    <SlidingPane
        title="Points"
        closeIcon={<div style={{width: '65vh'}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 22"><path fill="currentColor" fill-rule="evenodd" d="M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z"></path></svg></div>}
        isOpen={state.isPaneOpen}
        from="right"
        width="1250px"
        onRequestClose={() => setState({ isPaneOpen: false })}
      >
        <div style={{textAlign: 'center'}}>
          <div style={{fontWeight: 'bold'}}>Reach 100 points for redemption</div>
          <br></br>
          <ProgressBar id="progressbar_id" variant="success" now={counter} label={`${counter}%`} min-width={"1000vh"}/>
          <br></br>
          <button className="control_btn" onClick={increase} style={{backgroundColor: "#3367AE"}}><img src={plasticsvg} viewBox="0 0 13 22" class="svgcontainer"></img>Plastic</button>
          <button className="control_btn" onClick={increase} style={{backgroundColor: "#13A84D"}}><img src={organicsvg} viewBox="0 0 13 22" class="svgcontainer"></img>Organic</button>
          <button className="control_btn" onClick={increase} style={{backgroundColor: "#FDB719"}}><img src={papersvg} viewBox="0 0 13 22" class="svgcontainer"></img>Paper</button>
          <button className="control_btn" onClick={increase} style={{backgroundColor: "#FDB719"}}><img src={glasssvg} viewBox="0 0 13 22" class="svgcontainer"></img>Glass</button>
          <button className="control_btn" onClick={increase} style={{backgroundColor: "#EC2C24"}}><img src={metalsvg} viewBox="0 0 13 22" class="svgcontainer"></img>Metal</button>
          <button className="control_btn" onClick={increase} style={{backgroundColor: "#55697B"}}><img src={othersvg} viewBox="0 0 13 22" class="svgcontainer"></img>Other</button>

          <button className="control_btn" onClick={writeUD} style={{backgroundColor: "#FFFFFF"}}>write user data</button>
          <button className="control_btn" onClick={writeED} style={{backgroundColor: "#FFFFFF"}}>write event data</button>
          <button className="control_btn" onClick={incrementE} style={{backgroundColor: "#FFFFFF"}}>increment event status</button>
          <button className="control_btn" onClick={deleteE} style={{backgroundColor: "#FFFFFF"}}>delete event</button>
          <button className="control_btn" onClick={deleteU} style={{backgroundColor: "#FFFFFF"}}>delete user</button>
        </div>
        {/* <script src={{clientjs}} defer></script> */}
      </SlidingPane>
    </div>
  )
}

export default App;
