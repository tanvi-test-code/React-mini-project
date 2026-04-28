import { useState } from 'react';
import { Container, Title, Button, Group, Tabs, Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setActiveTab } from '../slice';
import { TaskTable } from '../components/TaskTable';
import { CreateTaskModal } from '../components/CreateTaskModal';
export default function TechReqPage() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.techReq.activeTab);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  const handleTabChange = (value: string | null) => {
    if (value === 'frontend' || value === 'backend') {
      dispatch(setActiveTab(value));
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Tech Requirements</Title>
          <Button onClick={() => setCreateModalOpened(true)}>
            Create Task
          </Button>
        </Group>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="frontend">Frontend</Tabs.Tab>
            <Tabs.Tab value="backend">Backend</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="frontend" pt="md">
            <TaskTable category="frontend" />
          </Tabs.Panel>

          <Tabs.Panel value="backend" pt="md">
            <TaskTable category="backend" />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <CreateTaskModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        category={activeTab}
      />
    </Container>
  );
}
