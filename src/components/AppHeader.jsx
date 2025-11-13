import React from 'react';
import './AppHeader.css';

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="course-info">
        <span className="course-code">CSI205</span>
        <span className="course-name">Advanced Computer Programming</span>
        <span className="course-group">Group L002</span>
      </div>
    </header>
  );
};

export default AppHeader;