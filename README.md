# USE EV

A simple useEvent hook for React.

Like `useCallback` and `useMemo`, but for events. It with never cause a re-render. And, will always "see" the latest version of all variables.

```ts
import { useEvent } from 'use-ev';

const onClick = useEvent(() => {
  console.log('clicked');
});

return <button onClick={onClick}>Click me</button>;
```

## License

MIT