### Basic table
```jsx

const columns = [
  {
    key: 'name',
    colText: 'Name',
  },
  {
    key: 'lastName',
    colText: 'Last Name'
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
    colText: 'Name',
  },
  {
    key: 'lastName',
    colText: 'Last Name'
  }
];

<Table title='Users' columns={columns} noData='No users' />
```