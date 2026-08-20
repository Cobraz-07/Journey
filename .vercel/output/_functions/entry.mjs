import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CM5OK8Hh.mjs';
import { manifest } from './manifest_BgWnJYCJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/session.astro.mjs');
const _page2 = () => import('./pages/authenticated/trips/_tripid_.astro.mjs');
const _page3 = () => import('./pages/authenticated/trips.astro.mjs');
const _page4 = () => import('./pages/authenticated.astro.mjs');
const _page5 = () => import('./pages/register.astro.mjs');
const _page6 = () => import('./pages/signin.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/session.ts", _page1],
    ["src/pages/authenticated/trips/[tripID].astro", _page2],
    ["src/pages/authenticated/trips.astro", _page3],
    ["src/pages/authenticated/index.astro", _page4],
    ["src/pages/register.astro", _page5],
    ["src/pages/signin.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "2097d4e5-7cb5-46ad-99c1-bd98de6a892b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
