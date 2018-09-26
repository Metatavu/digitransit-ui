import PropTypes from 'prop-types';
import React from 'react';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import MarkerPopupBottom from '../MarkerPopupBottom';
import { intlShape } from 'react-intl';

export default class NoiseSensorPopup extends React.Component {

  static contextTypes = {
    intl: intlShape.isRequired
  };

  static propTypes = {
    value: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: this.props.lat,
        lon: this.props.lon,
      },
    };
  }

  render() {
    return (
      <Card>
        <div className="padding-small">
          <CardHeader
            name={this.context.intl.formatMessage({
              id: 'noise-sensor-popup-title',
              defaultMessage: 'Noise level'
            })}
            description={this.props.value}
            unlinked
            className="padding-small"
          />
        </div>
      </Card>
    );
  }
}