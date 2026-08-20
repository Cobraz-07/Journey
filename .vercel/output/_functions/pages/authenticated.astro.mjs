import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, h as addAttribute, s as spreadAttributes, n as renderSlot, l as renderScript, k as renderComponent } from '../chunks/astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
import { a as $$Button, b as $$BaseLayout, c as $$TitleSimple } from '../chunks/Button_DLkSxqWC.mjs';
import 'clsx';
import { tv } from 'tailwind-variants';
import { C as ChevronDown, $ as $$AppFooter } from '../chunks/chevron-down_Cuf2ljYQ.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$5 = createAstro();
const $$User = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$User;
  const { email } = Astro2.props;
  const index = email?.indexOf("@");
  const strippedEmail = email?.substring(0, index);
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-center my-15 mb-0 h-[128px] text-center"> <div> <h2 class="text-[20px] font-extrabold">${strippedEmail?.toUpperCase()}</h2> <h4 class="font-extralight">${email}</h4> </div> </section>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/account_page/User.astro", void 0);

const $$Astro$4 = createAstro();
const $$Accordion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Accordion;
  const accordion = tv({ base: "starwind-accordion" });
  const { type = "single", defaultValue, class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(accordion({ class: className }), "class")}${addAttribute(type, "data-type")}${addAttribute(defaultValue, "data-value")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div> ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/accordion/Accordion.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/accordion/Accordion.astro", void 0);

const $$Astro$3 = createAstro();
const $$AccordionContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$AccordionContent;
  const accordionContent = tv({
    base: [
      "starwind-accordion-content",
      "transform-gpu overflow-hidden",
      "data-[state=closed]:animate-accordion-up data-[state=closed]:h-0",
      "data-[state=open]:animate-accordion-down"
    ]
  });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(accordionContent({ class: className }), "class")} data-state="closed" style="animation: none;"${spreadAttributes(rest)}> <div class="overflow-hidden px-5 pt-0 pb-4"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/accordion/AccordionContent.astro", void 0);

const $$Astro$2 = createAstro();
const $$AccordionItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AccordionItem;
  const accordionItem = tv({
    base: "starwind-accordion-item border-x border-b first:rounded-t-lg first:border-t last:rounded-b-lg"
  });
  const { value, class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(accordionItem({ class: className }), "class")}${addAttribute(value, "data-value")} data-state="closed"${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/accordion/AccordionItem.astro", void 0);

const $$Astro$1 = createAstro();
const $$AccordionTrigger = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AccordionTrigger;
  const accordionTrigger = tv({
    base: [
      "starwind-accordion-trigger",
      "flex w-full items-center justify-between gap-4 rounded-md px-5 py-4",
      "starwind-transition-colors hover:text-muted-foreground text-left font-medium",
      "[&[data-state=open]>svg]:rotate-180",
      "focus-visible:outline-outline focus-visible:outline-2 focus-visible:outline-offset-0"
    ]
  });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="button"${addAttribute(accordionTrigger({ class: className }), "class")} aria-expanded="false"${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "ChevronDown", ChevronDown, { "class": "size-5 shrink-0 transition-transform duration-200" })} </button>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/starwind/accordion/AccordionTrigger.astro", void 0);

const $$SettingsAccordion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-center h-[96px]"> ${renderComponent($$result, "Accordion", $$Accordion, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AccordionItem", $$AccordionItem, { "value": "item-1", "class": "border-0 border-transparent" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "AccordionTrigger", $$AccordionTrigger, {}, { "default": ($$result4) => renderTemplate`Manage Account` })} ${renderComponent($$result3, "AccordionContent", $$AccordionContent, {}, { "default": ($$result4) => renderTemplate`Do you want to delete your account? Get in touch with me at <a class="text-[var(--dk-brand-color)] underline" href="mailto:journeyapp.help@gmail.com">journeyapp.help@gmail.com</a>` })} ` })} ${renderComponent($$result2, "AccordionItem", $$AccordionItem, { "value": "item-2", "class": "border-0 border-transparent" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "AccordionTrigger", $$AccordionTrigger, {}, { "default": ($$result4) => renderTemplate`Privacity` })} ${renderComponent($$result3, "AccordionContent", $$AccordionContent, {}, { "default": ($$result4) => renderTemplate`We don't sell any of your data! It is stored in a database and can only be accessed by you.` })} ` })} ${renderComponent($$result2, "AccordionItem", $$AccordionItem, { "value": "item-3", "class": "border-0 border-transparent" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "AccordionTrigger", $$AccordionTrigger, {}, { "default": ($$result4) => renderTemplate`Help & Support` })} ${renderComponent($$result3, "AccordionContent", $$AccordionContent, {}, { "default": ($$result4) => renderTemplate`Get in touch with me at <a class="text-[var(--dk-brand-color)] underline" href="mailto:journeyapp.help@gmail.com">journeyapp.help@gmail.com</a>` })} ` })} ` })} </section>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/account_page/SettingsAccordion.astro", void 0);

const $$SignOutButton = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="flex justify-center absolute w-full bottom-24"> ${renderComponent($$result, "Button", $$Button, { "variant": "outline", "class": "rounded-full", "id": "logout-button" }, { "default": async ($$result2) => renderTemplate`Log Out` })} </section> ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/account_page/SignOutButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/account_page/SignOutButton.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const toggled = "bg-[var(--brand-color)]";
  const email = Astro2.locals.userEmail;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Journey | Account" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TitleSimple", $$TitleSimple, { "title": "Settings" })} ${renderComponent($$result2, "User", $$User, { "email": email })} ${renderComponent($$result2, "SettingsAccordion", $$SettingsAccordion, {})} ${renderComponent($$result2, "SignOutButton", $$SignOutButton, {})} ${renderComponent($$result2, "AppFooter", $$AppFooter, { "iconStateUser": toggled })} ` })}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/pages/authenticated/index.astro", void 0);

const $$file = "/home/cobraz/Documents/GitHub/Journey/src/pages/authenticated/index.astro";
const $$url = "/authenticated";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
