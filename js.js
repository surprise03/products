// here we create a dic container and then we give classname and id 
let container=document.createElement("div")
container.className="container"
container.id="container"
document.body.appendChild(container)
let btn=document.getElementById("btn")
let loading=document.getElementById("loading")
loading.style.display="none"
let loader1=document.getElementById("loader1")

btn.addEventListener("click",function(){
    
    let title=document.getElementById("title")
    let description=document.getElementById("decription")
    let image=document.getElementById("img")
    if (title.value === "" || description.value === "" || image.value === "") {
        alert("Enter the data properly");
    } else {
        let options = {
            "method": "POST", // Make sure POST is capitalized
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                "title": title.value,
                "description": description.value,
                "image": image.value
            })
        };
        
        fetch("https://zenith-spiral-marquis.glitch.me/Products", options) // Removed the unnecessary colon
            .then(res => {
                if (res.ok) {
                    loading.style.display="block"
                    alert("Data added");
                    getData(); // Call to get data after success
            
                }
            })
            .catch(error => {
                console.error("Error:", error); // Added error handling
            });
    }
})

// create a function

function getData(){
    fetch("https://zenith-spiral-marquis.glitch.me/Products")
    .then(res=>res.json())
    
    .then(data=>displayData(data))
    
    

}


function displayData(products){
    container.innerHTML=``;
    for(let prd of products){
        let item=document.createElement("div")
        item.className="item"
        item.innerHTML=`
                  <div class="img"> <img src='${prd.image}' class='image'></div>
                  <p class='text'><b>${prd.title}</b></p>
                
                   <p class='description '   >${prd.description}</p>
                   <div ><button class="button1" onclick=deletData("${prd.id}")>delete</button> <button class="button2" onlick=editData>edit</button></div>
                    
        `;
   
   
        // loader1.remove();
        container.appendChild(item)
        // loader1.remove();
        
        
    }
    
    
}
function deletData(id){
    let options={
        "method":"DELETE"
    }
    fetch(`https://zenith-spiral-marquis.glitch.me/Products/${id}`,options)
         .then(res=>{
            if(res.ok)
                alert("data deleted")
         }).catch(err=>console.log(err))
}



loader1.remove();
getData();


