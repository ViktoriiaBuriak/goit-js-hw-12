import{S as C,i as E,a as k}from"./assets/vendor-eeed083b.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",function(){const p=new C(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,enableKeyboard:!0}),c="https://pixabay.com/api/",u=document.querySelector(".search-container"),s=document.getElementById("search"),e=document.querySelector(".loader"),t=document.querySelector(".gallery"),r=document.querySelector(".load-btn");t.insertAdjacentElement("afterend",r);let d=1,y="";r.style.display="none";async function w(a,o){try{return(await k.get(c,{params:{key:"42070599-a2d44ee2a419d1b7eaf44145e",q:encodeURIComponent(a),image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch(n){console.error("There was a problem with the fetch operation:",n)}}async function f(a,o){e.style.display="block";const n=await w(a,o);if(!n||n.hits.length===0){E.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),e.style.display="none",s.value="";return}o===1&&(t.innerHTML=""),v(n.hits),e.style.display="none",r.style.display="block";const l=n.totalHits||0;o*15>=l&&(r.style.display="none",E.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),s.value=""),p.refresh(),window.scrollTo({top:t.offsetTop+t.offsetHeight,behavior:"smooth"})}function v(a){a.forEach(o=>{const n=document.createElement("li");n.classList.add("gallery-item");const l=document.createElement("a");l.classList.add("gallery-link"),l.href=o.largeImageURL;const m=document.createElement("img");m.classList.add("gallery-image"),m.src=o.webformatURL,m.alt=o.tags;const i=document.createElement("ul");i.classList.add("caption-list");const g=document.createElement("li");g.innerHTML="<strong>Likes:</strong> <br>"+o.likes;const h=document.createElement("li");h.innerHTML="<strong>Views:</strong> <br>"+o.views;const L=document.createElement("li");L.innerHTML="<strong>Comments:</strong> <br>"+o.comments;const b=document.createElement("li");b.innerHTML="<strong>Downloads:</strong> <br>"+o.downloads,i.appendChild(g),i.appendChild(h),i.appendChild(L),i.appendChild(b),n.appendChild(l),l.appendChild(m),n.appendChild(i),t.appendChild(n)})}u.addEventListener("submit",a=>{a.preventDefault();const o=s.value.trim().toLowerCase();o!==""?(y=o,d=1,f(o,d)):s.reportValidity()}),r.addEventListener("click",()=>{e.style.display="block",d++,f(y,d)})});
//# sourceMappingURL=commonHelpers.js.map
