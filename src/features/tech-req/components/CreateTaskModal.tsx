import { Modal, TextInput, Textarea, Button, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useDispatch } from 'react-redux';
import { addTask } from '../slice';
import type { TabCategory } from '../models/types';

interface CreateTaskModalProps {
  opened: boolean;
  onClose: () => void;
  category: TabCategory;
}

export function CreateTaskModal({ opened, onClose, category }: CreateTaskModalProps) {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: '',
      specification: '',
    },
    validate: {
      name: (value) => (value.trim().length < 3 ? 'Task name must be at least 3 characters' : null),
      specification: (value) => (value.trim().length < 10 ? 'Specification must be at least 10 characters' : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    dispatch(addTask({
      name: values.name.trim(),
      specification: values.specification.trim(),
      category,
    }));
    notifications.show({
      title: 'Task Created',
      message: `Task "${values.name.trim()}" has been created successfully.`,
      color: 'green',
    });
    form.reset();
    onClose();
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`Create ${category === 'frontend' ? 'Frontend' : 'Backend'} Task`}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Task Name"
            placeholder="Enter task name"
            required
            {...form.getInputProps('name')}
          />
          <Textarea
            label="Specification"
            placeholder="Enter technical specification (Markdown supported)"
            required
            rows={10}
            autosize
            minRows={10}
            maxRows={20}
            {...form.getInputProps('specification')}
          />
          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Task
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
