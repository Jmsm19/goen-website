### Basic select
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
      text: t('Language.Japanese'),
      value: 'jpn',
      disabled: true,
    },
  ];

<Select name="language" options={options} onChange={value => console.log(value)} />
```