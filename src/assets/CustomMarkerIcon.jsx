// CustomMarkerIcon.jsx
import React from "react";
import ReactDOMServer from "react-dom/server"; // Import ReactDOMServer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";

const CustomMarkerIcon = new L.DivIcon({
  html: `<div style="font-size: 2.5rem; color: #3b5bdb;">
           ${ReactDOMServer.renderToString(
             <FontAwesomeIcon icon={faMapMarkerAlt} />
           )}
         </div>`,
  className: "custom-marker-icon",
});

export default CustomMarkerIcon;
