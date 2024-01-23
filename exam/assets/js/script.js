let s2bottom = document.querySelector('.s2bottom');
filteredArr=[];
copyArr =[];
let search  = document.querySelector('#search');
let sort = document.querySelector('#sort ')


async function GetAllData(){
 let res = await axios(`http://localhost:3000/data`)
 let data  = await res.data;

 copyArr = data;
s2bottom.innerHTML=""

console.log(data)
 filteredArr = filteredArr.length || search.value ? filteredArr : data;
 console.log(filteredArr)
 filteredArr.forEach((element) => {
    console.log(element);
    s2bottom.innerHTML += `
    <div class="s2bot">
    <div class="img">
        <img src="${element.image}" alt="">
    </div>
    <div class="s2bottext">
        <div class="reddiv">Add to Card</div>
        <h2>${element.name}</h2>
        <h4>${element.prize}</h4>
    </div>
</div>
    `
 });
}

GetAllData();




sort.addEventListener('change', (e) => {

if(e.target.value === 'asc'){
    filteredArr.sort((a,b) => a.prize -b.prize);
}
else if(e.target.value === 'dsc'){
    filteredArr.sort((a,b) =>  b.prize -a.prize);
}
else{
    filteredArr =[]
}
GetAllData();
})



document.addEventListener('DOMContentLoaded',function(){

    let nav = document.querySelector('nav');
    let menu = document.querySelector('.menu');
    let click = document.querySelector('#click');

    click.addEventListener('click' , function(){
        menu.classList.toggle('show');
    })

    window.addEventListener("scroll", function() {
        if(window.scrollY > 50){
                nav.classList.add('sticky')
        }
        else{
            nav.classList.remove('sticky');
        }
    })
    
})


search.addEventListener('input', (e) =>{
filteredArr= copyArr;
filteredArr = filteredArr.filter((element) =>{
    return element.name.toLowerCase().includes(e.target.value.toLowerCase());
})
 GetAllData();
})