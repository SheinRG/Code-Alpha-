import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-8" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-subtle" />
          )}
          {item.current ? (
            <span className="text-text-muted font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.href}
              className="text-text-primary hover:text-primary transition-colors duration-150"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;