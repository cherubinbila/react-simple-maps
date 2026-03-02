# Changelog

## v3.0.4

- Fixed security vulnerabilities via npm overrides (serialize-javascript, braces, micromatch)

## v3.0.3

- Updated dependencies (Babel 7.29, Rollup 2.80, Mocha 10, etc.)
- Replaced deprecated `rollup-plugin-terser` with `@rollup/plugin-terser`
- Added `prepublishOnly` and `version` scripts

## v3.0.2

- Added TypeScript type definitions (`index.d.ts`)
- Uses `GeoPath` and `GeoProjection` from d3-geo
- Added JSDoc comments for default values

## v3.0.1

- Fork published as `@cherubinbila/react-simple-maps`
- Added React 19 support in peerDependencies
- Fixed memory leak in `useZoomPan` hook (cleanup on unmount)
- Added `filterZoomEvent` to PropTypes in `ZoomableGroup`

## v3.0.0 (2022-07-25)

- Added `forwardRef` to mapping components
- Added `ZoomPanContext` and `ZoomPanProvider`
- Added `useZoomPanContext` and `useMapContext` hooks
- Added support for React 18
