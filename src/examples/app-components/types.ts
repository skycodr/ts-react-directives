import { ComponentType } from 'react';

export type ExampleEntry = {
  id: number;
  label: string;
  component: ComponentType;
};

export type AppMenuItemProps<T> = {
  handleSelection: (id: number) => void;
  active: T;
};

export type AppMenuProps<T> = { menuItems: T[] } & AppMenuItemProps<T>;

export type AppSourceLiveProps = {
  component: ComponentType;
};

export type AppSourceProps = {
  id: number;
  source: string;
};

export type AppExampleProps = AppSourceLiveProps & AppSourceProps;
