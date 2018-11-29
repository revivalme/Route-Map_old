import React from 'react';

import './SideBar.css';
import AddRoutePanel from '../AddRoutePanel';
import RouteList from '../RouteList';

const SideBar = (props) => {
  return (
    <div className="side-bar">
      <AddRoutePanel onAddRoute={props.onAddRoute} />
        <RouteList 
          routes={props.routes} 
          onDeleteRoute={props.onDeleteRoute}
        />
    </div>
  );
};

export default SideBar;