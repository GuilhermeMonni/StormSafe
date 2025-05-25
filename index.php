<?php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos/pagInicial.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="shortcut icon" href="favicon_io/favicon.ico" type="image/x-icon">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
    <script src="./scripts/mapa.js" defer></script>
    <script src="./scripts/icons.js" defer></script>
    <script>
    //chave api
    window.apiKey = "<?php echo $apiKey ?>"

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
                            let alertas = document.querySelector('.alertas')

                            cidade.innerText = dado.name
                            temperatura.innerText = `Temperatura: ${Math.round(dado.main.temp)}°C`
                            descricao.innerText =
                                `Descrição: ${dado.weather[0].description}`
                            umidade.innerText =
                                `Umidade: ${dado.main.humidity}%`
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
        }, 2000)

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

        const nomeCidade = document.querySelector('#cidade').value.trim()
        if (nomeCidade === '') return false

        fetch(`buscarClima.php?cidade=${encodeURIComponent(nomeCidade)}`)
            .then(res => {
                if (!res.ok) throw new Error('Cidade não encontrada');
                return res.json();
            })
            .then(dado => {
                document.querySelector('#nomeCidade').innerText = dado.name
                document.querySelector('#temperatura').innerText =
                    `Temperatura: ${Math.round(dado.main.temp)}°C`
                document.querySelector('#descricao').innerText = `Descrição: ${dado.weather[0].description}`
                document.querySelector('#umidade').innerText = `Umidade: ${dado.main.humidity}%`
            })
            .catch(() => {
                document.querySelector(".buscarClima").innerText = 'Cidade não encontrada!'
            })

        //btn limpar
        const divBuscarClima = document.querySelector(".buscarClima") //div
        const elementos = document.querySelectorAll(".classeBuscarClima") //elementos
        const btnLimpar = document.createElement("button") //botao
        const inputText = document.querySelector("#cidade")


        setTimeout(() => {
            btnLimpar.classList.toggle("btnLimpar")

            divBuscarClima.appendChild(btnLimpar)
        }, 2000)

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
    </script>
    <title>StormSafe</title>
</head>

<body onload="carregarMapa();">
    <header>
        <div class="nav-logo">
            <img src="img/logo-stormsafe.png" alt="Logo StormSafe">
        </div>
        <div class="nav-txt">
            <h3>Monitore o clima, identifique riscos e ajude sua comunidade</h3>
        </div>
    </header>
    <main>
        <h3 id="txt-inicio">Verifique o clima das cidades</h3>
        <div class="climas">
            <div class="buscarClima">
                <form method="get" onsubmit="return buscarCid(event)">
                    <input type="text" name="cidade" id="cidade" placeholder="Digite o nome da cidade">
                    <input class="btnClima" type="button" onclick="buscarCid(), buscarIcon()" value="Buscar">
                    <div class="infos infoBuscar">
                        <h2 class="classeBuscarClima" id="nomeCidade"></h2>
                        <p class="classeBuscarClima" id="temperatura"></p>
                        <p class="classeBuscarClima descricaoBuscar" id="descricao"></p>
                        <p class="classeBuscarClima" id="umidade"></p>
                    </div>
                </form>
            </div>

            <div class="climaAtual">
                <button class="btnClima2" type="button" onclick="buscarLoc(), buscarIcon()">Buscar minha
                    localização</button>
                <div class="infos infoAtual">
                    <h2 class="classeClima" id="nomeCidade1"></h2>
                    <p class="classeClima" id="temperatura1"></p>
                    <p class="classeClima descricaoAtual" id="descricao1"></p>
                    <p class="classeClima" id="umidade1"></p>
                </div>
            </div>
        </div>

        <h3 id="txt-inicio">Cidades pré-definidas</h3>
        <div id="mapa">
        </div>
    </main>
    <footer>
        <div class="footer-links">
            <a href="https://github.com/GuilhermeMonni" target="_blank"><img src="./img/github.png"
                    alt="Logo GitHub"></a>
            <a href="https://www.instagram.com/monni.05/" target="_blank"><img src="./img/instagram.png"
                    alt="Logo Instagram"></a>
            <a href="https://www.linkedin.com/in/guilherme-monni-a542a9244" target="_blank"><img
                    src="./img/linkedin.png" alt="Logo Linkedin"></a>
        </div>
        <div class="footer-cop">
            <p>&copy; 2025 StormSafe.</p>
            <img src="./img/logo.png" alt="Logo pessoal">
        </div>
    </footer>
</body>

</html>