const SUPABASE_URL = "https://mbigygpfxznlvcjfelvy.supabase.co";
const SUPABASE_KEY = "sb_publishable_hXo7cNYMBoPVxOJ_33gkkw_QjYt5e5u";

const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function loadGallery(){

    const {data,error}=await client
    .from("gallery")
    .select("*")
    .order("created_at",{ascending:false});


    if(error){
        console.log(error);
        return;
    }


    const gallery=document.getElementById("gallery");


    gallery.innerHTML="";


    data.forEach(item=>{

        gallery.innerHTML+=`

        <div class="card">

        <img src="${item.image_url}">

        <h3>${item.title}</h3>

        <p>${item.description}</p>

        </div>

        `;

    });

}


loadGallery();
