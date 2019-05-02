### Basic table
```jsx

const columns = [
  {
    key: 'name',
    text: 'Name',
  },
  {
    key: 'lastName',
    text: 'Last Name'
  }
];

const users = [
  {
    name: 'Jorge',
    lastName: 'Soto'
  },
  {
    name: 'Gabriel',
    lastName: 'Flores'
  }
];

<Table title='Users' columns={columns} data={users} noData='No users' />
```

### Empty table
```jsx

const columns = [
  {
    key: 'name',
    text: 'Name',
  },
  {
    key: 'lastName',
    text: 'Last Name'
  }
];

<Table title='Users' columns={columns} noData='No users' />
```

### Loading data on table
```jsx

const columns = [
  {
    key: 'name',
    text: 'Name',
  },
  {
    key: 'lastName',
    text: 'Last Name'
  }
];

<Table title='Loading users' columns={columns} loading />
```