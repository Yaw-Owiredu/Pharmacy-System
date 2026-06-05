/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { usePharmacyPresenter } from './presenters/PharmacyPresenter';
import { MainView } from './views/MainView';
import { AppView } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [inventoryFilter, setInventoryFilter] = useState<string | null>(null);
  const presenter = usePharmacyPresenter();

  const handleNavigate = (view: AppView, filter: string | null = null) => {
    setCurrentView(view);
    setInventoryFilter(filter);
  };

  return (
    <MainView
      view={currentView}
      setView={handleNavigate}
      inventoryFilter={inventoryFilter}
      setInventoryFilter={setInventoryFilter}
      medicines={presenter.medicines}
      sales={presenter.sales}
      suppliers={presenter.suppliers}
      adjustments={presenter.adjustments}
      users={presenter.users}
      stats={presenter.stats}
      actions={presenter.actions}
      loading={presenter.loading}
    />
  );
}
