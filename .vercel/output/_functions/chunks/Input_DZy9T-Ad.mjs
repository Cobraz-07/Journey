import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, r as renderTemplate } from './astro/server_BJAPvbWO.mjs';
import { tv } from 'tailwind-variants';
import 'clsx';

const $$Astro = createAstro();
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Input;
  const input = tv({
    base: [
      "border-input bg-background text-foreground w-full rounded-md border",
      "focus:outline-outline focus:ring-0 focus:outline-2 focus:outline-offset-2",
      "file:text-foreground file:my-auto file:mr-4 file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "peer placeholder:text-muted-foreground"
    ],
    variants: {
      size: { sm: "h-9 px-2 text-sm", md: "h-11 px-3 text-base", lg: "h-12 px-4 text-lg" }
    },
    defaultVariants: { size: "md" }
  });
  const { size, class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<input${addAttribute(input({ size, class: className }), "class")}${spreadAttributes(rest)}>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/input/Input.astro", void 0);

export { $$Input as $ };
