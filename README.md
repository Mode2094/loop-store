# LOOP — interactive concept storefront

Arabic RTL responsive fashion storefront with 36 catalog entries (18 designs, two color previews each), 7 product categories, gender/new/sale collections, Arabic search, combined filters, sorting, progressive catalog loading, product routes, quick view, size validation, favorites, a shared bag, coupon simulation and a three-step demo checkout. The original virtual showroom remains at `/studio.html` and links to the main product pages and bag.

## Run and validate

Buildless static HTML/CSS/JS. Serve `dist/` as the web root.

```sh
node --check dist/app.js
node --check dist/data.js
node tests/store.test.cjs
```

Site identity and publication settings are in `.openai/hosting.json`.

## Demo boundaries

- No real payments, fulfillment, account authentication or merchant order backend.
- Inventory, pricing, delivery estimates, offers and product specifications are examples.
- Images are generated concept assets. Alternate colors are digitally filtered previews.
- Cart, favorites and order summaries use browser localStorage. Orders are local demonstrations, never sent.
- Checkout address/phone are held only in page memory, then discarded. Demo order summaries exclude contact/address fields. Use fictional input.
- `LOOP10` applies 10% to product subtotal. Standard demo shipping is 3 JOD or free at 75 JOD after discount; express is 7 JOD.

## Before commercial launch

Replace demo catalog and policies with merchant-owned products, imagery, inventory and business information. Add authenticated backend order processing and an admin dashboard; validate price/stock on the server. Connect the chosen payment and delivery providers, implement webhooks and order notifications, and test tax, refund, failure and fulfillment paths. This client-only demo must not be represented as a production payment/order system.

## Assets

`dist/assets/garments.png`: six hanging garment sprites from the original showroom.
`dist/assets/catalog.png`: twelve generated product cutouts (bottoms, outerwear, footwear, bags and accessories), displayed through bounded SVG viewports.

## Immersive mall update

The default home route is now the spatial mall. Storefronts and the mall map lead to `#room/men`, `#room/women`, `#room/shoes`, `#room/bags` and `#room/accessories`. Each room filters the shared catalog, supports swipe/arrows/keyboard browsing, internal category tabs, quick-view sizing and the existing shared cart. Mobile mall navigation uses a horizontally scrollable panorama. This is a layered photographic/CSS experience, not a free-roaming 3D simulation.

Run `node tests/mall.test.cjs` for department coverage and carousel behavior. Current source checks and tests passed. Browser visual QA for this update was blocked by the browser URL policy; mobile appearance has not been visually verified for this revision.

## Full-screen guided mall tour

The entrance fills the viewport, with a floating header and a bounded photographic camera. Drag horizontally, use the left/right buttons, choose a facade or use the small location map to move between storefronts. Approach/back controls change camera distance; enter opens the existing interactive department room. Fullscreen uses the browser API when supported, with a clear fallback. There is no automatic camera movement; reduced-motion preferences disable transitions.

This is an interactive panoramic photographic tour, not a free-roaming 3D architectural model. The current single image cannot show unseen geometry or provide true 360-degree movement. Product shelves and procedural 3D previews remain removed. The map provides a full photograph overview and direct accessible destinations.

Tests: `node tests/walk.test.cjs`, `node tests/mall.test.cjs`, `node tests/store.test.cjs`. Browser visual verification remains unavailable because of the previously observed preview URL policy block.

## Grand Arcade visual identity

Locally hosted Alexandria Arabic and Cormorant Garamond fonts (OFL licenses alongside compressed WOFF assets), warm bronze/dark green controls, and illuminated facade signs. ZARA, MANGO, ALDO and CHARLES & KEITH are used as real brand names in an independent visual concept; the existing demo catalog is not represented as their inventory. The map explains this and room headers identify the products as illustrative. Camera navigation, reduced-motion behavior, and checkout remain unchanged.

## Quiet visual revision

Replaced the ornate bronze identity with neutral ivory/forest controls, unframed charcoal shop signs, restrained typography and a single compact navigation panel. Removed decorative side text, location duplication, English micro-headings, glowing signs and metallic treatments. Full-screen camera navigation, shop names and all shopping behaviors are retained. `clean.css` replaces `luxury.css`.

## Approved daylight concept implementation

Recreated the approved mockup with a new architectural background (`mall-daylight.png`), integrated physical storefront names, and facade hit areas aligned to the new image. The camera uses the asset's 3:2 ratio. Desktop starts with a broad corridor overview and a small lower-left store card; mobile starts at ZARA with a bottom store card and three-item dock. Added perspective floor arrows for approach, a floating light header and accessible map, fullscreen and return controls. Fullscreen tour, cart and department routes are preserved.

The background was generated with the built-in image tool using the approved mockup as a reference. Prompt: recreate the bright limestone mall, glass skylight, tree and integrated ZARA/MANGO/ALDO/CHARLES & KEITH facades as a full-bleed architectural asset without UI.

Source and camera tests pass; browser visual QA remains unavailable due to the previously observed preview policy block.

## Direct store entry

Click/tap a facade, select a store on the map, or use the enter button to open its department immediately. Removed camera zoom state, approach/return controls, up/down zoom shortcuts and delayed entry animation. Horizontal dragging and left/right storefront browsing remain at a fixed scale.

## Single-store experience

The active experience is now inside one LOOP boutique. `loop-shop-interior.png` is a new generated photo asset showing men's wall rails, a women's rack, footwear shelves, handbag shelves and an accessories island. All five spatial hit areas open their department immediately. External brand names and mall/storefront labels have been removed from the active interface. All departments use the same store interior; apparel stays on rails, shoes/bags/accessories use two-row product shelves. Shared search, favorites, cart and demo checkout remain in place. Fixed camera scale and horizontal panning retained; no approach/zoom. Short mobile shelf views can scroll to keep purchase controls reachable.

Background generated using the built-in image tool. Prompt: one coherent airy LOOP boutique viewed from inside, pale oak rails and shelves, five merchandise areas, central accessory table, no storefronts or shopping-mall corridors, no UI. Browser visual QA remains unverified due to the existing preview URL policy block.

## Mobile swipe-first navigation

On phones, hidden side arrow buttons, large entry card and fullscreen tool leave the shop scene unobstructed. Spatial department labels still open sections directly; the existing sections list remains an accessible tap alternative. A one-time hand cue demonstrates horizontal swiping and disappears immediately on drag or after 6.5 seconds, persisted locally. It never moves the camera. A noninteractive position indicator and faint edge hints show orientation; edge hints disappear at limits. Reduced-motion disables hand animation. Desktop controls are unchanged. Tests: `node tests/mobile-swipe.test.cjs`.
