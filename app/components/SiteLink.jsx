import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

const buildLink = (name, index, icon) => {
  return (
    <Link className={'link_' + name} key={index} to={'PizzaOrderSystem/' + (name == 'Home' ? '' : name.toLowerCase())}>{icon != null ? <Icon className="tag_name">{icon}</Icon> : ''}{name}</Link>
  );
};

export { buildLink };
