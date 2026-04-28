import { Modal, Text } from '@mantine/core';
import Markdown from 'react-markdown';
import type { TechReqTask } from '../models/types';

interface TaskSpecificationModalProps {
  opened: boolean;
  onClose: () => void;
  task: TechReqTask | null;
}

export function TaskSpecificationModal({ opened, onClose, task }: TaskSpecificationModalProps) {
  if (!task) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={task.name}
      size="lg"
    >
      <Text size="sm" c="dimmed" mb="md">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </Text>
      <div style={{ lineHeight: 1.6 }}>
        <Markdown>{task.specification}</Markdown>
      </div>
    </Modal>
  );
}
