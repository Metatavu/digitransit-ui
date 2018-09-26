import PropTypes from 'prop-types';
import React from 'react';

import GenericMarker from '../GenericMarker';
import { isBrowser } from '../../../util/browser';
import NoiseSensorPopup from '../popups/NoiseSensorPopup';

let L;

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
if (isBrowser) {
  L = require('leaflet');
}
/* eslint-enable global-require */

export default class NoiseSensorMarker extends React.Component {

  static displayName = 'NoiseSensorMarker';

  static propTypes = {
    noiseLevel: PropTypes.object.isRequired
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
  };

  renderSpeakerIcon(color) {
    return `
      <svg
      width="16px" height="16px"
      viewBox="0 0 75 75">
        <g id="g1">
          <polygon
            id="polygon1"
            points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769"
            style="stroke:#111111;stroke-width:5;stroke-linejoin:round;fill:${color};"
          />
      
          <path 
            id="path1"
            d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577"
            style="fill:none;stroke:#111111;stroke-width:5;stroke-linecap:round"
          />
      
          <path 
            id="path2"
            d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076"
            style="fill:none;stroke:#111111;stroke-width:5;stroke-linecap:round"
          />
      
          <path 
            id="path1"
            d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01"
            style="fill:none;stroke:#111111;stroke-width:5;stroke-linecap:round
          "/>
        </g>
      </svg>
      `;
  }

  getIcon = (zoom) => {
    let value = 0;
    if (this.props.noiseLevel.LAmax && this.props.noiseLevel.LAmax.value) {
      value = this.props.noiseLevel.LAmax.value
    }

    let color = "#111111";
    if (value > 80) {
      color ="#ff0000";
    } else if (value < 80 && value > 70) {
      color ="#f4c542";
    } else if (value < 70 && value > 0) {
      color ="#00ff00"; 
    }

    return L.divIcon({
      html: zoom >= 14 ? this.renderSpeakerIcon(color) : '<div style="display:none;"></div>',
      iconSize: [16, 16],
      className: 'cursor-pointer',
    });
  };

  render() {
    let coordinates = null;
    let value = null;

    if (this.props.noiseLevel.LAmax && this.props.noiseLevel.LAmax.value) {
      value = `${this.props.noiseLevel.LAmax.value} dB(A)`;
    }

    if (this.props.noiseLevel.location && this.props.noiseLevel.location.value) {
      coordinates = this.props.noiseLevel.location.value.coordinates;
    }

    if (!isBrowser || !coordinates) {
      return false;
    }

    return (
      <GenericMarker
        position={{
          lat: coordinates[1],
          lon: coordinates[0]
        }}
        getIcon={this.getIcon}
        id={this.props.noiseLevel.id}
      >
      {value &&
        <NoiseSensorPopup 
          lat={coordinates[1]}
          lon={coordinates[0]}
          value={value}
        />
      }
      </GenericMarker>
    );
  }
}
