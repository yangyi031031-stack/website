// ====== 请替换下面两个值 ======
const SUPABASE_URL = "https://mbigygpfxznlvcjfelvy.supabase.co";
const SUPABASE_KEY = "sb_publishable_hXo7cNYMBoPVxOJ_33gkkw_QjYt5e5u";
// =================================

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function login(){
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if(!email || !password){ alert("请输入邮箱和密码"); return; }

    const {error} = await supabaseClient.auth.signInWithPassword({email,password});
    if(error){ alert("登录失败：" + error.message); return; }

    document.getElementById("loginBox").style.display="none";
    document.getElementById("panel").style.display="block";
}

async function logout(){
    await supabaseClient.auth.signOut();
    location.reload();
}

async function uploadImage(){
    const file = document.getElementById("image").files[0];
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const message = document.getElementById("message");

    if(!file){ alert("请选择图片"); return; }

    if(file.size > 6 * 1024 * 1024){
        alert("图片建议控制在 6MB 以内");
        return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = Date.now() + "-" + safeName;

    message.textContent = "正在上传...";

    const {error:uploadError} = await supabaseClient
        .storage.from("site-images")
        .upload(filename, file, {contentType:file.type, upsert:false});

    if(uploadError){
        message.textContent = "";
        alert("图片上传失败：" + uploadError.message);
        return;
    }

    const {data:urlData} = supabaseClient
        .storage.from("site-images")
        .getPublicUrl(filename);

    const {error:dbError} = await supabaseClient
        .from("gallery")
        .insert({
            title: title || "未命名作品",
            description: description || "",
            image_url: urlData.publicUrl
        });

    if(dbError){
        message.textContent = "";
        alert("数据库保存失败：" + dbError.message);
        return;
    }

    message.textContent = "✅ 上传成功";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
}

(async function(){
    const {data} = await supabaseClient.auth.getSession();
    if(data.session){
        document.getElementById("loginBox").style.display="none";
        document.getElementById("panel").style.display="block";
    }
})();
