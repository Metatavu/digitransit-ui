import PropTypes from 'prop-types';
import React from 'react';
import WMSTileLayer from 'react-leaflet/es/WMSTileLayer';

export default class AirQualityWmsLayer extends React.Component {
  static propTypes = {
    layers: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    styles: PropTypes.string,
    format: PropTypes.string,
    transparent: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateTime(), 1000 * 60 * 5);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <WMSTileLayer
        layers={this.props.layers}
        styles={this.props.styles}
        format={this.props.format}
        transparent={this.props.transparent}
        url={`${this.props.url}&TIME=${this.state.date.toISOString()}`}
      />
    );
  }
}
