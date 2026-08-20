import { e as createComponent, f as createAstro, r as renderTemplate, k as renderComponent, o as renderHead, n as renderSlot, m as maybeRenderHead, s as spreadAttributes, h as addAttribute, p as Fragment, u as unescapeHTML } from './astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';
import { getIconData, iconToSVG } from '@iconify/utils';
import { tv } from 'tailwind-variants';

const $$Astro$4 = createAstro();
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { title } = Astro2.props;
  return renderTemplate`<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"><link rel="manifest" href="/manifest.json"><!-- Basic Meta Tags --><title>${title}</title><meta name="description" content="An app for tracking your past trips, adding pictures and journaling."><meta name="keywords" content="Travel, Tracker, Journal"><meta name="author" content="COBRAZ"><!-- Favicons --><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon.svg"><link rel="android-chrome-192x192" href="/icon.svg"><link rel="android-chrome-512x512" href="/icon.svg"><!-- Favicon for IE --><link rel="shortcut icon" href="/icon.svg" type="image/x-icon"><!-- Canonical URL --><link rel="canonical" href="https://appjourney.vercel.app/"><!-- Additional SEO --><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow"><!-- Theme Color for Mobile Browsers --><meta name="theme-color" content="#ffffff"><!-- For IE --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/BaseHead.astro", void 0);

const $$Astro$3 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="jakarta text-[var(--text-color)] scroll-smooth selection:bg-accent"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title })}${renderHead()}</head> <body class="bg-[#f2f0eb] flex flex-col min-h-svh h-auto"> <main class="grow"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/layouts/BaseLayout.astro", void 0);

const $$Astro$2 = createAstro();
const $$TitleSimple = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TitleSimple;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-center my-4"> <div> <h1 class="text-[20px] font-extrabold">${title}</h1> </div> </section>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/global/headers/TitleSimple.astro", void 0);

const icons = {"local":{"prefix":"local","lastModified":1787254296,"icons":{"add":{"body":"<path fill=\"currentColor\" d=\"M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z\"/>"},"back":{"body":"<path fill=\"#121712\" d=\"m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60z\"/>"},"delete":{"body":"<path fill=\"#BB271A\" d=\"M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120zm400-600H280v520h400zM360-280h80v-360h-80zm160 0h80v-360h-80zM280-720v520z\"/>"},"home":{"body":"<path fill=\"#121712\" d=\"M160-120v-480l320-240 320 240v480H560v-280H400v280z\"/>"},"image":{"body":"<path fill=\"#121712\" d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120zm0-80h560v-560H200zm40-80h480L570-480 450-320l-90-120zm-40 80v-560z\"/>"},"pen":{"body":"<path fill=\"#121712\" d=\"m490-527 37 37 217-217-37-37zM200-200h37l233-233-37-37-233 233zm355-205L405-555l167-167-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678zM270-120H120v-150l285-285 150 150z\"/>"},"plane":{"body":"<path fill=\"#121712\" d=\"m377-80-57-57 184-183 56 56zm199 0-56-57 163-163 57 56zM137-520l-57-56 164-164 56 57zm0 200-57-57 184-183 56 56zm623-21-96-239-78 78 19 94-47 48-71-128-127-70 47-48 94 19 78-78-239-95 60-57 287 45 91-90q9-9 20-13.5t22-4.5 22 4.5 20 13.5q9 8 13.5 19t4.5 22-4.5 22.5T862-778l-91 90 45 287z\"/>"},"timeline":{"body":"<path fill=\"#121712\" d=\"M120-240q-33 0-56.5-23.5T40-320t23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680t56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720t56.5 23.5T920-640t-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320t-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240\"/>"},"user":{"body":"<path fill=\"#121712\" d=\"M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112z\"/>"}},"top":-960,"width":960,"height":960}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$1 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
      this.hint = "";
    }
  }
  const req = Astro2.request;
  const { name = "", title, desc, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  const { viewBox } = normalizedProps;
  if (includeSymbol) {
    delete normalizedProps.viewBox;
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${desc && renderTemplate`<desc>${desc}</desc>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}${addAttribute(viewBox, "viewBox")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "href")}></use> ` })}`} </svg>`;
}, "/home/cobraz/Documents/GitHub/Journey/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { variant, size, class: className, ...rest } = Astro2.props;
  const button = tv({
    base: [
      "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      "starwind-transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "disabled:pointer-events-none disabled:opacity-50"
    ],
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90 focus-visible:outline-outline",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:outline-secondary",
        outline: "border-border hover:bg-border hover:text-foreground focus-visible:outline-outline border",
        ghost: "hover:bg-foreground/10 hover:text-foreground focus-visible:outline-outline bg-transparent",
        info: "bg-info text-info-foreground hover:bg-info/90 focus-visible:outline-info",
        success: "bg-success text-success-foreground hover:bg-success/90 focus-visible:outline-success",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:outline-warning",
        error: "bg-error text-error-foreground hover:bg-error/90 focus-visible:outline-error",
        CTA: "bg-[var(--brand-color)] text-[var(--text-color)] hover:bg-[var(--brand-color)]/90 rounded-[24px]",
        Form: "bg-[var(--brand-color)] font-extrabold text-[var(--text-color)] hover:bg-[var(--brand-color)]/90 rounded-[24px]"
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm",
        md: "h-11 px-4 py-2 text-base",
        lg: "h-12 px-8 py-2 text-lg",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  });
  const Tag = Astro2.props.href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": button({ variant, size, class: className }), ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/button/Button.astro", void 0);

export { $$Icon as $, $$Button as a, $$BaseLayout as b, $$TitleSimple as c };
