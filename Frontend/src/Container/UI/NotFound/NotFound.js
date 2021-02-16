  
import React from 'react';
import './NotFound.css';
import broken from '../../../assets/Img/imbroken.gif'

function NotFound(props) {
    return (
      <div className="page-container">
        <div className="bg" style={{ backgroundImage: 'url(' + broken + ')'}}></div>
        <h1 className="title">404 Page Not Found</h1>
      </div>
    )
}


export default NotFound;