import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyAWKwJe-MvwME7-NqieuISQy2IXZA3h5lk';

var suggestLocation = {
    coordinates: {
        lat: '',
        lng: ''
          }
        }

let geocoder = new window.google.maps.Geocoder();
geocoder.geocode( { 'address': '1106 avenue Laurier Est Montréal Québec'}, function(results, status) {
            if (status == 'OK') {
        const location = results[0].geometry.location

        suggestLocation = {
          coordinates: {
            lat: location.lat(),
            lng: location.lng()
          }
        }
                console.log(suggestLocation.coordinates.lat);
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
 });


const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: suggestLocation.coordinates.lat, lng: suggestLocation.coordinates.lng }}
    googleMapURL={googleMapURL}

  >

      <MarkerWithLabel
      position={{ lat: suggestLocation.coordinates.lat, lng: suggestLocation.coordinates.lng }}
      labelAnchor={new google.maps.Point(0, 0)}
      labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
    >
      <div>Paris 20 Store</div>
    </MarkerWithLabel>

//Paris Coordonée lat: 48.8673484, lng: 2.39209900000003

  </GoogleMap>
);

<MapWithAMarker
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>

class GettingStartedExample extends Component {
  render() {
    return (
      <MapWithAMarker
        containerElement={<div style={{height: `1000px`, width: `1000px`}} />}
        mapElement={<div style={{height: `1000px`, width: `1000px`}} />}
      />
    );
  }
}
export default GettingStartedExample;

