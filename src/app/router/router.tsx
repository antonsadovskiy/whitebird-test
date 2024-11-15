import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { routes } from './routes.ts';

import App from '@/App.tsx';
import { PostsPage } from '@/pages/posts-page';
import { PostPage } from '@/pages/post-page';
import { LoginPage } from '@/pages/login-page';
import { PrivateRoutes } from '@/app/router/private-routes';
import { UsersPage } from '@/pages/users-page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root} element={<App />}>
      <Route path={routes.root} element={<Navigate to={routes.posts} />} />

      <Route path={routes.login} element={<LoginPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path={routes.posts} element={<PostsPage />} />
        <Route path={routes.post} element={<PostPage />} />
        <Route path={routes.users} element={<UsersPage />} />
      </Route>
    </Route>,
  ),
);
