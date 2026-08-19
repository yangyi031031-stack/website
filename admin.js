const SUPABASE_URL =
"https://mbigygpfxznlvcjfelvy.supabase.co";


const SUPABASE_KEY =
"sb_publishable_hXo7cNYMBoPVxOJ_33gkkw_QjYt5e5u";



const db =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);




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

alert(error.message);

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
document.getElementById("file")
.files[0];


let title=
document.getElementById("title")
.value;


let desc=
document.getElementById("desc")
.value;



let name=
Date.now()+"-"+file.name;



await db.storage
.from("site-images")
.upload(
name,
file
);



let url=

db.storage
.from("site-images")
.getPublicUrl(name)
.data.publicUrl;



await db.from("gallery")
.insert({

title:title,

description:desc,

image_url:url,

path:name

});



alert("上传成功");


loadImages();


}






// 加载图片


async function loadImages(){


let {data}=

await db.from("gallery")
.select("*")
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


box.innerHTML+=`

<div class="card">


<img src="${item.image_url}">


<h3>${item.title}</h3>

<p>${item.description}</p>


<button class="edit"
onclick="edit(${item.id})">

编辑

</button>


<button class="delete"
onclick="del(${item.id},'${item.path}')">

删除

</button>


</div>

`;

});


}







// 删除


async function del(id,path){


await db.storage
.from("site-images")
.remove([path]);



await db.from("gallery")
.delete()
.eq(
"id",
id
);



loadImages();


}






// 编辑


async function edit(id){


let title=
prompt("输入新标题");


let desc=
prompt("输入新描述");



await db.from("gallery")
.update({

title:title,

description:desc

})

.eq(
"id",
id
);



loadImages();


}








// 网站文字


async function loadContent(){


let {data}=

await db.from("site_content")
.select("*")
.eq(
"section",
"hero"
)
.single();



if(data){

heroTitle.value=
data.title;


heroContent.value=
data.content;

}


}




async function saveContent(){


await db.from("site_content")
.update({

title:
heroTitle.value,


content:
heroContent.value

})

.eq(
"section",
"hero"
);



alert("保存成功");


}
