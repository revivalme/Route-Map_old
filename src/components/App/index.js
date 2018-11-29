import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';


import './App.css';
import SideBar from '../SideBar';
import Map from '../Map/google';

class App extends React.Component {
  state = {
    routes: []
  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder();
  }

  onDragMarker = (id, position) => {
    this.geocoder.geocode({location: position}, (results, status) => {
      if (status === 'OK') {
        this.setState({
          routes: this.state.routes.map(route => 
            route.id === id ? { ...route, address: results[0].formatted_address, position } : route)
        });
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }

  onAddRoute = (address) => {
    this.geocoder.geocode({address}, (results, status) => {
      if (status === 'OK') {
        const id = new Date().getTime();
        this.setState({
          routes: [
            ...this.state.routes,
            { 
              id,
              address: results[0].formatted_address,
              position: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
            }
          ]
        });
      } else {
        alert(`Geocode was not successful to this address: '${address}'\nfor the following reason: ${status}`);
      }
    });
  }

  onDeleteRoute = (id) => {
    this.setState({
      routes: this.state.routes.filter(route => route.id !== id)
    });
  }

  onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) {
      return;
    }

    
    const newRoutes = this.state.routes;
    const sourceItem = newRoutes[source.index];
    newRoutes.splice(source.index, 1);
    newRoutes.splice(destination.index, 0, sourceItem);
    this.setState({ routes: newRoutes })
  }

  render() {
    return (
      <div className="app">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <SideBar 
            routes={this.state.routes}
            onAddRoute={this.onAddRoute}
            onDeleteRoute={this.onDeleteRoute} />
        </DragDropContext>
        <Map 
          routes={this.state.routes} 
          onDragMarker={this.onDragMarker} />
      </div>
    );
  }
}

export default App;