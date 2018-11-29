import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './RouteItem.css';

const RouteItem = ({id, index, name, onDeleteRoute}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="route-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
        >
          {name}
          <i className="fas fa-times" onClick={() => onDeleteRoute(id)}></i>
        </div>
      )}
    </Draggable>
  );
};

export default RouteItem;