import React, { useState, useRef, useEffect } from "react";

import styles from "./Map.module.css";

const Map = (props) => {
  const {center, zoom} = props;

  console.log(center)

  const mapRef = useRef();

  useEffect(() => {
    var map = new window.ol.Map({
      target: "map",
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lat, center.lng]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return <div className={styles.map} id = "map" ref = {mapRef}></div>;
};

export default Map;
