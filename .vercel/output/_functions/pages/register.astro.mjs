import { e as createComponent, m as maybeRenderHead, k as renderComponent, l as renderScript, r as renderTemplate } from '../chunks/astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
import { a as $$Button, b as $$BaseLayout, c as $$TitleSimple } from '../chunks/Button_DLkSxqWC.mjs';
import { $ as $$BackBTN } from '../chunks/BackBTN_CJth6bM7.mjs';
import { $ as $$Label, a as $$BackLink } from '../chunks/BackLink_DzbeztwT.mjs';
import { $ as $$Input } from '../chunks/Input_DZy9T-Ad.mjs';
export { renderers } from '../renderers.mjs';

const $$RegisterForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col pt-5 pl-4 pr-4 gap-6"> <h2 class="text-[22px] font-extrabold">Create your account</h2> <form class="flex flex-col" id="create-account"> ${renderComponent($$result, "Label", $$Label, { "class": "mb-2 font-medium", "for": "email" }, { "default": async ($$result2) => renderTemplate`Email` })} ${renderComponent($$result, "Input", $$Input, { "name": "email", "id": "email", "type": "email", "placeholder": "Enter your email", "class": "rounded-[12px] mb-6 h-14 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]" })} ${renderComponent($$result, "Label", $$Label, { "class": "mb-2 font-medium", "for": "password" }, { "default": async ($$result2) => renderTemplate`Password` })} ${renderComponent($$result, "Input", $$Input, { "name": "password", "id": "password", "type": "password", "placeholder": "Enter your password", "class": "rounded-[12px] mb-6 h-14 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]" })} ${renderComponent($$result, "Button", $$Button, { "variant": "Form" }, { "default": async ($$result2) => renderTemplate`Sign Up` })} </form> </section> ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/forms/RegisterForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/forms/RegisterForm.astro", void 0);

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Journey | Sign Up" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BackBTN", $$BackBTN, { "href": "/" })} ${renderComponent($$result2, "TitleSimple", $$TitleSimple, { "title": "Journey" })} ${renderComponent($$result2, "RegisterForm", $$RegisterForm, {})} ${renderComponent($$result2, "BackLink", $$BackLink, { "href": "/signin", "text": "Already have an account? Sign in" })} ` })}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/pages/register.astro", void 0);

const $$file = "/home/cobraz/Documents/GitHub/Journey/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
