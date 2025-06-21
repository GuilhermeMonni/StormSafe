const apiKey = "fad4206b462bd563b99496c8ab24e956"

//localizacao do usuario
function buscarLoc() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true, // Força maior precisão
            timeout: 10000, // Tempo máximo de espera (10s)
            maximumAge: 0 // Não usa cache de posição
        };

        //localizacao do usuario
        navigator.geolocation.getCurrentPosition(function(pos) {
                let lat = pos.coords.latitude.toFixed(6)
                let lon = pos.coords.longitude.toFixed(6)

                let url =
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`

                fetch(url)
                    .then(res => res.json())
                    .then(dado => {
                        //cidade
                        let cidade = document.querySelector('#nomeCidade1')
                        let temperatura = document.querySelector('#temperatura1')
                        let descricao = document.querySelector('#descricao1')
                        let umidade = document.querySelector('#umidade1')

                        cidade.innerText = dado.name
                        temperatura.innerText = `Temperatura: ${Math.round(dado.main.temp)}°C`
                        descricao.innerText =
                            `Descrição: ${dado.weather[0].description}`
                        umidade.innerText =
                            `Umidade: ${dado.main.humidity}%`

                        buscarIcon()
                    }).catch(() => {
                        document.querySelector('.climaAtual').innerHTML =
                            "Erro ao obter clima local."
                    });
            },
            function() {
                document.querySelector('.climaAtual') = "Permissão de localização negada."
            });
    } else {
        document.querySelector('.climaAtual').innerHTML = "Geolocalização não suportada."
    }

    //btn limpar
    const divClimaAtual = document.querySelector(".climaAtual") //div
    const elementos = document.querySelectorAll(".classeClima") //elementos
    const btnLimpar = document.createElement("button") //botao

    setTimeout(() => {
        btnLimpar.classList.toggle("btnLimpar")

        divClimaAtual.appendChild(btnLimpar)
    }, 800)

    btnLimpar.innerText = "Limpar"
    btnLimpar.addEventListener("click", () => {
        elementos.forEach(e => {
            e.innerText = "" //infos buscadas
        })

        deleteImg(2)

        btnLimpar.classList.toggle("btnLimparDesativar")
    })
}

//buscar cidade
function buscarCid(event) {
    if (event) event.preventDefault()

    deleteImg(1)

    const nomeCidade = document.querySelector('#cidade').value.trim() //cidade digitada
    if (nomeCidade === '') return false

    buscarCidURL(`https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=${apiKey}&lang=pt_br&units=metric`) //buscar dados da cidade
        .then(dado => {
            if (!dado) throw new Error('Cidade não encontrada');

            const temperatura = dado.main.temp.toFixed(0) //temperatura
            const descricao = dado.weather[0].description //descricao
            const umidade = dado.main.humidity //umidade
            const cidade = dado.name //nome da cidade

            const txtNomeCidade = document.querySelector('#nomeCidade') //texto nome da cidade
            const txtTemperatura = document.querySelector('#temperatura')
            const txtDescricao = document.querySelector('#descricao')
            const txtUmidade = document.querySelector('#umidade')
            const inputCidade = document.querySelector('#cidade') //input txt cidade

            inputCidade.value = ''
            txtNomeCidade.innerText = cidade
            txtTemperatura.innerText = `Temperatura: ${temperatura}°C`
            txtDescricao.innerText = `Descrição: ${descricao}`
            txtUmidade.innerText = `Umidade: ${umidade}%`
        })

    //btn limpar
    const divBuscarClima = document.querySelector(".buscarClima") //div
    const elementos = document.querySelectorAll(".classeBuscarClima") //elementos
    const btnLimpar = document.createElement("button") //botao
    const inputText = document.querySelector("#cidade")

    setTimeout(() => {
        btnLimpar.classList.toggle("btnLimpar")

        divBuscarClima.appendChild(btnLimpar)
    }, 800)

    btnLimpar.innerText = "Limpar"
    btnLimpar.addEventListener("click", () => {
        elementos.forEach(e => {
            e.innerText = "" //infos buscadas
        })

        deleteImg(1)

        inputText.value = ""
        btnLimpar.classList.toggle("btnLimparDesativar")
    })

    return false
}

async function buscarCidURL(url) {
    //funcao para buscar dados
    try{
        const res = await fetch(url) //resposta
        if (!res.ok) throw new Error('Cidade não encontradas');
        const dado = await res.json()//dado em json
            
        //retorna uma array com a lat e lon
        return dado
    }
    catch(error){
        console.error("Erro ao buscar dados da cidade:", error);
        document.querySelector(".buscarClima").innerText = 'Cidade não encontrada!'
        return;
    }
}
    
