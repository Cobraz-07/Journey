import{d,b as f,f as x,a as p,g as m}from"./config.BW1lg-O3.js";const o=document.getElementById("journal-list"),v=o.dataset.email,j=o.dataset.tripId,h=d(f,"users",v??"unknown_user"),g=d(h,"trips",j??"unknown_trip"),i=x(g,"journal");o.addEventListener("click",async r=>{const a=r.target.closest("[data-delete-journal]");if(a){const t=a.dataset.deleteJournal;if(t)try{await p(d(i,t)),u()}catch(e){console.error("Error deleting journal:",e)}}});async function u(){const r=await m(i);if(r.empty){o.innerHTML=`
                <div class="flex flex-col items-center justify-center w-full h-60">
                    <h3 class="text-xl font-semibold text-center text-[var(--lt-text-color)]">No journals added yet</h3>
                    <p class="text-center text-[var(--lt-text-color)]">Start by adding a new journal entry for this trip!</p>
                </div>
            `;return}const n=r.docs.map(t=>({id:t.id,data:t.data()}));n.sort((t,e)=>{const c=t.data?.date||"";return(e.data?.date||"").localeCompare(c)});let a="";n.forEach(t=>{const e=t.data,c=l=>{if(!l)return"";const s=l.split("-");return s.length===3?`${s[2]}-${s[1]}-${s[0]}`:l};a+=`
                <div class="w-full flex flex-col gap-2 p-4">
                    <div class="flex justify-between w-full">
                        <h4 class="font-bold text-[var(--text-color)]">${e?.title??"Untitled Journal"}</h4>
                        <p class="text-sm text-[var(--lt-text-color)]">${c(e?.date)}</p>
                    </div>
                    <p class="text-[var(--lt-text-color)]">${e?.description??""}</p>
                    <div class="flex justify-between items-center ml-auto">
                        <button data-delete-journal="${t.id}" class="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors" title="Delete Journal">
                            <img src="/delete.svg" class="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div class="w-9/10 bg-neutral-200 h-0.5 m-auto"></div>
            `}),o.innerHTML=a}u();
