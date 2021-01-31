import React from 'react';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'default' | 'full';
  ghost?: boolean;
  children?: JSX.Element | JSX.Element[];
}
const Container: React.FC<IProps> = (props: IProps) => {
  let classes = props.size === 'full' ? 'container-full ' : 'container ';
  if (props.ghost) classes += ' is-ghost ';
  if (props.className) classes += props.className;

  return (
    <div className={`${classes}`} style={props.style}>
      {props.children}
    </div>
  );
};

Container.defaultProps = {
  size: 'default',
  ghost: true,
};

export default Container;
