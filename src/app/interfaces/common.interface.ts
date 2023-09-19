export interface ISelect<T> {
  label: string;
  value: T;
}

export interface IGroupSelect<T> {
  label: string;
  value: T;
  items: ISelect<T>[];
}

export interface IToggle<T> {
  label: string;
  value: T;
}

export interface IGetTaskFiltersParams {
  search: string;
  sort: string;
  group: string;
}
