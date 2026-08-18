// 夜间模式

const themeBtn =
document.getElementById("themeBtn");


themeBtn.onclick=function(){

document.body.classList.toggle("dark");


if(
document.body.classList.contains("dark")
){

themeBtn.innerHTML="☀️";

}else{

themeBtn.innerHTML="🌙";

}

};





// 图片上传预览


const input =
document.getElementById("uploadInput");


const preview =
document.getElementById("preview");



input.onchange=function(e){


const file=e.target.files[0];


if(!file)return;



const reader=new FileReader();



reader.onload=function(){

const img=document.createElement("img");


img.src=reader.result;


preview.appendChild(img);


};



reader.readAsDataURL(file);


};
