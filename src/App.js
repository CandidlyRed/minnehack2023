// import logo from './logo.svg';
import './App.css';
import React, {useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl'
import points from './points.png';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

import * as database from './Database.js';

import glasssvg from "./icons/glass.svg";
import plasticsvg from "./icons/plastic.svg";
import metalsvg from "./icons/metal.svg";
import organicsvg from "./icons/organic.svg";
import papersvg from "./icons/paper.svg";
import othersvg from "./icons/other.svg";
import audubon from "./icons/audubon.svg";
import cleanwateraction from "./icons/cleanwateraction.svg";
import natureconservancy from "./icons/natureconservancy.svg";
import clientjs from "./js/clientscripts.js";
import happycat from "./models/happy/happycat.png";
import happybunny from "./models/happy/happybunny.png";
import happydog from "./models/happy/happydog.png";
import sadbunny from "./models/sad/sadbunny.png";
import saddog from "./models/sad/saddog.png";
import sadcat from "./models/sad/sadcat.png";
import event from "./models/event.png"


function App() {
  // get_all_players();
  const [state, setState] = useState({
    isPaneOpen: false
  });
  const [counter, setCounter] = useState(90);
  const [_customLayer,setCustomlayer]=useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopup1, setShowPopup1] = React.useState(false);
  const [showPopup2, setShowPopup2] = React.useState(false);
  const [showPopup3, setShowPopup3] = React.useState(false);
  const [showPopup4, setShowPopup4] = React.useState(false);
  const [showPopup5, setShowPopup5] = React.useState(false);
  const [showPopup6, setShowPopup6] = React.useState(false);

  const pbar_ref = React.useRef(null);
  const infotext_ref = React.useRef(null);
  const redeem_ref = React.useRef(null);
  const buttons_ref = React.useRef(null);
  
  const increase = () => {
    let curVal = pbar_ref.current.children[0].ariaValueNow;
    if (curVal < 99){
      if (curVal <= 1){
        infotext_ref.current.innerText = "Reach 100 points for redemption";
      }
      // buttons_ref.current.style.display = "unset";
      setCounter(count => count + 1);
    } else {
      if (curVal = 99){
        setCounter(count => count + 1);
      }
      buttons_ref.current.style.display = "none";
      console.log(buttons_ref.current.style.display);
      redeem_ref.current.style.display = "unset";
      console.log(redeem_ref.current.style.display);
      console.log(infotext_ref.current.innerText);
      infotext_ref.current.innerText = "Please choose a reward below to redeem your points."
      // infotext_ref.current
    }
  };
  const handleClick = () => {
    // console.log(pbar_ref.current.children[0].ariaValueNow);
  };

  const redeemReward = () => {
    infotext_ref.current.innerText = "Thanks for supporting the environment!";
    setCounter(count => 70);
    buttons_ref.current.style.display = "unset";
    console.log(buttons_ref.current.style.display);
    redeem_ref.current.style.display = "none";
    console.log(redeem_ref.current.style.display);
  }

  // const result = database.getEventName(1).then((name) => name._node.value_);
  async function getEventNameString(index){
    let promise = database.getEventName(index);
    async function success(p){
      // console.log(p)
      // console.log("SSSSSSSSSSSSSSSSS")
      let node = await p._node;
      // console.log(node)
      let name = await node.value_;
      // console.log(name + "sfsdfsdfSDFDsdfs");
      return name;
    }
    let n = await promise.then(success);
    return n;
  }
  console.log(getEventNameString(1) + "HERE");

  const getTest = () => {
    console.log("GET TEST-------------------------------------")
    let promise = database.getEventName(1);
    function success(info) {
      console.log(info.val());
      // return result; 
    }
    function failure() {
      console.log(failure);
    }
    promise.then(success,failure);
  }


  
  {/* Database testing functions */}
  const writeUD = () => {database.writeUserData(0,400,0,0)};
  const writeED = () => {
    database.writeEventData(1, 44.977, -93.265, 0, [], 20, 1500, "not started", "happycat"); // happycat
    database.writeEventData(2, 44.9537, -93.09, 0, [], 20, 1600, "not started", "happydog"); // happydog
    database.writeEventData(3, 44.9964, -93.0616, 0, [], 20, 1500, "not started", "happybunny"); // happybunny
    database.writeEventData(4, 44.9530, -92.9952, 0, [], 20, 500, "not started", "sadcat"); // sadcat
    database.writeEventData(5, 45.0061, -93.1566, 0, [], 20, 600, "not started", "saddog"); // saddog
    database.writeEventData(6, 45.0791, -93.1472, 0, [], 20, 800, "not started", "sadbunny"); // sadbunny
  };
  const changeE = () => {database.changeEventStatus(0, "Morbin")};
  const incrementE = () => {database.incrementEvent(0)};
  const deleteE = () => {database.deleteEvent(0)};
  const deleteU = () => {database.deleteUser(0)};
  const updateU = () => {database.updateUserScore(0, 10000)};
  const endE = () => {database.endEvent(0)};
  const addUtoE = () => {database.addUserToEvent(0,0)};

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
      <Marker longitude={-93.265} latitude={44.977} anchor="center" onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup(true);
          }}>
        <img src={happycat}/>
        {showPopup && (
        <Popup longitude={-93.265} latitude={44.977}
          anchor="bottom"
          onClose={() => setShowPopup(false)}>
            {/* '${getTest}' */}
          {/* '${database.getEventName(1).then((name) => [name])}' */}
          <b>Minneapolis</b><br></br>
          1500 points{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
      <Marker longitude={-93.09} latitude={44.9537} anchor="center" onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup1(true);
          }}>
        <img src={happydog} />
        {showPopup1 && (
        <Popup longitude={-93.09} latitude={44.9537}
          anchor="bottom"
          onClose={() => setShowPopup1(false)}>
          {/* {database.getEventName(1)} */}
          St. Paul<br></br>
          1600 points{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
      <Marker longitude={-93.0616} latitude={44.9964} anchor="center" onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup(true);
          }}>
        <img src={happybunny} />
        {showPopup && (
        <Popup longitude={-93.0616} latitude={44.9964}
          anchor="bottom"
          onClose={() => setShowPopup2(false)}>
          {/* '${database.getEventName(1)}' */}
          Maplewood<br></br>
          1500 points{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
      <Marker longitude={-92.9952} latitude={44.9530} anchor="center" onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup3(true);
          }}>
        <img src={sadcat} />
        {showPopup3 && (
        <Popup longitude={-92.9952} latitude={44.9530}
          anchor="bottom"
          onClose={() => setShowPopup3(false)}>
          {/* '${database.getEventName(1)}' */}
          Maplewood<br></br>
          500 points{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
      <Marker longitude={-93.1566} latitude={45.0061} anchor="center" onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup4(true);
          }}>
        <img src={saddog} />
        {showPopup4 && (
        <Popup longitude={-93.1566} latitude={45.0061}
          anchor="bottom"
          onClose={() => setShowPopup4(false)}>
          {/* '${database.getEventName(1)}' */}
          Roseville<br></br>
          600 points{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
      <Marker longitude={-93.1472} latitude={45.0791} anchor="center" onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup5(true);
          }}>
        <img src={sadbunny} />
        {showPopup5 && (
        <Popup longitude={-93.1472} latitude={45.0791}
          anchor="bottom"
          onClose={() => setShowPopup5(false)}>
          
          Shoreview<br></br>
          800 points{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
      <Marker longitude={-93.2354} latitude={44.9731} anchor="center" style={{borderRadius:'50%'}} onClick={e => {
            e.originalEvent.stopPropagation();
            setShowPopup6(true);
          }}>
        <img src={event} />
        {showPopup6 && (
        <Popup longitude={-93.2354} latitude={44.9731}
          anchor="bottom"
          onClose={() => setShowPopup6(false)}>
          {/*'${database.getEventName(1)}'*/}
          Event{/* getEventCoordinates(1); getEventName(1) */}
        </Popup>)}
      </Marker>
    </Map>
    
    <a onClick={() => {setState({ isPaneOpen: true })}} style={{position: 'absolute', top: '50vh', right: '1vh', height: '5vmin'}}>
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
          <div style={{fontWeight: 'bold', transition: "2s"}} ref={infotext_ref}>Reach 100 points for redemption</div>
          <br></br>
          <ProgressBar ref={pbar_ref} variant="success" now={counter} label={`${counter}%`} min-width={"1000vh"}/>
          <br></br>

          <div id="redeem" style={{display:'none'}} ref={redeem_ref}>
            <button className="control_btn" onClick={redeemReward} style={{backgroundColor: "#3367AE"}}><img src={cleanwateraction} class="svgcontainer, logo"></img><b>$5</b> donation to: <br></br>Clean Water Action</button>
            <button className="control_btn" onClick={redeemReward} style={{backgroundColor: "#3367AE"}}><img src={natureconservancy} class="svgcontainer, logo"></img><b>$5</b> donation to: <br></br>The Nature Conservancy in Minnesota</button>
            <button className="control_btn" onClick={redeemReward} style={{backgroundColor: "#3367AE"}}><img src={audubon} class="svgcontainer, logo"></img><b>$5</b> donation to: <br></br>National Audubon Society</button>
          </div>

          <div onClick={handleClick} ref={buttons_ref}>
            <button className="control_btn" onClick={increase} style={{backgroundColor: "#3367AE"}}><img src={plasticsvg} viewBox="0 0 13 22" class="svgcontainer"></img>Plastic</button>
            <button className="control_btn" onClick={increase} style={{backgroundColor: "#13A84D"}}><img src={organicsvg} viewBox="0 0 13 22" class="svgcontainer"></img>Organic</button>
            <button className="control_btn" onClick={increase} style={{backgroundColor: "#FDB719"}}><img src={papersvg} viewBox="0 0 13 22" class="svgcontainer"></img>Paper</button>
            <button className="control_btn" onClick={increase} style={{backgroundColor: "#FDB719"}}><img src={glasssvg} viewBox="0 0 13 22" class="svgcontainer"></img>Glass</button>
            <button className="control_btn" onClick={increase} style={{backgroundColor: "#EC2C24"}}><img src={metalsvg} viewBox="0 0 13 22" class="svgcontainer"></img>Metal</button>
            <button className="control_btn" onClick={increase} style={{backgroundColor: "#55697B"}}><img src={othersvg} viewBox="0 0 13 22" class="svgcontainer"></img>Other</button>
          </div>
        
        </div>
      </SlidingPane>
    </div>
  )
}

export default App;
