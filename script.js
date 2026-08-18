const body=document.body, editorBar=document.getElementById("editorBar"), fileInput=document.getElementById("fileInput"), toast=document.getElementById("toast");
let editing=false, imageTarget=null;

const textEls=[...document.querySelectorAll(".editable")];
const imageEls=[...document.querySelectorAll("img[id]")];

function showToast(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}
function loadSaved(){
  const data=JSON.parse(localStorage.getItem("appleStudioData")||"{}");
  textEls.forEach(el=>{if(data.text?.[el.dataset.key]!==undefined)el.innerHTML=data.text[el.dataset.key]});
  imageEls.forEach(el=>{if(data.images?.[el.id])el.src=data.images[el.id]});
}
function save(){
  const data={text:{},images:{}};
  textEls.forEach(el=>data.text[el.dataset.key]=el.innerHTML);
  imageEls.forEach(el=>data.images[el.id]=el.src);
  localStorage.setItem("appleStudioData",JSON.stringify(data));
  showToast("修改已保存到本机");
}
function reset(){
  if(!confirm("确定恢复默认内容吗？"))return;
  localStorage.removeItem("appleStudioData");location.reload();
}
function setEditMode(v){
  editing=v;body.classList.toggle("editing",v);editorBar.classList.toggle("show",v);
  textEls.forEach(el=>el.contentEditable=v?"true":"false");
}
document.getElementById("editBtn").onclick=()=>setEditMode(true);
document.getElementById("closeEditor").onclick=()=>setEditMode(false);
document.getElementById("saveBtn").onclick=save;
document.getElementById("resetBtn").onclick=reset;
document.getElementById("themeBtn").onclick=()=>{body.classList.toggle("dark");localStorage.setItem("theme",body.classList.contains("dark")?"dark":"light")};

document.querySelectorAll(".image-edit-btn").forEach(btn=>btn.onclick=()=>{
  if(!editing)return;
  imageTarget=document.getElementById(btn.dataset.target);fileInput.click();
});
fileInput.onchange=()=>{
  const file=fileInput.files[0]; if(!file||!imageTarget)return;
  const reader=new FileReader();
  reader.onload=e=>{
    imageTarget.src=e.target.result;
    showToast("图片已替换，点击“保存修改”即可保存");
  };
  reader.readAsDataURL(file);
  fileInput.value="";
};
loadSaved();
if(localStorage.getItem("theme")==="dark")body.classList.add("dark");
