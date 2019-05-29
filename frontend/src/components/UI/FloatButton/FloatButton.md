### Simple buttons

```jsx
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <FloatButton
    theme='Primary'
    onClick={() => console.log('Button clicked')}>
    Button
  </FloatButton>
  <FloatButton
    theme='Secondary'
    onClick={() => console.log('Button clicked')}>
    Button
  </FloatButton>
  <FloatButton
    theme='Success'
    onClick={() => console.log('Button clicked')}>
    Button
  </FloatButton>
  <FloatButton
    theme='Danger'
    onClick={() => console.log('Button clicked')}>
    Button
  </FloatButton>
</div>
```

### Full width buttons

```jsx
<div style={{ display: 'grid', gridGap: '10px' }}>
  <FloatButton
    block
    theme='Primary'
    onClick={() => console.log('Button clicked')}>
    Button
  </FloatButton>
  <FloatButton
    block
    theme='Success'
    onClick={() => console.log('Button clicked')}>
    Button
  </FloatButton>
</div>
```

### Disabled buttons
```jsx
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <FloatButton
    theme='Secondary'
    disabled>
    Button
  </FloatButton>
  <FloatButton
    theme='Success'
    disabled>
    Button
  </FloatButton>
  <FloatButton
    theme='Danger'
    disabled>
    Button
  </FloatButton>
</div>
```