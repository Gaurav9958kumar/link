const url= "https://link-hngg.onrender.com/todo"

window.onload=()=>{
  getData()
}
 async function getData(){
   let res=await fetch(`${url}?_page=1&_limit=2`);
   let data=await res.json();
   display(data);
  
 }

async function addTodo(){
    let task=document.getElementById("todo").value;
    let dur=document.getElementById("duration").value;
    let obj={
        title:task,
        duration:+dur,
        status:false,
        id:Math.random() + task
    }
    let res=await fetch(url,{
        method: "POST",
        body:JSON.stringify(obj),
        headers:{"Content-Type":"application/json",},
    });
 getData();
}

  function display(data){
    let container=document.getElementById("container");
    container.innerHTML=null;
    data.forEach(function(ele){
        let div=document.createElement("div");
        let title=document.createElement("h3");
        title.innerText=ele.title;
        let status=document.createElement("p");
        status.innerText=ele.status;
        status.style.color="red";
        let dur=document.createElement("h3");
        dur.innerText=ele.duration;
        let id=document.createElement("p");
        id.innerText=ele.id;
        let DeleteBtn=document.createElement("button");
        DeleteBtn.innerText="Delete"
        DeleteBtn.onclick=()=>{
            DeleteTodo(ele.id)
        }
        let toggleBtn=document.createElement("button");
        toggleBtn.innerText="toggle"
        toggleBtn.onclick=()=>{
                  toggle(ele.id);
        }
        div.append(title,dur,status,id,DeleteBtn,toggleBtn);
        container.append(div);
    })
  }

  async function DeleteTodo(id){
       await fetch(`${url}/${id}`,{method: "DELETE",});
       getData();
  }

  async function toggle(id){
     let res=await fetch(`${url}/${id}`);
     res=await res.json();
     let data={status:!res.status};
     await fetch(`${url}/${id}`,{method:"PATCH",body:JSON.stringify(data),headers:{"Content-Type":"application/json"},})
     getData();
  }

 async function sortlth(){
    let res= await fetch(`${url}?_sort=duration&_order=asc`);
    res=await res.json();
    display(res)
  }

  async function sorthtl(){
    let res= await fetch(`${url}?_sort=duration&_order=desc`);
    res=await res.json();
    display(res)
  }

  async function filter(){
    let res=await fetch(`${url}?duration_gte=10&duration_lte=35`);
    res=await res.json();
    display(res)
  }