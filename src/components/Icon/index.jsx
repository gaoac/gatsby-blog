import React from 'react';
import './index.less';

const Icon = ({ type, className, color }) => (
  <i className={`anicon ${className || ''}`}>
    <svg className="icon" currentColor={color} aria-hidden="true">
      <use xlinkHref={`#${type}`} />
    </svg>
  </i>
);

export default Icon;
