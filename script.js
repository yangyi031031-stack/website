const SUPABASE_URL = "https://mbigygpfxznlvcjfelvy.supabase.co";
const SUPABASE_KEY = "sb_publishable_hXo7cNYMBoPVxOJ_33gkkw_QjYt5e5u";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

function setText(selector, value){
    const element = document.querySelector(selector);
    if(element && value !== undefined && value !== null){
        element.textContent = value;
    }
}

function applyContent(rows){
    const content = Object.fromEntries(
        rows.map(item => [item.section, item])
    );

    if(content.site?.title){
        document.title = content.site.title;
    }

    const description = document.querySelector('meta[name="description"]');
    if(description && content.site?.content){
        description.setAttribute("content", content.site.content);
    }

    setText(".logo", content.site?.title);
    setText(".hero h1", content.hero?.title);
    setText(".hero p", content.hero?.content);
    setText(".gallery-section h2", content.gallery?.title);
    setText("footer p", content.footer?.content);
}

function createCard(item){
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

    card.append(image, title, description);
    return card;
}

async function loadContent(){
    const {data,error}=await client
    .from("site_content")
    .select("section,title,content")
    .in("section",["site","hero","gallery","footer"]);

    if(error){
        console.error(error);
        return;
    }

    if(data){
        applyContent(data);
    }
}

async function loadGallery(){

    const {data,error}=await client
    .from("gallery")
    .select("title,description,image_url,created_at")
    .order("created_at",{ascending:false});


    if(error){
        console.error(error);
        return;
    }


    const gallery=document.getElementById("gallery");


    gallery.innerHTML="";


    data.forEach(item=>{
        gallery.appendChild(createCard(item));
    });

}


loadContent();
loadGallery();
