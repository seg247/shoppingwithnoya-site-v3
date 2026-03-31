import { useState } from 'react';
import StickyNav from '../nav/StickyNav';
import DealFeed from '../feed/DealFeed';
import type { Deal } from '../../lib/data';

interface Props {
  initialDeals?: Deal[];
}

export default function App({ initialDeals }: Props) {
  return (
    <>
      <StickyNav onSearchClick={() => {
        // DealFeed manages its own search state; we dispatch a custom event
        window.dispatchEvent(new CustomEvent('noya:toggleSearch'));
      }} />
      <DealFeed initialDeals={initialDeals} />
    </>
  );
}
