### Basic input (with shadow)
```jsx
<div style={{display: 'grid', gridGap: '10px'}}>
  <Input placeholder="email@example.com" />
</div>
```

### Flat input
```jsx
<div style={{display: 'grid', gridGap: '10px'}}>
  <Input flat placeholder="email@example.com" />
</div>
```

### Input states
```jsx
<div style={{display: 'grid', gridGap: '10px'}}>
  <p>Basic</p>
  <Input validationStatus="success" placeholder="email@example.com" />
  <Input validationStatus="error" placeholder="email@example.com" />
  <Input placeholder="email@example.com" disabled />

  <p>Flat</p>
  <Input validationStatus="success" flat placeholder="email@example.com" />
  <Input validationStatus="error" flat placeholder="email@example.com" />
  <Input flat placeholder="email@example.com" disabled />
</div>
```