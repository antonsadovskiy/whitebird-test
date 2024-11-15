import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Input, message } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { useCallback } from 'react';
import { CheckOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

import { useAppStore } from '@/entities/store';

const schema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  name: z.string().min(1, { message: 'Name is required' }),
});

type EditProfileType = z.infer<typeof schema>;

export const AccountPage = () => {
  const user = useAppStore((state) => state.userData);
  const updateUserData = useAppStore((state) => state.updateUserData);

  const { handleSubmit, control } = useForm<EditProfileType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? '',
      name: user?.name ?? '',
      username: user?.username ?? '',
    },
  });

  const onSubmitHandler: SubmitHandler<EditProfileType> = useCallback(
    (data) => {
      updateUserData(data);
      message.success('Profile updated');
    },
    [updateUserData],
  );

  return (
    <Form className={styles.form} onFinish={handleSubmit(onSubmitHandler)}>
      <FormItem control={control} name="name">
        <Input placeholder="Name" />
      </FormItem>
      <FormItem control={control} name="email">
        <Input placeholder="Email" />
      </FormItem>
      <FormItem control={control} name="username">
        <Input placeholder="Username" />
      </FormItem>
      <Button icon={<CheckOutlined />} type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};
