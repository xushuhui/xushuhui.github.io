import{d as createAstro,c as createComponent,m as maybeRenderHead,e as addAttribute,a as renderTemplate}from"./astro/server.js";import{t as themeConfig}from"./config.js";import{b as isPostPage}from"./Layout.js";const $$Astro=createAstro("https://xushuhui.github.io"),$$PostDate=createComponent(((e,t,a)=>{const r=e.createAstro($$Astro,t,a);r.self=$$PostDate;const{date:s,updatedDate:o,minutes:n}=r.props,i=themeConfig.global.dateFormat,d=isPostPage(r.url.pathname)?"ml-1.75":"ml-1.5";function m(e,t){const a={year:"numeric",month:"2-digit",day:"2-digit"};switch(t){case"YYYY-MM-DD":default:return e.toISOString().split("T")[0];case"MM-DD-YYYY":return e.toLocaleDateString("en-US",a).replace(/\//g,"-");case"DD-MM-YYYY":return e.toLocaleDateString("en-GB",a).replace(/\//g,"-");case"MONTH DAY YYYY":return e.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}).replace(",","");case"DAY MONTH YYYY":return e.toLocaleDateString("en-GB",{year:"numeric",month:"short",day:"numeric"}).replace(",","")}}return renderTemplate`<!-- published date -->${maybeRenderHead()}<time${addAttribute(s.toISOString().split("T")[0],"datetime")}> ${m(s,i)} </time> <!-- updated date --> ${o&&renderTemplate`<time${addAttribute(o.toISOString().split("T")[0],"datetime")}${addAttribute(d,"class")}>
updated ${m(o,i)} </time>`} <!-- reading time --> ${void 0!==n&&renderTemplate`<span${addAttribute(d,"class")}> ${n} min
</span>`}`}),"/Users/fm/www/astro-theme-retypeset/src/components/PostDate.astro",void 0);export{$$PostDate as $};