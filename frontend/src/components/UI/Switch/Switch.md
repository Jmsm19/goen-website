### Basic switch
```jsx
 const options = [
    {
      text: 'Spanish',
      value: 'es',
    },
    {
      text: 'English',
      value: 'en',
    },
    {
      text: 'Japanese',
      value: 'jpn',
      disabled: true,
    },
  ];

<Switch
  enabled={false}
  onChange={(isEnabled) => console.log(isEnabled)}
/>
```