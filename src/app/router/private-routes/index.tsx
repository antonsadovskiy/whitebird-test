import { Navigate, Outlet } from 'react-router-dom';

import { useAppStore } from '@/entities/store';
import { routes } from '@/app/router/routes.ts';

export const PrivateRoutes = () => {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login} />;
};
