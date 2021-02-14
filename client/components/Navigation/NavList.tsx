import React from 'react';

interface IProps {
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const NavList: React.FC<IProps> = (props) => {
  const { align, className }: IProps = props;
  const classes: string[] = ['nav-list'];
  if (align) classes.push(align);
  if (className) {
    className.split(' ').forEach((_c) => {
      classes.push(_c);
    });
  }

  return <ul className={classes.join(' ')}>{props.children}</ul>;
};

NavList.defaultProps = {
  align: 'left',
};

export default NavList;
