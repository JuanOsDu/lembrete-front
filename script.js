var lem = document.querySelector('.lembrete')
var box = document.querySelector('.box')
const url = new URL("http://34.148.140.28:3000/")
/*
for(let i =0; i<10; i++){

    ele = document.createElement('h3')
    tx = document.createTextNode('Tituloo')
    ele.appendChild(tx)
    box.insertBefore(ele, lem)
 
}*/
async function markComplete(idCard){
    try{
        const response = await fetch(url + 'complete/'+idCard, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
    
            }
        }).catch(e => console.log(e))
        let card = document.querySelector(`div input[type="hidden"][value="${idCard}"]`).closest('div')
        let chk = card.querySelector(`input[type="checkbox"]`)
        chk.checked = !chk.checked
        
    }catch(err){
        console.log(err)
    }
}


async function lembrete() {
    let arrNodes = []
    const response = await fetch(url + 'lembrete')
    const data = await response.json()
    const arr = data.data

    for (let i = 0; i < arr.length; i++) {

        let div = document.createElement('div')
    
        div.setAttribute("data-content", arr[i].autor)
        div.className = 'card'

        div.addEventListener('dblclick', function() {
            // Invocar la función con los atributos específicos
            markComplete(arr[i].id);
        });

        let titulo = document.createElement('h3')
        
        let hid = document.createElement('input')
        hid.type = 'hidden'
        hid.value = arr[i].id
        titulo.innerText = arr[i].title
        let date = document.createElement('h4')
        let d= arr[i].to_do_date
        d = new Date(d)
        d = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
        date.innerText = d
        let span = document.createElement('span')
        let check = document.createElement('input')
        check.type = 'checkbox'
        check.checked = arr[i].completed
        let text = document.createTextNode("Completed?")
        span.appendChild(check)
        span.appendChild(text)

        let description = document.createElement('p')
        description.innerText = arr[i].description
        div.appendChild(titulo)
        div.appendChild(hid)
        div.appendChild(date)
        div.appendChild(description)
        div.appendChild(span)
        arrNodes.push(div)
    }
    box.append(...arrNodes)
}

async function ipdata(ip) {
    try {
        const request = await fetch("https://ipinfo.io/json?token=8495eca8a0efc8")
        const jsonResponse = await request.json()
        console.log(jsonResponse.ip, jsonResponse.country)
        console.log("ok")
        let url = "http://ipinfo.io/" + ip + "?token=8495eca8a0efc8"
        let data = await fetch(url)
        let data2 = await data.json()
        return data2

    } catch (error) {
        // Manejar errores, por ejemplo, imprimir el error en la consola
        console.error('Error al obtener información de la IP:', error);
        // Puedes lanzar el error nuevamente si es necesario
        throw error;
    }
}

async function addLembrete() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let to_do_date = document.getElementById('date').value
    let autor = 'Dont know'
    try {

        let ip = document.getElementById('ip').value
        if(ip == 'CO'){
            autor = 'Juan'
        }else{
            autor='Larissa'
        }
    } catch (err) {
        console.log("error ip")
    }

    if (to_do_date == '') {
        to_do_date = new Date()
        to_do_date = `${to_do_date.getFullYear()}-${to_do_date.getMonth()+1}-${to_do_date.getDate()}`
    }
    const response = await fetch(url + 'lembrete', {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",

        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "to_do_date": to_do_date,
            "autor": autor
        })
    }).catch(e => console.log(e))
    const result = await response.json();
    console.log(result)


}


