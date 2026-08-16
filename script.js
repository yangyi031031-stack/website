const themeBtn=document.getElementById("themeBtn");
themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  themeBtn.textContent=document.body.classList.contains("dark")?"☀":"☾";
});

const search=document.getElementById("search");
const cards=[...document.querySelectorAll(".card")];
search.addEventListener("input",()=>{
  const value=search.value.trim().toLowerCase();
  cards.forEach(card=>{
    const title=card.dataset.title.toLowerCase();
    card.style.display=title.includes(value)?"block":"none";
  });
});
