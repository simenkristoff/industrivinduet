/**
 * Interface for navigation wrapper
 * @interface NavigationInterface
 */
export interface NavigationInterface {
  id?: string;
  logo?: string;
  toggler?: React.ReactNode;
  className?: string;
}

/**
 * Interface for navigation list
 * @interface NavigationListInterface
 */
export interface NavigationListInterface {
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Interface for navigation item
 * @interface NavigationItemInterface
 */
export interface NavigationItemInterface {
  to?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

/**
 * Type definition of Navigation component
 * @typedef NavigationType<P>
 */
export type NavigationType = React.FC<NavigationInterface> & {
  List: React.FC<NavigationListInterface>;
  Item: React.FC<NavigationItemInterface>;
};
