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
  <Input validationStatus="success" placeholder="Success" />
  <Input validationStatus="error" placeholder="Error" />
  <Input placeholder="Disabled" disabled />

  <p>Flat</p>
  <Input validationStatus="success" flat placeholder="Success" />
  <Input validationStatus="error" flat placeholder="Error" />
  <Input flat placeholder="Disabled" disabled />
</div>
```