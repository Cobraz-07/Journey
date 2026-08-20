import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, n as renderSlot, l as renderScript, r as renderTemplate, k as renderComponent } from './astro/server_BJAPvbWO.mjs';
/* empty css                            */
import 'clsx';
import { c as createSvgComponent } from './runtime_Nslmv-Fb.mjs';
import { tv } from 'tailwind-variants';

const $$Astro$9 = createAstro();
const $$Dialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Dialog;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["starwind-dialog", className], "class:list")}${spreadAttributes(rest)} data-astro-cid-kjprtn36> ${renderSlot($$result, $$slots["default"])} </div> ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/Dialog.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/Dialog.astro", void 0);

const $$Astro$8 = createAstro();
const $$DialogClose = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$DialogClose;
  const { class: className, asChild = false, ...rest } = Astro2.props;
  let hasChildren = false;
  if (Astro2.slots.has("default")) {
    hasChildren = true;
  }
  return renderTemplate`${asChild && hasChildren ? renderTemplate`${maybeRenderHead()}<div class="starwind-dialog-close" data-as-child>${renderSlot($$result, $$slots["default"])}</div>` : renderTemplate`<button type="button"${addAttribute(["starwind-dialog-close", className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"], renderTemplate`Demo close button`)}</button>`}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogClose.astro", void 0);

const X = createSvgComponent({"meta":{"src":"/_astro/x.DEdHiowI.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-x"},"children":"\n  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" />\n  <path d=\"M18 6l-12 12\" />\n  <path d=\"M6 6l12 12\" />\n"});

const $$Astro$7 = createAstro();
const $$DialogContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$DialogContent;
  const dialogBackdrop = tv({
    base: [
      "starwind-dialog-backdrop fixed inset-0 top-0 left-0 z-50 hidden h-screen w-screen bg-black/80",
      "data-[state=open]:animate-in fade-in",
      "data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards fade-out"
    ]
  });
  const dialogContent = tv({
    base: [
      "fixed top-16 left-[50%] z-50 translate-x-[-50%] sm:top-[50%] sm:translate-y-[-50%]",
      "bg-background w-full max-w-md border p-8 shadow-lg sm:rounded-lg",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards",
      "fade-in zoom-in-95 slide-in-from-bottom-2",
      "fade-out zoom-out-95 slide-out-to-bottom-2"
    ]
  });
  const dialogCloseButton = tv({
    base: [
      "starwind-dialog-close text-muted-foreground",
      "absolute top-5.5 right-5.5 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none",
      "focus-visible:outline-outline focus-visible:outline-2 focus-visible:outline-offset-2"
    ]
  });
  const { class: className, animationDuration = 200, ...rest } = Astro2.props;
  return renderTemplate`<!-- dialog overlay -->${maybeRenderHead()}<div${addAttribute(dialogBackdrop(), "class")} data-state="closed"${addAttribute({ animationDuration: `${animationDuration}ms` }, "style")}></div> <dialog${addAttribute(dialogContent({ class: className }), "class")} data-state="closed"${spreadAttributes(rest)}${addAttribute({ animationDuration: `${animationDuration}ms` }, "style")}> ${renderSlot($$result, $$slots["default"])} <button type="button"${addAttribute(dialogCloseButton(), "class")} data-dialog-close aria-label="Close dialog"> ${renderComponent($$result, "X", X, { "class": "size-5" })} </button> </dialog>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogContent.astro", void 0);

const $$Astro$6 = createAstro();
const $$DialogDescription = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$DialogDescription;
  const dialogDescription = tv({ base: "text-muted-foreground" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p${addAttribute(dialogDescription({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </p>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogDescription.astro", void 0);

const $$Astro$5 = createAstro();
const $$DialogFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$DialogFooter;
  const dialogFooter = tv({ base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(dialogFooter({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogFooter.astro", void 0);

const $$Astro$4 = createAstro();
const $$DialogHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$DialogHeader;
  const dialogHeader = tv({ base: "flex flex-col space-y-2 text-center sm:text-left" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(dialogHeader({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogHeader.astro", void 0);

const $$Astro$3 = createAstro();
const $$DialogTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DialogTitle;
  const dialogTitle = tv({ base: "text-2xl leading-none font-semibold tracking-tight" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<h2${addAttribute(dialogTitle({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </h2>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogTitle.astro", void 0);

const $$Astro$2 = createAstro();
const $$DialogTrigger = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DialogTrigger;
  const { class: className, asChild = false, for: dialogFor, ...rest } = Astro2.props;
  let hasChildren = false;
  if (Astro2.slots.has("default")) {
    hasChildren = true;
  }
  return renderTemplate`${asChild && hasChildren ? renderTemplate`${maybeRenderHead()}<div class="starwind-dialog-trigger" data-as-child${addAttribute(dialogFor, "data-dialog-for")}>${renderSlot($$result, $$slots["default"])}</div>` : renderTemplate`<button type="button" aria-haspopup="dialog"${addAttribute(["starwind-dialog-trigger", className], "class:list")}${addAttribute(dialogFor, "data-dialog-for")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/dialog/DialogTrigger.astro", void 0);

const $$Astro$1 = createAstro();
const $$Textarea = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Textarea;
  const textarea = tv({
    base: [
      "border-input bg-background text-foreground ring-offset-background min-h-10 w-full rounded-md border",
      "focus:outline-outline focus:ring-0 focus:outline-2 focus:outline-offset-2",
      "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "peer placeholder:text-muted-foreground"
    ],
    variants: {
      size: {
        sm: "min-h-9 px-2 py-1 text-sm",
        md: "min-h-10 px-3 py-2 text-base",
        lg: "min-h-12 px-4 py-3 text-lg"
      }
    },
    defaultVariants: { size: "md" }
  });
  const { size, class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<textarea${addAttribute(textarea({ size, class: className }), "class")}${spreadAttributes(rest)}></textarea>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/textarea/Textarea.astro", void 0);

const $$Astro = createAstro();
const $$Skeleton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Skeleton;
  const { class: className, ...rest } = Astro2.props;
  const skeleton = tv({
    base: "bg-accent animate-pulse rounded-md"
  });
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(skeleton({ class: className }), "class")}${spreadAttributes(rest)}></div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/skeleton/Skeleton.astro", void 0);

export { $$DialogTrigger as $, $$Dialog as a, $$DialogContent as b, $$DialogHeader as c, $$DialogTitle as d, $$Textarea as e, $$DialogFooter as f, $$Skeleton as g };
