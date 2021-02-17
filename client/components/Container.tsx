import React from 'react';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'default' | 'full';
  ghost?: boolean;
  children?: JSX.Element | JSX.Element[];
}

/**
 * Wrapper component to make sure the sub-components doesn't overflow
 * the screen size.
 */
export const Container: React.FC<IProps> = ({
  className,
  style,
  size,
  ghost,
  ...props
}: IProps) => {
  const classes: string[] = [];
  classes.push(size === 'full' ? 'container-full' : 'container');
  if (ghost) classes.push('is-ghost');
  if (className) {
    className.split(' ').forEach((_c) => {
      classes.push(_c);
    });
  }

  return (
    <div className={classes.join(' ')} style={style}>
      {props.children}
    </div>
  );
};

Container.defaultProps = {
  size: 'default',
  ghost: true,
};
