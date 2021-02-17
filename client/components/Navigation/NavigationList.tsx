import React from 'react';

import { NavigationListInterface } from './interface';

/**
 * Wrapper for navigation items. Each NavigationList
 * can be aligned left | center | rigth.
 */
export const NavigationList: React.FC<NavigationListInterface> = (props) => {
  const { align, className }: NavigationListInterface = props;
  const classes: string[] = ['nav-list'];
  if (align) classes.push(align);
  if (className) {
    className.split(' ').forEach((_c) => {
      classes.push(_c);
    });
  }

  return <ul className={classes.join(' ')}>{props.children}</ul>;
};

NavigationList.defaultProps = {
  align: 'left',
};
