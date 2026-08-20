import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from './astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Button_BHopYc5W.mjs';

const $$Astro = createAstro();
const $$BackBTN = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BackBTN;
  const { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="absolute top-4 left-4"> <a aria-label="Go back button"${addAttribute(href, "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "back", "class": "w-7.5 h-7.5" })} </a> </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/global/headers/BackBTN.astro", void 0);

export { $$BackBTN as $ };
