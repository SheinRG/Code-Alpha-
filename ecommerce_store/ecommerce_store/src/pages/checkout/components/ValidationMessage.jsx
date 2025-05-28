import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationMessage = ({ message, type = 'error', className = '' }) => {
  const typeStyles = {
    error: 'text-error bg-red-50 border-red-200',
    success: 'text-success bg-green-50 border-green-200',
    warning: 'text-warning bg-yellow-50 border-yellow-200',
    info: 'text-info bg-blue-50 border-blue-200'
  };

  const iconNames = {
    error: 'AlertCircle',
    success: 'CheckCircle',
    warning: 'AlertTriangle',
    info: 'Info'
  };

  if (!message) return null;

  return (
    <div className={`flex items-center space-x-2 text-xs px-3 py-2 rounded-md border ${typeStyles[type]} ${className}`}>
      <Icon 
        name={iconNames[type]} 
        size={14} 
        className={`flex-shrink-0 ${type === 'error' ? 'text-error' : type === 'success' ? 'text-success' : type === 'warning' ? 'text-warning' : 'text-info'}`}
      />
      <span>{message}</span>
    </div>
  );
};

export default ValidationMessage;