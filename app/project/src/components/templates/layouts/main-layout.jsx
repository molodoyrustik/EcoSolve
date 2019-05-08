import React from 'react';

const MainLayout = (props) => {
  return (
    <div>
      <div className={`${props.secondPage ? 'container' : ''}`}>
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
