/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './views/Dashboard';
import SplitSelection from './views/SplitSelection';
import ExerciseSelection from './views/ExerciseSelection';
import WorkoutLogger from './views/WorkoutLogger';
import HistoryView from './views/History';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="workouts" element={<SplitSelection />} />
          <Route path="workouts/:splitId" element={<ExerciseSelection />} />
          <Route path="workouts/:splitId/log" element={<WorkoutLogger />} />
          <Route path="history" element={<HistoryView />} />
          <Route path="stats" element={<HistoryView />} /> {/* Simple alias for demo */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
