import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({ 
  variant = 'navigation',
  trigger,
  children,
  items = [],
  value,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  const handleKeyDown = (event, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemSelect(item);
    }
  };

  if (variant === 'navigation') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef} {...props}>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-1 text-text-primary hover:text-primary transition-colors duration-150 font-medium"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger}
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="transition-transform duration-150"
          />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slide-down">
            {children || (
              items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'sort' || variant === 'filter') {
    const selectedLabel = selectedItem ? 
      (items.find(item => item.value === selectedItem)?.label || selectedItem) : 
      placeholder;

    return (
      <div className={`relative ${className}`} ref={dropdownRef} {...props}>
        <button
          onClick={toggleDropdown}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg 
            bg-white text-left transition-all duration-150
            ${isOpen ? 'border-primary ring-2 ring-primary ring-opacity-20' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'}
          `}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={selectedItem ? 'text-text-dark' : 'text-text-muted'}>
            {selectedLabel}
          </span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-muted transition-transform duration-150"
          />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-slide-down max-h-60 overflow-y-auto">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemSelect(item.value)}
                onKeyDown={(e) => handleKeyDown(e, item.value)}
                className={`
                  w-full text-left px-3 py-2 text-sm transition-colors duration-150
                  ${selectedItem === item.value 
                    ? 'bg-primary text-white' :'text-text-primary hover:bg-surface hover:text-primary'
                  }
                `}
                role="option"
                aria-selected={selectedItem === item.value}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {selectedItem === item.value && (
                    <Icon name="Check" size={16} />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'user') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef} {...props}>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 p-2 text-text-primary hover:text-primary transition-colors duration-150"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger || <Icon name="User" size={20} />}
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slide-down">
            {children || (
              <>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="ShoppingBag" size={16} />
                    <span>Orders</span>
                  </div>
                </a>
                <hr className="my-2 border-gray-200" />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </div>
                </a>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Dropdown;