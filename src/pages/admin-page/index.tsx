import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { useCallback } from 'react';

import styles from './styles.module.css';

import { routes } from '@/app/router/routes.ts';

export const AdminPage = () => {
  const navigate = useNavigate();

  const navigateToUsers = useCallback(() => {
    navigate(routes.users);
  }, [navigate]);

  const navigateToPosts = useCallback(() => {
    navigate(routes.adminPosts);
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Typography.Title level={2}>Opportunities</Typography.Title>
      <Button onClick={navigateToPosts}>Change posts positions in feed</Button>
      <Button onClick={navigateToUsers}>Edit users info</Button>
    </div>
  );
};
