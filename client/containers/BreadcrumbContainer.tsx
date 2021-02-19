import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

interface IProps {
  isDashboard?: boolean;
  displayAtRoot?: boolean;
}

/**
 * Container for handling breadcrumbs. Will render breadcrumbs
 * based on current location. Breadcrumbs will not render
 * when path is part of roots, i.e '/' and '/admin'.
 */
export const BreadcrumbContainer: React.FC<IProps> = ({ isDashboard, displayAtRoot }: IProps) => {
  const location = useLocation();
  const [paths, setPaths] = useState<Array<string>>([]);

  const roots: { [key: string]: string } = {
    '': 'Hjem',
    admin: 'Dashboard',
  };

  const shouldRender = (): boolean => {
    const path = location.pathname.replace('/', '');
    if (path in roots && !displayAtRoot) {
      return false;
    } else {
      return true;
    }
  };

  const justifyCasing = (path: string): string => {
    var words = path.toLowerCase().split('_');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
  };

  const renderPath = (path: string): { link: string; name: string } => {
    var link, name;
    if (path in roots) {
      link = '/' + path;
      name = roots[path];
    } else {
      link = path;
      name = justifyCasing(path);
    }

    return { link, name };
  };

  useEffect(() => {
    var pathPieces = _.uniq(location.pathname.split('/'));
    if (isDashboard) {
      pathPieces = _.filter(pathPieces, (path) => path !== '');
    }
    setPaths([...pathPieces]);
  }, [location]);

  return (
    <div className='breadcrumbs-wrapper'>
      {shouldRender() && (
        <Breadcrumb>
          {paths.length > 0 &&
            paths.map((path) => {
              const { link, name } = renderPath(path);

              return (
                <Breadcrumb.Item key={link}>
                  <Link to={link}>{name}</Link>
                </Breadcrumb.Item>
              );
            })}
        </Breadcrumb>
      )}
    </div>
  );
};

BreadcrumbContainer.defaultProps = {
  isDashboard: false,
  displayAtRoot: false,
};
