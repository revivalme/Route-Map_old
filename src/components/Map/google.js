import React from 'react';

import './Map.css';

class Map extends React.Component {
  componentDidMount() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 55.751, lng: 37.618},
      zoom: 4
    });
    this.markers = [];
    this.polyline = new window.google.maps.Polyline({
      map: this.map,
      geodesic: false,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  }

  componentDidUpdate() {
    this.clearOverlays();

    if (this.props.routes.length) {
      this.props.routes.forEach(({ position, address, id }) => {
        const infoWindow = new window.google.maps.InfoWindow({ content: address });
        const marker = new window.google.maps.Marker({
          map: this.map,
          position,
          draggable: true,
          title: address
        });
        marker.addListener('click', () => infoWindow.open(this.map, marker));
        marker.addListener('dragend', ({latLng}) => this.props.onDragMarker(id, { lat: latLng.lat(), lng: latLng.lng() }));
        this.markers.push(marker);
      });

      this.map.setCenter(this.markers[this.markers.length - 1].position);

      this.polyline.setPath(
        this.props.routes.map(({position}) => position)
      );
    }
  }

  clearOverlays = () => {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers.length = 0;
  }

  render() {
    return <div id="map"></div>
  }
}

export default Map;