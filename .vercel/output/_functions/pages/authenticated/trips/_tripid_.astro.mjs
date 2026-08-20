import { e as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate, f as createAstro, l as renderScript, h as addAttribute } from '../../../chunks/astro/server_BJAPvbWO.mjs';
import 'kleur/colors';
import { $ as $$Icon, a as $$Button, b as $$BaseLayout, c as $$TitleSimple } from '../../../chunks/Button_DLkSxqWC.mjs';
import { a as getAdminDb } from '../../../chunks/server_DzZAxVwU.mjs';
import { $ as $$BackBTN } from '../../../chunks/BackBTN_CJth6bM7.mjs';
import { $ as $$DialogTrigger, a as $$Dialog, b as $$DialogContent, c as $$DialogHeader, d as $$DialogTitle, e as $$Textarea, f as $$DialogFooter, g as $$Skeleton } from '../../../chunks/Skeleton_BVWmyKs0.mjs';
import { $ as $$Input } from '../../../chunks/Input_DZy9T-Ad.mjs';
export { renderers } from '../../../renderers.mjs';

const $$TripJournalHeader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="flex justify-between items-center items-left mx-6"> <h2 class="mt-5 mb-3 text-[22px] font-extrabold">Journal Entries</h2> ${renderComponent($$result, "DialogTrigger", $$DialogTrigger, { "for": "journal-form-dialog", "class": "mt-2", "asChild": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": "add", "class": "w-7.5 h-7.5" })} ` })} </section>`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/trips_page/TripJournalHeader.astro", void 0);

const $$Astro$2 = createAstro();
const $$TripJournalForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TripJournalForm;
  const { email, tripID } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Dialog", $$Dialog, { "id": "journal-form-dialog", "data-trip-id": tripID }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "DialogContent", $$DialogContent, { "class": "w-9/10 h-8/10 rounded-xl" }, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<form id="journal-form"${addAttribute(email, "data-email")} method="dialog" class="flex flex-col gap-4 h-full"> ${renderComponent($$result3, "DialogHeader", $$DialogHeader, { "class": "mb-6" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "DialogTitle", $$DialogTitle, {}, { "default": async ($$result5) => renderTemplate`Create new journal` })} ` })} ${renderComponent($$result3, "Input", $$Input, { "name": "journal title", "id": "title", "type": "text", "placeholder": "Journal Title", "class": "rounded-[12px] mb-6 h-14 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]" })} ${renderComponent($$result3, "Textarea", $$Textarea, { "class": "rounded-[12px] mb-6 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]", "size": "lg", "id": "description", "placeholder": "Journal Description" })} <p>Journal Date</p> ${renderComponent($$result3, "Input", $$Input, { "name": "journal date", "id": "journal-date", "type": "date", "class": "rounded-[12px] mb-6 h-14 p-4 text-[16px] text-[#63875E] bg-[#EBF0EB]" })} ${renderComponent($$result3, "DialogFooter", $$DialogFooter, { "class": "mt-auto" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", $$Button, { "type": "submit", "variant": "Form" }, { "default": async ($$result5) => renderTemplate`Create Journal` })} ` })} </form> ` })} ` })} ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/trips_page/TripJournalForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/trips_page/TripJournalForm.astro", void 0);

const $$Astro$1 = createAstro();
const $$TripJournalList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TripJournalList;
  const { email, tripID } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(email, "data-email")}${addAttribute(tripID, "data-trip-id")} id="journal-list" class="flex flex-col items-left mx-6 my-4 gap-4"> <!-- Journal items will be dynamically inserted here --> ${renderComponent($$result, "Skeleton", $$Skeleton, { "class": "h-[66px] w-full" })} ${renderComponent($$result, "Skeleton", $$Skeleton, { "class": "h-[66px] w-full" })} ${renderComponent($$result, "Skeleton", $$Skeleton, { "class": "h-[66px] w-full" })} ${renderComponent($$result, "Skeleton", $$Skeleton, { "class": "h-[66px] w-full" })} ${renderComponent($$result, "Skeleton", $$Skeleton, { "class": "h-[66px] w-full" })} </section> ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/trips_page/TripJournalList.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/components/authenticated/trips_page/TripJournalList.astro", void 0);

const $$Astro = createAstro();
const $$tripID = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tripID;
  const email = Astro2.locals.userEmail;
  if (!email) return Astro2.redirect("/register");
  const { tripID } = Astro2.params;
  const tripSnap = await getAdminDb().collection("users").doc(email).collection("trips").doc(tripID ?? "unknown_trip").get();
  const tripData = tripSnap.data();
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "id": "layout", "title": `Journey | ${tripID}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BackBTN", $$BackBTN, { "href": "/authenticated/trips" })} ${maybeRenderHead()}<div class="flex justify-between items-center absolute top-4 right-4"> <button${addAttribute(email, "data-email")}${addAttribute(tripID, "data-id")} id="delete-trip-btn" title="Delete Trip">${renderComponent($$result2, "Icon", $$Icon, { "class": "w-7.5 h-7.5", "name": "delete" })}</button> </div> ${renderComponent($$result2, "TitleSimple", $$TitleSimple, { "title": "Trip Details" })} <section class="flex flex-col mt-16 w-full mx-6"> <h2 class="text-3xl font-bold mb-2 text-[var(--text-color)]">${tripData?.title ?? "Unnamed Trip"}</h2> <p class="mb-4 w-8/10 wrap-break-word text-[var(--lt-text-color)]">${tripData?.description ?? "No description available."}</p> <h6 class="text-[var(--lt-text-color)]">${formatDate(tripData?.startDate)} / ${formatDate(tripData?.endDate)}</h6> </section> ${renderComponent($$result2, "TripJournalHeader", $$TripJournalHeader, {})} ${renderComponent($$result2, "TripJournalForm", $$TripJournalForm, { "email": email, "tripID": tripID })} ${renderComponent($$result2, "TripJournalList", $$TripJournalList, { "email": email, "tripID": tripID })} ` })} ${renderScript($$result, "/home/cobraz/Documents/GitHub/Journey/src/pages/authenticated/trips/[tripID].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/cobraz/Documents/GitHub/Journey/src/pages/authenticated/trips/[tripID].astro", void 0);

const $$file = "/home/cobraz/Documents/GitHub/Journey/src/pages/authenticated/trips/[tripID].astro";
const $$url = "/authenticated/trips/[tripID]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$tripID,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
