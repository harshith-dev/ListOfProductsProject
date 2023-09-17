const products = document.querySelector('#products')
const loader = document.querySelector('.loader')
const search=document.querySelector('#search')
let searchval;
let allproducts;
search.addEventListener('input',(e)=>{
   let searchdata  = e.target.value.toLowerCase();
   const filterdata = allproducts.filter((product)=>{
    const title = product.title.toLowerCase();
    return title.startsWith(searchdata);
   })  
   details(filterdata);
})


async function data(){
    let datas = await fetch("https://fakestoreapi.com/products")
    return  datas.json();
  
}

async function homepage(){
    let productslist = await data();
    allproducts=productslist;
    loader.style.display = "none";
    details(productslist);
    

}
function clearProduct(){
    products.innerHTML="";
}

async function details(detail){
    clearProduct();
    
detail.forEach(product => {
        let postdata = createProduct(product);
        products.appendChild(postdata)       
    });
    
    
}

function createProduct(data){
    let product = document.createElement('div');
    product.className="product";
    product.id = "product"+data.id;
    let image= document.createElement('div');
    image.className="image";
    let imgs = document.createElement('img');
    imgs.src=data.image;
    let content = document.createElement('div')
    content.className='content'
    let h2 =document.createElement('h2')
    h2.className='title'
    h2.textContent = data.title.length > 20 ? data.title.substring(0, 20) : data.title;
    console.log(h2)
    let p1=document.createElement('p');
    let p2=document.createElement('p');
    let p3=document.createElement('p');
    let btn = document.createElement('button');
    btn.innerText="Delete Item"
    btn.className="btn";
    btn.onclick=()=>ondelete(product.id)
    p1.className='description';
    p1.textContent=data.description.length>20?data.description.substring(0,30).concat('...more'):data.description;
    p2.className='rating'
    p2.textContent="rating: " + data.rating.rate;
    p3.className = 'price'
    p3.textContent="Rs. "+data.price;
    product.appendChild(image);
    image.appendChild(imgs);

    content.appendChild(h2);
    content.appendChild(p1);
    content.appendChild(p2);
    content.appendChild(p3);
    content.appendChild(btn);
    product.appendChild(content)
    return product;

}
homepage();


function ondelete(id){
    const productToDelete = document.querySelector(`#${id}`)
    productToDelete.style.display = "none";
}