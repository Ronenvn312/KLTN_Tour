
import React, { useEffect, useRef, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapBox() {

  const [lng, setLng] = useState(106.68921221955645)
  const [lat, setLat] = useState(10.772420997560602)
  const [showPopup, setShowPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null);
  const data = {
    longitude: lng,
    latitude: lat,
    city: 'Ho Chi Minh City',
    state: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/da-nang-4-ngay-3-dem-handetour.webp?alt=media&token=3053069d-bbd6-47f0-9bba-1589b2f9026e'
  }
  const handleShowPopup = () => {
    setShowPopup(true);
  }

  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg'
      style={{
        width: '100%',
        height: '100%',
        borderRadius: "15px",
        border: '2px solid red'
      }}
      onClick={(e) => {
        setLat(e.lngLat.wrap().lat)
        setLng(e.lngLat.wrap().lng)
        console.log({ lng: e.lngLat.wrap().lng, lat: e.lngLat.wrap().lat })
      }}
      // zoom={5}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(data);
        }}

      >
        <img src="https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/mapbox-icon.png?alt=media&token=a70dd5be-1312-4f84-aa53-c0b6092b9e75" />
      </Marker>
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.city}, {popupInfo.state} |{' '}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo.image} />
        </Popup>
      )}
      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <ScaleControl />
      <GeolocateControl />
    </Map>
  );
}

export default MapBox;
