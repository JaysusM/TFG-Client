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
import { ColorLegend } from "./ColorLegend.tsx/ColorLegend";

const MLG_DEFAULT_LOCATION: LatLngExpression = [36.72354892, -4.427047];
const gradient = {
  0.01: "#51a1d6",
  0.4: "#ffee2e",
  0.7: "#fac32a",
  1.0: "#ff1f12",
};

export const Map = withTheme((props: any) => {
  const primaryColor = props.theme.palette.primary.main;
  const measurements: Array<Measurement> | undefined = useMeasurements(props.date);

  let mapWrapperClassNames = "map-wrapper";
  if (props.fullScreen) {
    mapWrapperClassNames += " map-wrapper-fullscreen";
  }

  if (!measurements) {
    return (
      <div className="map-wrapper">
        <SyncLoader color={primaryColor} size={8} />
      </div>
    );
  }

  const getMeasurementsLocation = () => {
    return measurements.map((measurement: Measurement) => {
      const { latitude, longitude } = measurement.position;

      return [latitude, longitude, measurement.value * 10000];
    });
  };

  return (
    <div className={mapWrapperClassNames}>
      <ColorLegend gradient={gradient}/>
      <MapLeaflet center={MLG_DEFAULT_LOCATION} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatMapLayer
          points={getMeasurementsLocation()}
          longitudeExtractor={(m: any) => m[1]}
          latitudeExtractor={(m: any) => m[0]}
          gradient={gradient}
          intensityExtractor={() => 0.1}
          max={1}
        />
      </MapLeaflet>
    </div>
  );
});
