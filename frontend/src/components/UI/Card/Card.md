### Basic hoverable card

```jsx
<Card title="Card title" hoverable>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum maxime dolor fugit magni, deleniti reprehenderit sunt temporibus quis quia recusandae. Aut at, minima enim ea fugit unde repellendus numquam. </p>
</Card>
```

### Card with image

```jsx
<Card title="Kani" image='/images/clans/kani.png'>
  <p>Kani is the best clan.</p>
</Card>
```

### Card with Shadow
```jsx
<Card title="Kame" image='/images/clans/kame.png' withShadow hoverable>
  <p>The wise kame people.</p>
  <p>Nah, they're just old.</p>
</Card>
```

### Custom width card

```jsx
<Card title="Card title" width="50%">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum maxime dolor fugit magni, deleniti reprehenderit sunt temporibus quis quia recusandae. Aut at, minima enim ea fugit unde repellendus numquam. </p>
</Card>
```

### Responsive or Full width card

You can place 100% in the _width_ prop or you can use the _fullWidth_ prop for convenience.

```jsx
<Card title="Card title" fullWidth>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum maxime dolor fugit magni, deleniti reprehenderit sunt temporibus quis quia recusandae. Aut at, minima enim ea fugit unde repellendus numquam. </p>
</Card>
```