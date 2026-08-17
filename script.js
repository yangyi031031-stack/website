const cards=document.getElementById("cards");
const search=document.getElementById("search");

function render(list){
cards.innerHTML="";
list.forEach(item=>{
cards.innerHTML+=`
<article class="card">
<img src="${item.image}" alt="${item.title}">
<div class="card-body">
<small>${item.category} · ${item.year}</small>
<h3>${item.title}</h3>
<p>${item.desc}</p>
<a href="#about">阅读全文 →</a>
</div>
</article>`;
});
}

render(articles);

search.addEventListener("input",()=>{
const v=search.value;
render(articles.filter(i=>i.title.includes(v)));
});

document.getElementById("themeBtn").onclick=()=>{
document.body.classList.toggle("dark");
};
