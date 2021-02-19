import React from 'react';
import { useSelector } from 'react-redux';

import { IApplicationState, OptionState } from '@/types';
import { Contact } from '@/components/Contact';

/**
 * Container for Contact component.
 */
export const ContactContainer = () => {
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);

  const stateToProps = {
    options,
  };

  return <Contact {...stateToProps} />;
};
