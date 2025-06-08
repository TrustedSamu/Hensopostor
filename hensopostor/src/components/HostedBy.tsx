import React from 'react';
import './HostedBy.css';

const HostedBy: React.FC = () => {
  return (
    <div className="hosted-by">
      <span>Hosted by</span>
      <img 
        src="/New_Full_White-Red.png" 
        alt="Company Logo" 
        className="company-logo"
      />
    </div>
  );
};

export default HostedBy; 