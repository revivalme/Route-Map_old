import React from 'react';

import './AddRoutePanel.css';

class AddRoutePanel extends React.Component {
  state = {
    value: ''
  }

  onInputChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.value !== '') {
      this.props.onAddRoute(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <form className="add-route-panel" onSubmit={this.onSubmit}>
        <input 
          type="text" 
          placeholder="Новая точка маршрута" 
          value={this.state.value} 
          onChange={this.onInputChange}
        />
      </form>
    );
  }
}

export default AddRoutePanel;