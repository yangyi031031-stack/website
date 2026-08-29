const SUPABASE_URL =
"https://mbigygpfxznlvcjfelvy.supabase.co";


const SUPABASE_KEY =
"sb_publishable_hXo7cNYMBoPVxOJ_33gkkw_QjYt5e5u";



const db =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

const IMAGE_BUCKET = "site-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const CONTENT_DEFAULTS = {
site:{title:"Yisauce",content:"Apple Studio 图文展示网站"},
hero:{title:"cat",content:"moment"},
gallery:{title:"精选照片",content:""},
footer:{title:"",content:"© 2026 by yy"}
};

function byId(id){
return document.getElementById(id);
}

function showError(error){
alert(error.message || error);
}

function buildImageCard(item){
const card = document.createElement("div");
card.className = "card";

const image = document.createElement("img");
image.src = item.image_url || "";
image.alt = item.title || "作品图片";
image.loading = "lazy";

const title = document.createElement("h3");
title.textContent = item.title || "未命名作品";

const description = document.createElement("p");
description.textContent = item.description || "";

const editButton = document.createElement("button");
editButton.className = "edit";
editButton.type = "button";
editButton.textContent = "编辑";
editButton.addEventListener("click",()=>edit(item.id));

const deleteButton = document.createElement("button");
deleteButton.className = "delete";
deleteButton.type = "button";
deleteButton.textContent = "删除";
deleteButton.addEventListener("click",()=>del(item.id,item.path));

card.append(image,title,description,editButton,deleteButton);
return card;
}




// 登录

async function login(){


let email=
document.getElementById("email").value;


let password=
document.getElementById("password").value;



let {error}=

await db.auth.signInWithPassword({

email,

password

});


if(error){

showError(error);

return;

}


document.getElementById("login")
.style.display="none";


document.getElementById("cms")
.style.display="block";


loadImages();

loadContent();

}





// 上传图片


async function upload(){


let file=
byId("file")
.files[0];


let title=
byId("title")
.value;


let desc=
byId("desc")
.value;

if(!file){
alert("请选择要上传的图片");
return;
}

if(!file.type.startsWith("image/")){
alert("只能上传图片文件");
return;
}

if(file.size > MAX_IMAGE_SIZE){
alert("图片不能超过 5MB");
return;
}

if(!title.trim()){
alert("请填写图片标题");
return;
}



let name=
`${Date.now()}-${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g,"_")}`;



let {error:uploadError}=await db.storage
.from(IMAGE_BUCKET)
.upload(
name,
file
);

if(uploadError){
showError(uploadError);
return;
}



let url=

db.storage
.from(IMAGE_BUCKET)
.getPublicUrl(name)
.data.publicUrl;



let {error:insertError}=await db.from("gallery")
.insert({

title:title,

description:desc,

image_url:url,

path:name

});

if(insertError){
showError(insertError);
return;
}



alert("上传成功");

byId("file").value="";
byId("title").value="";
byId("desc").value="";

loadImages();


}






// 加载图片


async function loadImages(){


let {data}=

await db.from("gallery")
.select("id,title,description,image_url,path")
.order(
"id",
{
ascending:false
}
);



let box=
document.getElementById("list");


box.innerHTML="";



data.forEach(item=>{
box.appendChild(buildImageCard(item));

});


}







// 删除


async function del(id,path){

if(!confirm("确定删除这张作品吗？")){
return;
}

let {error:storageError}=await db.storage
.from(IMAGE_BUCKET)
.remove([path]);

if(storageError){
showError(storageError);
return;
}


let {error:deleteError}=await db.from("gallery")
.delete()
.eq(
"id",
id
);

if(deleteError){
showError(deleteError);
return;
}



loadImages();


}






// 编辑


async function edit(id){


let title=
prompt("输入新标题");


let desc=
prompt("输入新描述");

if(title===null || desc===null){
return;
}


let {error}=await db.from("gallery")
.update({

title:title,

description:desc

})

.eq(
"id",
id
);

if(error){
showError(error);
return;
}


loadImages();


}








// 网站文字

function contentMap(rows){
return Object.fromEntries(
rows.map(item=>[item.section,item])
);
}

async function loadContent(){


let {data}=

await db.from("site_content")
.select("section,title,content")
.in(
"section",
Object.keys(CONTENT_DEFAULTS)
);



let content={
...CONTENT_DEFAULTS,
...contentMap(data || [])
};

byId("siteTitle").value=
content.site.title;

byId("siteDescription").value=
content.site.content;

byId("heroTitle").value=
content.hero.title;

byId("heroContent").value=
content.hero.content;

byId("galleryTitle").value=
content.gallery.title;

byId("footerContent").value=
content.footer.content;


}




async function saveContent(){


let {error}=await db.from("site_content")
.upsert([
{
section:"site",
title:byId("siteTitle").value,
content:byId("siteDescription").value
},
{
section:"hero",
title:byId("heroTitle").value,
content:byId("heroContent").value
},
{
section:"gallery",
title:byId("galleryTitle").value,
content:""
},
{
section:"footer",
title:"",
content:byId("footerContent").value
}
],{onConflict:"section"});

if(error){
showError(error);
return;
}


alert("保存成功");


}
