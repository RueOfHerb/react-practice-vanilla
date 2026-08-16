# Pokédex Team-Builder

A practice project for core React fundamentals, built on Vite, React 19, and TypeScript. The goal isn't the app itself, it's using the app as a reason to deliberately hit most of core React (state, effects, refs, context, reducers, memoization, the React 19 additions) before layering in a router.

## What it is

A single-page Pokédex for the original 151 Pokémon:

- Browse and search the full roster, filter by type
- Drill into a detail view for stats, abilities, height, and weight
- Build a personal team, capped at 6
- Leave a note or rating on a Pokémon through a form that hits a real (simulated) write endpoint, with the UI updating optimistically ahead of the network response

There's no router yet on purpose. View-switching (list → detail, team building) runs on local state until a later phase swaps part of it for React Router. Building the manual version first is meant to make it obvious what the router actually buys you.

## Data sources

- **PokeAPI (reads)**: [pokeapi.co](https://pokeapi.co), `/pokemon`, `/pokemon/{name}`, `/type/{type}`. Free, no key. The list endpoint only returns name + url, so Pokémon detail (sprite, types) is a second fetch per entry.
- **DummyJSON (simulated writes)**: [dummyjson.com](https://dummyjson.com), `/comments/add`. Fakes a real write without persisting anything. Used purely to practice a genuine request/response round trip for the form and optimistic-update phases, since PokeAPI is read-only.

## Stack

- Vite 8, React 19, TypeScript
- React Compiler enabled (auto-memoization at build time)
- ESLint 10, flat config

## Status

Scaffolded; still the default Vite template in `src/App.tsx`. Nothing Pokédex-specific has been built yet.

## Build plan

No routing until Phase 10. Everything before that runs on local state on purpose, so it's obvious what the router replaces once it shows up.

### Phase 1: Static shell
Build `PokemonCard` and the grid against 2–3 hardcoded fake objects, no network yet.
**Practices:** JSX & props, `children`, list rendering, `key`.
**Done when:** the grid works identically whether the fake array has 3 items or 30.

### Phase 2: Real data, the classic way
Fetch the gen-1 list, then fetch each Pokémon's own detail for sprite + types. Try it sequentially first, then switch to `Promise.all`.
**Practices:** `useState`, `useEffect`, `Promise.all`.
**Done when:** all 151 real sprites/names are on screen, and you can point to where sequential became parallel.

### Phase 3: Search & type filter
Client-side substring search over the already-fetched 151; a type filter that hits a real new endpoint on every switch.
**Practices:** `useDeferredValue`, `useTransition`, `useMemo`.
**Done when:** typing never stutters, and switching type filters shows a pending state instead of freezing.

### Phase 4: Detail view + modal
A full detail view (stats/abilities) plus a quick-view modal rendered through a portal.
**Practices:** conditional rendering, `createPortal`, `useRef`.
**Done when:** the modal traps focus sensibly and Escape/outside-click closes it.

### Phase 5: "My Team" via useReducer + Context
A team roster capped at 6, shared through context so it isn't prop-drilled through the grid.
**Practices:** `useReducer`, Context, `React.memo`, `useCallback`.
**Done when:** adding one Pokémon doesn't re-render the rest of the grid, and a 7th add is rejected.

### Phase 6: A real form
"Leave a note on this Pokémon," submitted with the React 19 form-action pattern against DummyJSON.
**Practices:** `useActionState`, `useFormStatus`, form `action`.
**Done when:** submitting disables the button and shows a real success/error state.

### Phase 7: Optimistic team-add
Team-add now fires a fake network request, with the UI updating before it resolves, including the rollback path.
**Practices:** `useOptimistic`.
**Done when:** you've triggered both a successful optimistic add and a forced failure, and the UI recovers cleanly.

### Phase 8: Resilience & code splitting
An error boundary around the grid (still needs a class component); the detail/modal view split into its own chunk.
**Practices:** error boundary, `React.lazy`, `Suspense`.
**Done when:** the network tab shows the detail view's code arriving in a separate chunk.

### Phase 9: Refactor pass with use()
Rebuild the detail-view fetch using `use()` instead of `useEffect`, to feel the tradeoff directly.
**Practices:** `use()`, `Suspense`.
**Done when:** the detail view's loading state is the Suspense fallback, no manual boolean left.

### Phase 10: React Router
`/pokemon/:name` replaces the state-based detail view; `/type/:name` replaces the filter.
**Practices:** React Router.
**Done when:** a Pokémon's detail page survives a browser refresh at its own URL.

## Commands

```bash
npm install
npm run dev      # dev server + HMR
npm run build    # tsc -b && vite build
npm run preview  # serve the production build locally
npm run lint
```
