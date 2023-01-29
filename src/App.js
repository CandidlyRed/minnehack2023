// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Map from 'react-map-gl';
import points from './points.png';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import mapboxgl from "mapbox-gl"
import {writeEventData, writeUserData, changeEventStatus, incrementEvent} from './Database.js';
import glasssvg from "./icons/glass.svg";
import plasticsvg from "./icons/plastic.svg";
import metalsvg from "./icons/metal.svg";
import organicsvg from "./icons/organic.svg";
import papersvg from "./icons/paper.svg";
import othersvg from "./icons/other.svg";
// import happy from "./models/happy/"
// import sad from "./models/sad/"


function App() {
  // get_all_players();
  const [state, setState] = useState({
    isPaneOpen: false
  });
  const [counter, setCounter] = useState(40);
  const increase = () => {
    setCounter(count => count + 1);
  };
  const writeUD = () => {writeUserData(400,400)};
  const writeED = () => {writeEventData(0, 0, 0, 0, [], 1, 0, "not started")};
  const changeE = () => {changeEventStatus(0, "Morbin")};
  const incrementE = () => {incrementEvent(0)};

    // parameters to ensure the model is georeferenced correctly on the map
    const modelOrigin = [-93, 45];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since the 3D model is in real world meters, a scale transform needs to be
         * applied since the CustomLayerInterface expects units in MercatorCoordinates.
         */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };

    const THREE = window.THREE;

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();

            // create two three.js lights to illuminate the model
            const directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(0, -70, 100).normalize();
            this.scene.add(directionalLight);

            const directionalLight2 = new THREE.DirectionalLight(0xffffff);
            directionalLight2.position.set(0, 70, 100).normalize();
            this.scene.add(directionalLight2);

            // use the three.js GLTF loader to add the 3D model to the three.js scene
            const loader = new THREE.GLTFLoader();
            loader.load(
                'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
                (gltf) => {
                    this.scene.add(gltf.scene);
                }
            );
            this.map = map;

            // use the Mapbox GL JS map canvas for three.js
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true
            });

            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            const rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            const rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            const rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
            );

            const m = new THREE.Matrix4().fromArray(matrix);
            const l = new THREE.Matrix4()
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                )
                .scale(
                    new THREE.Vector3(
                        modelTransform.scale,
                        -modelTransform.scale,
                        modelTransform.scale
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            this.camera.projectionMatrix = m.multiply(l);
            this.renderer.resetState();
            this.renderer.render(this.scene, this.camera);
            this.map.triggerRepaint();
        }
    };

    // map.on('style.load', () => {
    //     map.addLayer(customLayer, 'waterway-label');
    // });
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
    />
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
        </div>
      </SlidingPane>

      <script>
        const progressbar = document.getElementById("progressbar_id");

        progressbar.addEventListener("click", function(event){
          if (progressbar.now > 100) {
            console.log("100!!!");
          }
        })
      
      </script>
    </div>
  )
}

export default App;
