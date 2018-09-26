import PropTypes from 'prop-types';
import React from 'react';
import NoiseSensorMarker from './NoiseSensorMarker';

export default class NoiseSensorMarkerContainer extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {noiseLevels: []};
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getNoiseLevels(), 1000 * 10);
    this.getNoiseLevels();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getNoiseLevels() {
    fetch(this.props.url)
      .then((response) => {
        return response.json();
      })
      .then((noiseLevels) => {
        this.setState({
          noiseLevels: noiseLevels
        });
      });
  }

  render() {

    const markers = this.state.noiseLevels.map((noiseLevel) => {
      return <NoiseSensorMarker 
        key={noiseLevel.id}
        noiseLevel={noiseLevel}
      />
    });

    if (markers.length < 1) {
      return false;
    }

    return (
      <div>
        {markers}
      </div>
    );
  }
}