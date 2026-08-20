import { e as createComponent, m as maybeRenderHead, k as renderComponent, l as renderScript, r as renderTemplate } from '../chunks/astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
import { a as $$Button, b as $$BaseLayout, c as $$TitleSimple } from '../chunks/Button_BHopYc5W.mjs';
import { $ as $$BackBTN } from '../chunks/BackBTN_DcBTNL1O.mjs';
import { $ as $$Label, a as $$BackLink } from '../chunks/BackLink_DzbeztwT.mjs';
import { $ as $$Input } from '../chunks/Input_DZy9T-Ad.mjs';
export { renderers } from '../renderers.mjs';

const $$SignInForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col pt-5 pl-4 pr-4 gap-6"> <h2 class="text-[22px] font-extrabold">Sign In to your account</h2> <form class="flex flex-col" id="login-account"> ${renderComponent($$result, "Label", $$Label, { "class": "mb-2 font-medium", "for": "email" }, { "default": async ($$result2) => renderTemplate`Email` })} ${renderComponent($$result, "Input", $$Input, { "name": "email", "id": "email", "type": "email", "placeholder": "Enter your email", "class": "rounded-[12px] mb-6 h-14 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]" })} ${renderComponent($$result, "Label", $$Label, { "class": "mb-2 font-medium", "for": "password" }, { "default": async ($$result2) => renderTemplate`Password` })} ${renderComponent($$result, "Input", $$Input, { "name": "password", "id": "password", "type": "password", "placeholder": "Enter your password", "class": "rounded-[12px] mb-6 h-14 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]" })} ${renderComponent($$result, "Button", $$Button, { "type": "submit", "variant": "Form" }, { "default": async ($$result2) => renderTemplate`Sign In` })} </form> </section> ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/forms/SignInForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/forms/SignInForm.astro", void 0);

const $$Signin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Journey | Sign In" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BackBTN", $$BackBTN, { "href": "/" })} ${renderComponent($$result2, "TitleSimple", $$TitleSimple, { "title": "Journey" })} ${renderComponent($$result2, "SignInForm", $$SignInForm, {})} ${renderComponent($$result2, "BackLink", $$BackLink, { "href": "/register", "text": "Don't have an account? Sign Up" })} ` })}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/pages/signin.astro", void 0);

const $$file = "/home/cobraz/Documents/GitHub/Journey/src/pages/signin.astro";
const $$url = "/signin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Signin,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
