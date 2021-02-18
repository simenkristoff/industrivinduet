import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IApplicationState, OptionState, PartnerEntity } from '@/types';
import { fetchPartners } from '@/state/ducks/partner/actions';
import { Footer } from '@/components/Footer';

/**
 * Container for Footer component. Will stretch the main content height
 * on mount in order to push the footer to the very bottom of the page.
 */
export const FooterContainer = () => {
  const dispatch = useDispatch();
  const options: OptionState = useSelector(({ options }: IApplicationState) => options);
  const partners: PartnerEntity[] = useSelector(({ partner }: IApplicationState) => partner.data);

  useEffect(() => {
    var observer: MutationObserver | null = null;
    const height = document.getElementsByClassName('site-footer')[0].clientHeight;
    const divElement = (document.getElementsByClassName(
      'main-container',
    ) as HTMLCollectionOf<HTMLElement>)[0];
    if (divElement && height) {
      justifyContentWrapper(divElement, height);
    } else {
      observer = new MutationObserver(() => {
        const height = document.getElementsByClassName('site-footer')[0].clientHeight;
        const divElement = (document.getElementsByClassName(
          'main-container',
        ) as HTMLCollectionOf<HTMLElement>)[0];
        if (divElement && height) {
          (observer as MutationObserver).disconnect();
          justifyContentWrapper(divElement, height);
        }
      });
      observer.observe(document, { subtree: true, childList: true });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const justifyContentWrapper = (div: HTMLElement, height: number) => {
    div.style.minHeight = `calc(100% - ${height}px )`;
  };

  const stateToProps = {
    options,
    partners,
  };

  const dispatchToProps = {
    fetchPartners: useCallback(() => dispatch(fetchPartners()), [dispatch]),
  };

  return <Footer {...stateToProps} {...dispatchToProps} />;
};
