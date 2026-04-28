import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';

interface MantineAppProviderProps {
  children: ReactNode;
}

export function MantineAppProvider({ children }: MantineAppProviderProps) {
  return (
    <BaseMantineProvider>
      <Notifications position="top-right" />
      {children}
    </BaseMantineProvider>
  );
}
