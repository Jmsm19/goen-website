### Simple buttons

```jsx
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Button
    text='Primary'
    type='primary'
    onClick={() => console.log('Button clicked')} />
  <Button
    text='Secondary'
    type='secondary'
    onClick={() => console.log('Button clicked')} />
  <Button
    text='Success'
    type='success'
    onClick={() => console.log('Button clicked')} />
  <Button
    text='Danger'
    type='danger'
    onClick={() => console.log('Button clicked')} />
</div>
```

### Outline buttons

```jsx
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Button
    outline
    text='Primary'
    type='primary'
    onClick={() => console.log('Button clicked')} />
  <Button
    outline
    text='Secondary'
    type='secondary'
    onClick={() => console.log('Button clicked')} />
  <Button
    outline
    text='Success'
    type='success'
    onClick={() => console.log('Button clicked')} />
  <Button
    outline
    text='Danger'
    type='danger'
    onClick={() => console.log('Button clicked')} />
</div>
```

### Full width buttons

```jsx
<div style={{display: 'grid', gridGap: '10px'}}>
  <Button
    fullWidth
    text='Primary'
    type='primary'
    onClick={() => console.log('Button clicked')} />
  <Button
    fullWidth
    text='Success'
    type='success'
    onClick={() => console.log('Button clicked')} />
</div>
```