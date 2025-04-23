// src/renderer/App.jsx
import React from 'react';
import SideBar from '../components/layout/SideBar';
import MainBody from '../components/layout/MainBody';


const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* <TitleBar /> */}
      <div className="flex flex-1">
        <SideBar />
        <MainBody />
      </div>
    </div>
  );
};

function App() {
  return (
      <div>
        <Layout/>
      </div>
  );
}

export default App;