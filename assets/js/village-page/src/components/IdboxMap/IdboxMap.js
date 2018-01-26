/*
 * This component is used to display a map of markers
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import geolib from 'geolib';
import {GOOGLE_MAPS_API_KEY} from '../../constants';

export class IdboxMap extends Component { // Component is exported for testing without being connected to Redux
  render() {
    const {markerLocations} = this.props;

    // We get the center point between all of the marker points, that way all of the markers will be visible
    const centerPoint = geolib.getCenter(markerLocations);
    return (
      <div className="full-height">
        <Map
          google={this.props.google}
          zoom={2} // 2 = very far zoomed out (world view)
          initialCenter={{lat: centerPoint.latitude, lng: centerPoint.longitude}}
          className='relative full-height full-width'
        >
          {markerLocations.map((marker, i) => ( // Loop over all of the markers and display them
            <Marker
              name={marker.name}
              title={marker.name}
              position={marker}
              key={i}
            />
          ))}
        </Map>
      </div>
    );
  }
}

IdboxMap.propTypes = {
  markerLocations: PropTypes.array.isRequired
};

export default GoogleApiWrapper({
  apiKey: (GOOGLE_MAPS_API_KEY)
})(IdboxMap);
