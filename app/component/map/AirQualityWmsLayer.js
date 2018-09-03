import PropTypes from 'prop-types';
import React from 'react';
import WMSTileLayer from 'react-leaflet/es/WMSTileLayer';
import moment from 'moment';

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
    this.state = {date: moment().startOf('hour').toISOString()};
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateTime(), 1000 * 60 * 5);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime() {
    this.setState({
      date: moment().startOf('hour').toISOString()
    });
  }

  render() {
    const styles = this.props.styles || "";

    return (
      <WMSTileLayer
        layers={this.props.layers}
        styles={styles}
        format={this.props.format}
        transparent={this.props.transparent}
        url={`${this.props.url}?time=${this.state.date}`}
      />
    );
  }
}
