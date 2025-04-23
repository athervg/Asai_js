import React from 'react';

const TitleBar2 = ({ children }) => {
  return (
    <div className="title-bar h-12 flex w-full" style={{ appRegion: 'drag', userSelect: 'none' }}>
      {/* <div className="w-40 bg-zinc-600 opacity-20 h-full border-r-10 border-green-800 border-opacity-10"></div> */}
      {children}
    </div>
  );
};

export default TitleBar2;