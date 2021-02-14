import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState, OptionState, PartnerEntity } from '@/types';
import { fetchPartners } from '@/state/ducks/partner/actions';
import { Footer } from '@/components/Footer';

export const FooterContainer = () => {
  const dispatch = useDispatch();
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  const partners: PartnerEntity[] = useSelector(({ partner }: IApplicationState) => partner.data);

  const stateToProps = {
    options,
    partners,
  };

  const dispatchToProps = {
    fetchPartners: useCallback(() => dispatch(fetchPartners()), [dispatch]),
  };

  return <Footer {...stateToProps} {...dispatchToProps} />;
};
