import { useMeasurements } from "./CustomHooks";
import React from "react";
import { Measurement } from "./Types";
import SyncLoader from "react-spinners/SyncLoader";
import "./Map.scss";
import { withTheme } from "@material-ui/core/styles";
import { LatLngExpression } from "leaflet";
import { Map as MapLeaflet, TileLayer } from "react-leaflet";
// @ts-ignore
import HeatMapLayer from "react-leaflet-heatmap-layer";

const MLG_DEFAULT_LOCATION: LatLngExpression = [36.72354892, -4.427047];
const gradient = {
    0.3: '#51a1d6',
    0.6: '#ffee2e', 
    0.8: '#fac32a', 
    1.0: '#ff1f12'
  };


export const Map = withTheme((props: any) => {
  const measurements: Array<Measurement> | undefined = useMeasurements();
  const primaryColor = props.theme.palette.primary.main;

  if (!measurements) {
    return (
      <div className="map-wrapper">
        <SyncLoader color={primaryColor} size={8} />
      </div>
    );
  }

  const getMeasurementsLocation = () => {
    return measurements.map((measurement) => {
      const [lat, lng] = measurement.coordenates.split(",");
      return [Number(lat), Number(lng), measurement.value];
    });
  };

  return (
    <div className="map-wrapper">
      <MapLeaflet center={MLG_DEFAULT_LOCATION} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatMapLayer 
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={getMeasurementsLocation()}
        longitudeExtractor={(m: any) => m[1]}
        latitudeExtractor={(m: any) => m[0]}
        gradient={gradient}
        intensityExtractor={(m: any) => m[2]}
        max={1.6}/> 
      </MapLeaflet>
    </div>
  );
});
