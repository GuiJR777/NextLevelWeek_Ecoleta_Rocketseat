const buttonSearch= document.querySelector("#page-home main a")
const modal= document.querySelector("#modal")
const Close= document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", ()=>{
    modal.classList.remove("hide")

})

Close.addEventListener("click", ()=>{
    modal.classList.add("hide")

} )