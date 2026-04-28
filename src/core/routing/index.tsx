import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';

const TechReqPage = lazy(() => import('@/features/tech-req/pages/TechReqPage'));

function LoadingFallback() {
  return (
    <Center h="100vh">
      <Loader size="lg" />
    </Center>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/tech-req" element={<TechReqPage />} />
          <Route path="*" element={<Navigate to="/tech-req" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
