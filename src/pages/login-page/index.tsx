import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

import { useAppStore } from '@/entities/store';
import { routes } from '@/app/router/routes.ts';

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Email is invalid' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  isAdmin: z.boolean(),
});

type LoginType = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginType>({
    defaultValues: {
      isAdmin: false,
    },
    resolver: zodResolver(schema),
  });

  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);
  const setUserData = useAppStore((state) => state.setUserData);

  const onSubmitHandler: SubmitHandler<LoginType> = useCallback(
    (data) => {
      setIsLoggedIn(true);
      setUserData({
        id: 23,
        name: 'Test name',
        username: 'User name',
        email: data.email,
        isAdmin: data.isAdmin,
      });

      navigate(data.isAdmin ? routes.admin : routes.posts);
    },
    [navigate, setIsLoggedIn, setUserData],
  );

  return (
    <Form className={styles.form} onFinish={handleSubmit(onSubmitHandler)}>
      <Typography.Title level={4} className={styles.title}>
        Login
      </Typography.Title>
      <FormItem control={control} name="email">
        <Input placeholder="Email" />
      </FormItem>
      <FormItem control={control} name="password">
        <Input.Password placeholder="Password" />
      </FormItem>
      <FormItem control={control} name="isAdmin">
        <Checkbox>As admin</Checkbox>
      </FormItem>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};
