let id = new URLSearchParams(window.location.search).get('id');
let form = document.querySelector('#form')
let name = document.querySelector('#name');
let prize = document.querySelector('#prize');
let file = document.querySelector('#file');
let roundedImg = document.querySelector('#rounded-image');
let url = `http://localhost:3000/data/`

file.addEventListener('input',(e) => {
    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            roundedImg.src = reader.result;
        }
    }
} )

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let inputs = [name,prize,file]
    if(name.value.trim() && prize.value.trim()&& file.value ){

        let obj = {
            name: name.value,
            prize:prize.value,
            image: roundedImg.src,
        }

        axios.post(url,obj).then(
            res => {
                window.location = `index.html`
            }
        )

    
    }else{
        inputs.forEach((element) =>{
            let display = element.value.trim() == '' ? "block" :"none";
            element.nextElementSibling.style.display = display
        })
    }

} )

let table = document.querySelector('#table');

fetch("http://localhost:3000/data")
.then(res => res.json())
.then(data => {
    data.forEach(e =>{
        table.innerHTML += `
        <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.prize}</td>
        <td>
        <button onclick ="DeleteBtn(${e.id})"  >Delete</button>
        </td>
        <td><button onclick ="UpdateBtn(${e.id})"  >Update</button></td>
    </tr>
        `
    })
})

function DeleteBtn(id){
    axios.delete(`http://localhost:3000/data/${id}`)
    window.location.reload()
}