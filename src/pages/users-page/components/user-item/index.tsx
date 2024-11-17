import { Avatar, Button, Form, Input, List, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';

import styles from './styles.module.css';

import { UserType } from '@/entities/api/users/types.ts';
import { useAppStore } from '@/entities/store';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  username: z.string().min(1, { message: 'Username is required' }),
});

type EditUserType = z.infer<typeof schema>;

export const UserItem = ({ id, name, username, email }: UserType) => {
  const navigate = useNavigate();

  const isAdmin = useAppStore((state) => state.userData?.isAdmin);
  const updateUserInfo = useAppStore((state) => state.updateUserInfo);

  const { control, handleSubmit, reset } = useForm<EditUserType>({
    resolver: zodResolver(schema),
    values: {
      username,
      email,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const onSubmitHandler: SubmitHandler<EditUserType> = useCallback(
    (data) => {
      updateUserInfo(id, data);
      message.success('User updated');
      setIsEditing(false);
      reset();
    },
    [id, reset, updateUserInfo],
  );

  const cancelHandler = useCallback(() => {
    reset();
    setIsEditing(false);
  }, [reset]);

  const toggleEditMode = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const navigateToUserPosts = useCallback(() => {
    navigate(`/users/${id}/posts`);
  }, [navigate, id]);

  return (
    <Form onFinish={handleSubmit(onSubmitHandler)}>
      <List.Item
        key={id}
        actions={[
          <Button
            type="link"
            onClick={navigateToUserPosts}
            key="show-user-posts"
          >
            Show user posts
          </Button>,
          isAdmin && (
            <div key="admin-buttons" className={styles.editButtons}>
              {isAdmin && isEditing && (
                <Button key="save" htmlType="submit" type="primary">
                  Save
                </Button>
              )}
              {isAdmin && isEditing && (
                <Button key="cancel" onClick={cancelHandler}>
                  Cancel
                </Button>
              )}
              {isAdmin && !isEditing && (
                <Button key="edit" onClick={toggleEditMode}>
                  Edit user
                </Button>
              )}
            </div>
          ),
        ]}
      >
        <List.Item.Meta
          avatar={
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`}
            />
          }
          title={name}
        />
        <div className={styles.userInfo}>
          {isEditing ? (
            <FormItem control={control} name="email">
              <Input autoFocus placeholder="Email" />
            </FormItem>
          ) : (
            <Typography.Text>
              <strong>Email:</strong> {email}
            </Typography.Text>
          )}
          {isEditing ? (
            <FormItem control={control} name="username">
              <Input placeholder="Username" />
            </FormItem>
          ) : (
            <Typography.Text>
              <strong>Username:</strong> {username}
            </Typography.Text>
          )}
        </div>
      </List.Item>
    </Form>
  );
};
