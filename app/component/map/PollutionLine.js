import * as turf from "@turf/turf";
import PropTypes from 'prop-types';
import React from 'react';
import moment from "moment";
import tinycolor from "tinycolor2";
import { queue } from "async";

import { isBrowser } from '../../util/browser';

let Marker;
let L;

/* eslint-disable global-require */
if (isBrowser) {
  Marker = require('react-leaflet/es/Marker').default;
  L = require('leaflet');
}
/* eslint-enable global-require */

export default class PollutionLine extends React.Component {

  state = { 
    zoom: this.context.map.getZoom(),
    bounds: this.context.map.getBounds(),
    points: [],
    aqiValues: []
  };
  
  processedIndices = [];

  taskQueue = queue(async (task, callback) => {
    this.createAqiPromise(this.state.points[task.index]).then((results) => {
      const result = results[0];
      const aqiValues = this.state.aqiValues;
      aqiValues[task.index] = result || {};
      this.setState({
        aqiValues: aqiValues,
      });

      callback();
    });
  }, 2);


  static propTypes = {
    thin: PropTypes.bool,
    passive: PropTypes.bool,
    color: PropTypes.string,
    mode: PropTypes.string.isRequired,
    geometry: PropTypes.array.isRequired,
  };

  static contextTypes = {
    map: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  onMapMove = () => {
    this.setState({ 
      zoom: this.context.map.getZoom(),
      bounds: this.context.map.getBounds()
    });
  };

  componentDidMount() {
    this.context.map.on('zoomend', this.onMapMove);
    this.context.map.on('move', this.onMapMove);

    let filteredPoints;
    if (this.props.geometry) {
      filteredPoints = this.props.geometry.filter(
        point => point.lat !== null && point.lon !== null,
      );
    }

    this.emptyQueue();
    this.processedIndices = [];
    const sampleRate = 0.012;
    const turfLine = turf.lineString(filteredPoints);
    const totalLength = turf.length(turfLine);
    const sampleCount = totalLength / sampleRate;
    const samplePoints = [];
    const initialAqiValues = [];

    for (let i = 0; i < sampleCount;i++) {
      let samplePoint = turf.along(turfLine, i * sampleRate);
      samplePoints.push(samplePoint);
      initialAqiValues.push(undefined);
    }

    this.setState({
      points: samplePoints,
      aqiValues: initialAqiValues
    });
  }

  emptyQueue() {
    this.taskQueue.remove(() => true);
  }

  componentWillUnmount() {
    this.emptyQueue();
    this.context.map.off('zoomend', this.onMapMove);
    this.context.map.off('move', this.onMapMove);
  }

  becameVisible(index) {
    if (this.processedIndices.indexOf(index) > -1) {
      return;
    }
    this.processedIndices.push(index);

    this.taskQueue.push({
      index: index
    });
  }

  createAqiPromise(samplePoint) {
    const urlString = this.context.config.ngsiWrapper && this.context.config.ngsiWrapper.url ? this.context.config.ngsiWrapper.url : undefined;
    if (!urlString) {
      return Promise.resolve([]);
    }

    const url = new URL(urlString);
    var fromDate = moment().subtract(1, "hour");
    var toDate = moment()
    url.searchParams.append("georel", "near;maxDistance:8");
    url.searchParams.append("geometry", "point");
    url.searchParams.append("limit", 1);
    url.searchParams.append("coords", `${samplePoint.geometry.coordinates[0]},${samplePoint.geometry.coordinates[1]}`);
    url.searchParams.append("attrs", "airQualityIndex,id");
    url.searchParams.append("q", `dateObserved=>${fromDate.toISOString()};dateObserved=<${toDate.toISOString()}`);
    return fetch(url.href).then((response) => {
      return response.json();
    })
  }

  aqiToColor(aqiObject) {
    const aqi = aqiObject.airQualityIndex.value;
    if (!aqi || aqi < 1) {
      return "#f2f8ee";
    }
    if (aqi < 2) {
      return "#e2f0d9";
    }
    if (aqi < 2.5) {
      return "#ffff99";
    }
    if (aqi < 3) {
      return "#ffff00";
    }
    if (aqi < 3.5) {
      return "#ffcc66";
    }
    if (aqi < 4.0) {
      return "#ff9900";
    }
    if (aqi < 4.5) {
      return "#ff3300";
    }
    if (aqi < 5) {
      return "#cc0000";
    }
    return "#800080";
  }

  getIcon = (index) => {
    const aqi = this.state.aqiValues[index];
    const color =  aqi && aqi.airQualityIndex ? tinycolor(this.aqiToColor(aqi)).darken(40) : "#c3c3c3";

    return L.divIcon({
      html: `<svg viewBox="0 0 8 8">
              <circle class="stop-small" cx="4" cy="4" r="3" style="stroke-width:1;stroke:${tinycolor("#000000").lighten(30)};fill:${color}"/>
            </svg>`,
      iconSize: this.props.passive ? [8, 8] : [12, 12],
      className: 'cursor-pointer',
    });
  }

  render() {
    const zoom = this.state.zoom;
    const nthVisible = 19 - zoom;

    const markers = this.state.points.map((samplePoint, index) => {
      if (index % nthVisible === 0 && this.state.bounds.contains(samplePoint.geometry.coordinates)) {
        this.becameVisible(index);
        return ( <Marker icon={this.getIcon(index)} key={index} position={samplePoint.geometry.coordinates} /> )
      } else {
        return "";
      }
    });

    return (
      <div style={{ display: 'none' }}>
        {markers}
      </div>
    );
  }
}
