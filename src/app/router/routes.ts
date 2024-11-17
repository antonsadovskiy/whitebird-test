export const routes = {
  root: '/',
  posts: '/posts',
  post: '/posts/:id',
  login: '/auth/login',
  users: '/users',
  userPosts: '/users/:id/posts',
  account: '/account',
  admin: '/admin',
  adminPosts: '/admin/posts',
};

export const routesList: { link: string; label: string }[] = [
  { link: routes.posts, label: 'Posts' },
  { link: routes.users, label: 'Users' },
  { link: routes.account, label: 'My account' },
  { link: routes.admin, label: 'Admin' },
];
