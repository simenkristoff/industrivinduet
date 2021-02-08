import React from 'react';
import { SocialOptions } from '@/state/ducks/option/types';
import { FacebookFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';

enum IconSize {
  'small' = '16px',
  'default' = '24px',
  'large' = '32px',
}

interface IProps {
  socials: SocialOptions;
  theme?: 'dark' | 'light' | 'primary';
  className?: string;
  size?: 'small' | 'default' | 'large';
}

export const Socials: React.FC<IProps> = ({ socials, theme, className, size }: IProps) => {
  if (Object.keys(socials).length < 1) return null;

  const { facebook, instagram, linkedin } = socials;

  return (
    <ul
      className={`socials ${theme} ${className && className}`}
      style={{ fontSize: size ? IconSize[size] : '24px' }}
    >
      <li>
        <a href={facebook.link}>
          <FacebookFilled />
        </a>
      </li>
      <li>
        <a href={instagram.link}>
          <InstagramFilled />
        </a>
      </li>
      <li>
        <a href={linkedin.link}>
          <LinkedinFilled />
        </a>
      </li>
    </ul>
  );
};

Socials.defaultProps = {
  theme: 'light',
  size: 'default',
};
