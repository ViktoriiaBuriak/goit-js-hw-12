import{S as R,a as M,i as q}from"./assets/vendor-951421c8.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",function(){const h=new R(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,enableKeyboard:!0}),l="https://pixabay.com/api/",u=document.querySelector(".search-container"),n=document.getElementById("search"),e=document.querySelector(".loader"),t=document.querySelector(".gallery"),o=document.querySelector(".load-btn");let s=1,f=15,L=[],b=0,w="";u.addEventListener("submit",async i=>{i.preventDefault(),w=n.value.trim().toLowerCase(),s=1,o.style.display="none",await E()}),o.addEventListener("click",async()=>{e.style.display="block",console.log(e),await E(),s++,e.style.display="none";const c=document.querySelector(".gallery-item").getBoundingClientRect().height+24;window.scrollBy({top:c*2,behavior:"smooth"})});async function E(){e.style.display="block";const i=w;if(i!==""){const I={key:"42070599-a2d44ee2a419d1b7eaf44145e",q:encodeURIComponent(i),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,_page:s};await M.get(l,{params:I}).then(c=>{const y=c.data,g=y.hits;if(b=Math.ceil(y.totalHits/f),y.hits.length===0){n.value="",q.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),e.style.display="none";return}g.forEach(r=>{const d=document.createElement("li");d.classList.add("gallery-item");const m=document.createElement("a");m.classList.add("gallery-link"),m.href=r.largeImageURL;const p=document.createElement("img");p.classList.add("gallery-image"),p.src=r.webformatURL,p.alt=r.tags;const a=document.createElement("ul");a.classList.add("caption-list");const v=document.createElement("li");v.innerHTML="<strong>Likes:</strong> <br>"+r.likes;const C=document.createElement("li");C.innerHTML="<strong>Views:</strong> <br>"+r.views;const k=document.createElement("li");k.innerHTML="<strong>Comments:</strong> <br>"+r.comments;const S=document.createElement("li");S.innerHTML="<strong>Downloads:</strong> <br>"+r.downloads,a.appendChild(v),a.appendChild(C),a.appendChild(k),a.appendChild(S),d.appendChild(m),m.appendChild(p),d.appendChild(a),t.appendChild(d)}),s===1?L=g:L.push(...g),e.style.display="none",h.refresh(),s<b?o.style.display="flex":(o.style.display="none",n.value="",q.error({title:"Error",message:"You've reached the end of search results.",position:"topRight"}))}).catch(c=>{console.error("There was a problem with the fetch operation:",c)})}else n.reportValidity(),e.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
