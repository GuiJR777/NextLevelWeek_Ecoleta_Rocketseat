
function populateUfs(){
    const ufSelect= document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()}) //ou .then(res=>res.json())
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })

}

populateUfs()

function getCities(event){
    const citySelect= document.querySelector("[name=city]")
    const stateInput= document.querySelector("[name= state]")

    const ufValue= event.target.value

    const indexOfSelectedState= event.target.selectedIndex
    stateInput.value= event.target.options[indexOfSelectedState].text
    
    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value=>Selecione uma Cidade</option>"
    citySelect.disabled= true

    fetch(url)
    .then(res=>res.json())
    .then(cities => {        
        for(const city of cities){
            citySelect.innerHTML +=`<option value= "${city.nome}">${city.nome}</option>`

        }
        citySelect.disabled= false
    })

}







document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de coleta
const itensToCollect= document.querySelectorAll(".Itens-grid li")
for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens= document.querySelector("input[name=Itens]")

let selectedItens= []

function handleSelectedItem(event){
    const itemLi= event.target
    //add ou remover class
    itemLi.classList.toggle("selected")

    const itemId= itemLi.dataset.id

    const alredySelected= selectedItens.findIndex( (item)=> {
        const itemFound= item == itemId
        return itemFound
    })
    

    if(alredySelected >= 0){
        const filteredItens= selectedItens.filter(item => {
            const itemIsDifferent= item != itemId
            return itemIsDifferent
        })

        selectedItens= filteredItens

    }else{
        selectedItens.push(itemId)
    }

    collectedItens.value= selectedItens
}