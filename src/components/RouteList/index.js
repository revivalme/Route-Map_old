import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import './RouteList.css';
import RouteItem from '../RouteItem';

const RouteList = ({ routes, onDeleteRoute }) => {
  return (
    <Droppable droppableId="droppable-1">
      {provided => (
        <div
          className="route-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {routes.map((route, index) => 
            <RouteItem 
              key={route.id} 
              id={route.id}
              index={index}
              name={route.address}                       
              onDeleteRoute={onDeleteRoute} 
            />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default RouteList;