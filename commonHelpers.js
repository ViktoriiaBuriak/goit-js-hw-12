import{S as v,i as E,a as S}from"./assets/vendor-eeed083b.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function y(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=y(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const g=new v(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,enableKeyboard:!0}),c="https://pixabay.com/api/",y=document.querySelector(".search-container"),s=document.getElementById("search"),e=document.querySelector(".loader"),o=document.querySelector(".gallery"),r=document.querySelector(".load-btn");o.insertAdjacentElement("afterend",r);let m=1,f="";r.style.display="none";async function w(l,t){try{return(await S.get(c,{params:{key:"42070599-a2d44ee2a419d1b7eaf44145e",q:encodeURIComponent(l),image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}catch(n){console.error("There was a problem with the fetch operation:",n)}}async function h(l,t){e.style.display="block";const n=await w(l,t);if(!n||n.hits.length===0){E.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),e.style.display="none",s.value="";return}t===1&&(o.innerHTML=""),C(n.hits),e.style.display="none",r.style.display="block";const i=n.totalHits||0;t*15>=i&&(r.style.display="none",E.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),s.value=""),g.refresh();const a=document.querySelector(".gallery-item").getBoundingClientRect().height,u=parseFloat(getComputedStyle(o).gap),p=a+u;window.scrollTo({top:window.scrollY+p*2,behavior:"smooth"})}function C(l){l.forEach(t=>{const n=document.createElement("li");n.classList.add("gallery-item");const i=document.createElement("a");i.classList.add("gallery-link"),i.href=t.largeImageURL;const d=document.createElement("img");d.classList.add("gallery-image"),d.src=t.webformatURL,d.alt=t.tags;const a=document.createElement("ul");a.classList.add("caption-list");const u=document.createElement("li");u.innerHTML="<strong>Likes:</strong> <br>"+t.likes;const p=document.createElement("li");p.innerHTML="<strong>Views:</strong> <br>"+t.views;const L=document.createElement("li");L.innerHTML="<strong>Comments:</strong> <br>"+t.comments;const b=document.createElement("li");b.innerHTML="<strong>Downloads:</strong> <br>"+t.downloads,a.appendChild(u),a.appendChild(p),a.appendChild(L),a.appendChild(b),n.appendChild(i),i.appendChild(d),n.appendChild(a),o.appendChild(n)})}y.addEventListener("submit",l=>{l.preventDefault();const t=s.value.trim().toLowerCase();t!==""?(f=t,m=1,h(t,m)):s.reportValidity()}),r.addEventListener("click",()=>{e.style.display="block",m++,h(f,m)})});
//# sourceMappingURL=commonHelpers.js.map