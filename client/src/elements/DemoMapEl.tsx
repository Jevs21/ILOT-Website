// import { createSignal, createEffect, onMount } from "solid-js";
// import L from "leaflet";
  

// const BasicMap = (props) => {
//   let map;

//   createEffect(() => {
//     console.log("Setting map on effect")
//     const myMap = L.map('mapid').setView([51.505, -0.09], 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
//       maxZoom: 18,
//     }).addTo(myMap);
//   });

//   return (
//     <>
//       <div ref={map} id="mapid" style="height: 400px"></div>
//     </>
//   );
// }

// export default BasicMap;


// import a bunch of leaflet stuff!

import { Box } from '@suid/material';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { createEffect, onMount } from 'solid-js';

// note the markerIcon lines: to address known issue (with webpack?) where Leaflet won't
// be able to find the marker icon in production
// https://stackoverflow.com/questions/60174040/marker-icon-isnt-showing-in-leaflet
// import markerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
// L.Marker.prototype.setIcon(L.icon({
//   iconUrl:markerIcon
// }))


// leaflet only works if you start doing stuff after the page properly exists (has rendered?)
// so we render the map and create our effects inside onMount() so they won't exist until the page does
export default function DemoMapEl(props?: any) {
  const possible_coords = [
    [43.71396220726016, -79.5930360478396], // Woodbine toyota
    [44.4061869354414, -79.70377021528682], // Bayfield ford lincoln
    [44.376693747773196, -79.71297198794062],
    [43.52977904293927, -79.88582606416367],
    [43.52652206707601, -79.86976489334047],
    [43.54061234991195, -80.31248296878242],
    [44.03984401261156, -79.46244830380338],
  ];
  let container;
  // Leaflet initialization has to happen inside onMount or it won't work
  onMount(() => {
    const randCoord = possible_coords[Math.floor(Math.random() * possible_coords.length)];
    const map = L.map('make-a-map', {
      zoomControl: false,
    }).setView(randCoord, 24);
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.dragging.disable();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // add a single marker to a layer. note it's in an array
    // let markerLayer = L.layerGroup([
    //   L.marker([43.71396220726016, -79.5930360478396])
    //   .bindPopup('Red Honda Civic')
    //   .openPopup()
    // ]);

    // container.addEventListener('mouseover', () => {
    //   ')
    
    // reactive effect to add or remove the marker based on our reactive prop
    createEffect (() => {
      console.log("effect fired");
      // map.addLayer(markerLayer);
    });
  });

  return (
    <Box ref={container} width='100%' height='100%'>
      <div id="make-a-map" style={{ 
        'height': '300px',
        'border-radius': '20px'}}/>
    </Box>
  );
}
