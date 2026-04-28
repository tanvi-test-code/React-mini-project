import { Table, Badge, Button, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setActiveTask, deleteTask } from '../slice';
import { TaskSpecificationModal } from './TaskSpecificationModal';
import type { TabCategory, TechReqTask } from '../models/types';

interface TaskTableProps {
  category: TabCategory;
}

export function TaskTable({ category }: TaskTableProps) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) =>
    state.techReq.tasks.filter((t) => t.category === category)
  );
  const [viewTask, setViewTask] = useState<TechReqTask | null>(null);

  const handleSetActive = (task: TechReqTask) => {
    dispatch(setActiveTask({ taskId: task.id, category }));
    notifications.show({
      title: 'Active Task Updated',
      message: `"${task.name}" is now the active ${category} task.`,
      color: 'blue',
    });
  };

  const handleDelete = (task: TechReqTask) => {
    dispatch(deleteTask(task.id));
    notifications.show({
      title: 'Task Deleted',
      message: `"${task.name}" has been deleted.`,
      color: 'red',
    });
  };

  if (tasks.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl" size="lg">
        No {category} tasks yet. Click &quot;Create Task&quot; to add one.
      </Text>
    );
  }

  return (
    <>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Task Name</Table.Th>
            <Table.Th style={{ width: 120 }}>Status</Table.Th>
            <Table.Th style={{ width: 150 }}>Created Date</Table.Th>
            <Table.Th style={{ width: 200 }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tasks.map((task) => (
            <Table.Tr key={task.id}>
              <Table.Td>
                <Text
                  component="button"
                  onClick={() => setViewTask(task)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                    color: 'var(--mantine-color-blue-6)',
                    font: 'inherit',
                  }}
                >
                  {task.name}
                </Text>
              </Table.Td>
              <Table.Td>
                <Badge color={task.isActive ? 'green' : 'gray'} variant="filled">
                  {task.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td>
                {new Date(task.createdAt).toLocaleDateString()}
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    size="xs"
                    variant={task.isActive ? 'default' : 'light'}
                    disabled={task.isActive}
                    onClick={() => handleSetActive(task)}
                  >
                    {task.isActive ? 'Active' : 'Set Active'}
                  </Button>
                  <Button
                    size="xs"
                    variant="light"
                    color="red"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <TaskSpecificationModal
        opened={viewTask !== null}
        onClose={() => setViewTask(null)}
        task={viewTask}
      />
    </>
  );
}
