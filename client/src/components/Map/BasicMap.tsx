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
export default function BasicMap(props?: any) {
  
  // Leaflet initialization has to happen inside onMount or it won't work
  onMount(() => {
    const map = L.map('make-a-map').setView([43.71396220726016, -79.5930360478396], 20);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // add a single marker to a layer. note it's in an array
  let markerLayer = L.layerGroup([
    L.marker([51.5, -0.09])
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup()
  ]);
  
  // reactive effect to add or remove the marker based on our reactive prop
  createEffect (() => {
    console.log("effect fired");
    if (props.trigger){
      map.addLayer(markerLayer);
    }
    if (!props.trigger){
      map.removeLayer(markerLayer);
    }
  });
});

return (
  <Box width='100%' height='100%'>
    <div id="make-a-map" style="height:300px"/>
  </Box>
  );
}


// export function MakeAClusteredMap(props?: any) {
  
//   onMount(() => {
//     const map = L.map('make-a-clustered-map').setView([45, -75.5], 7);
    
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);
  
//   let pointClusters = L.markerClusterGroup();
//   props.clusterPoints.forEach ((e: any) => pointClusters.addLayer(L.marker([e.lat, e.lon]).bindPopup(e.languages_spoken)));
//   map.addLayer(pointClusters);
  
//   // Filter here for language
//   createEffect (() => {
//     console.log(props.filter);
    
//     map.removeLayer(pointClusters);
//     pointClusters = L.markerClusterGroup();
    
//     if (props.filter.language === 'all') {
//       console.log('selected all')
//       props.clusterPoints.forEach ((e: any) => pointClusters.addLayer(L.marker([e.lat, e.lon]).bindPopup(e.languages_spoken)));
      
//     } else {
//       props.clusterPoints.filter((e: any) => e.languages_spoken.search(props.filter.language) >= 0)
//       .forEach ((e: any) => pointClusters.addLayer(L.marker([e.lat, e.lon])
//       .bindPopup(e.languages_spoken)));
//     }
    
//     map.addLayer(pointClusters);
    
//   });
// });

// return <div id="make-a-clustered-map" style="height:300px"/>

// }