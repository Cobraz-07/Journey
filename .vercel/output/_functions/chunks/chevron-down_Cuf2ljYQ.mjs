import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from './astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Button_DLkSxqWC.mjs';
import { c as createSvgComponent } from './runtime_Nslmv-Fb.mjs';

const $$Astro = createAstro();
const $$AppFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AppFooter;
  const { iconStateUser, iconStateHome } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="absolute w-full flex justify-evenly bottom-4 pt-2 border-t-1 border-gray-300"> <a aria-label="Home" href="/authenticated/trips"${addAttribute(`p-1 ${iconStateHome} rounded-lg`, "class")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "home", "class": "w-7.5 h-7.5" })} </a> <a aria-label="Settings" href="/authenticated/"${addAttribute(`p-1 ${iconStateUser} rounded-lg`, "class")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "user", "class": "w-7.5 h-7.5" })} </a> </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/global/footers/AppFooter.astro", void 0);

const ChevronDown = createSvgComponent({"meta":{"src":"/_astro/chevron-down.BlhSdpBn.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"},"children":"\n  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" />\n  <path d=\"M6 9l6 6l6 -6\" />\n"});

export { $$AppFooter as $, ChevronDown as C };
