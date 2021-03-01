# nexe test

This repo tests out bundling a small node script into a static binary using [nexe](https://github.com/nexe/nexe).

The script:

- Is compiled with babel.
- Uses packages from npm (`moment` in this case).
- Uses packages from npm with native code (`node-pty` in this case).
- Uses `fs` to read files at runtime.

## Caveats

You have to copy the `.node` files for the native code in to a `node_modules` folder adjacent to the final binary for it to load them. They have to be in the same location they were in `node_modules` after running `yarn install`. However, you don't need to have anything except the `.node` files.

## Building

```
yarn install
yarn build
```

## Running

```
./build/app
```

## Distributing

You can move the contents of the `build` folder elsewhere and run the binary, and things should still work.
