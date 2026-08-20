import{d as l,b as d,f as p,g as u}from"./config.3yrMbHhZ.js";const r=document.getElementById("trip-list"),f=r.dataset.message,h=l(d,"users",f??"unknown_user"),m=p(h,"trips");async function x(){const a=await u(m);if(a.empty){r.innerHTML=`
                <div class="flex flex-col items-center justify-center w-full h-60">
                    <h3 class="text-xl font-semibold text-center text-[var(--lt-text-color)]">No trips added yet</h3>
                    <p class="text-center text-[var(--lt-text-color)]">Start by adding a new trip to plan your next adventure!</p>
                </div>
            `;return}let n="";a.forEach(o=>{const t=o.data(),c=o.id,i=s=>{if(!s)return"";const e=s.split("-");return e.length===3?`${e[2]}-${e[1]}-${e[0]}`:s};n+=`
                <a href="/authenticated/trips/${c??"Unnamed_Trip"}">
                    <div class="w-full flex items-center gap-4">
                        <img src="https://flagcdn.com/${t?.countryCode}.svg" width="40" class="h-7.5 trip-img" alt="${t?.countryCode}" />
                        <div id="text-div">
                            <h4 class="font-bold">${t?.title??"Unnamed Trip"}</h4>
                            <h6 class="text-[var(--lt-text-color)]">${t?.country??"Nowhere"}</h6>
                            <h6 class="text-[var(--lt-text-color)]">${i(t?.startDate)} / ${i(t?.endDate)}</h6>
                        </div>
                    </div>
                </a>
                <p id="separator" class="w-9/10 bg-neutral-200 h-0.5 m-auto"></p>
            `}),r.innerHTML=n}x();
