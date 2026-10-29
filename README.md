<a href="https://interfaces.dev/?utm_source=loading.dev">
  <img width="320" height="168" alt="interfaces.dev" src="https://ho1jr3x2dcwdu3t5.public.blob.vercel-storage.com/interfaces-og-image.png" />
</a>

Read more in [Interfaces](https://interfaces.dev/?utm_source=loading.dev), the first design engineering magazine.

# loading-dev

[![npm downloads](https://img.shields.io/npm/dt/loading-dev)](https://www.npmjs.com/package/loading-dev)

Beautiful loading indicators for React.

```sh
npm install loading-dev
```

```tsx
import { Arc } from "loading-dev";

<Arc size={16} />
```

All indicators support `size`, `color` and `duration`. Some also expose additional controls like `easing`, `cap` or spinner-specific props.

The library exposes `playState` and you can customize any indicator with your own styles.

The spinners respect reduced motion out of the box and require React 19 or later.

Current list of indicators:

`Arc`, `Atom`, `Blocks`, `BouncingDots`, `Cascade`, `CircularDots`, `Classic`, `ClassicV2`, `Clock`, `Comet`, `Compass`, `Dual`, `Eclipse`, `Flip`, `Gather`, `Leap`, `LinearDots`, `Loading`, `Morph`, `Orbit`, `Pulse`, `Radar`, `Ring`, `Ripple`, `Slide`, `Snake`, `Swirl`, `Trace`, `Wave`.

Docs and live previews are available at [loading.dev](https://loading.dev).

## License

MIT
