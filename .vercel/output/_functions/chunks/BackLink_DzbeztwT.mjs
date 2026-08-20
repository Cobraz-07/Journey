import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, n as renderSlot, r as renderTemplate } from './astro/server_BJAPvbWO.mjs';
import { tv } from 'tailwind-variants';
import 'clsx';
import 'kleur/colors';

const $$Astro$1 = createAstro();
const $$Label = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Label;
  const label = tv({
    base: [
      "text-foreground leading-none font-medium",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-[+:disabled]:cursor-not-allowed has-[+:disabled]:opacity-70"
    ],
    variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
    defaultVariants: { size: "md" }
  });
  const { size, class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(label({ size, class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </label>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/label/Label.astro", void 0);

const $$Astro = createAstro();
const $$BackLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BackLink;
  const { text, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="absolute bottom-8 w-full text-center"> <a aria-label="Custom text depending on page"${addAttribute(href, "href")} class="text-[var(--dk-brand-color)] text-[14px]">${text}</a> </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/forms/BackLink.astro", void 0);

export { $$Label as $, $$BackLink as a };
