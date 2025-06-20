//js para icones do clima
function buscarIcon() { //resultado descricao
  setTimeout(() => {
    let txtClimaBuscar = document.querySelector(".descricaoBuscar").textContent; //descricao digitada

    let txtClimaAtual = document.querySelector(".descricaoAtual").textContent; //descricao loc atual

    if(txtClimaBuscar != ""){
      imgs(txtClimaBuscar, ".infoBuscar", "imgClasse1")
    }
    
    if(txtClimaAtual != ""){
      imgs(txtClimaAtual, ".infoAtual", "imgClasse2")
    }

    
  }, 800);
}

//definir imgs
function imgs(a, b, classe){ //funcao para definir as imagens
  //nuvens
    if (a.includes("nuve")) {
      const icon = "./img/nuvem.png"

      criarImg(icon, b, classe)
    }

    //nublado
    if (a.includes("nublado")) {
      const icon = "./img/nublado.png"

      criarImg(icon, b, classe)
    }

    //nevoa
    if(a.includes("névoa")){
      const icon = "./img/nevoa.png"

      criarImg(icon, b, classe)
    }

    //garoa
    if (a.includes("garoa")) {
      const icon = "./img/garoa.png"

      criarImg(icon, b, classe)
    }

    //chuva
    if (a.includes("chuva")) {
      const icon = "./img/chuva.png"

      criarImg(icon, b, classe)
    }

    //tempestade
    if (a.includes("tempestade")) {
      const icon = "./img/tempestade.png"

      criarImg(icon, b, classe)
    }

    //neve
    if (a.includes("neve")) {
      const icon = "./img/neve.png"

      criarImg(icon, b, classe)
    }

    //sol
    if (a.includes("sol")) {
      const icon = "./img/sol.png"

      criarImg(icon, b, classe)
    }

    //ceu limpo
    if (a.includes("limpo")) {
      let data = new Date()
      let horas = data.getHours()

      if(horas >= 18){
        const icon = "./img/lua-cheia.png"

        criarImg(icon, b, classe)

      }else{
        const icon = "./img/sol.png"

        criarImg(icon, b, classe)
      }
    }
}

//criar imagem cida
function criarImg(a, b, classe) {
  const divInfos = document.querySelector(b)
  let imgExistente = divInfos.querySelector("img")
  if (imgExistente) return

  let img = document.createElement("img")
  img.src = a
  img.style.width = "40%"
  img.style.margin = "10%"
  img.classList.add(classe)

  divInfos.appendChild(img)
}

//apagar img
function deleteImg(a){
  if(a == 1){
    let imgBuscar = document.querySelector(".imgClasse1")

    if(!imgBuscar){
      return true 
    } else{
      imgBuscar.remove()
    }

  }if(a == 2){
    let imgAtual = document.querySelector(".imgClasse2")

    imgAtual.remove()
  } 
} 
  