function carregarMapa() {
    const mapa = L.map('mapa').setView([-30.0346, -51.2177], 7) // RS centralizado

    mapa.invalidateSize()

    // Mapa base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa)

    // Lista de cidades com coordenadas
    const cidades = [
    { nome: "Porto Alegre", lat: -30.0346, lon: -51.2177 },
    { nome: "Pelotas", lat: -31.7649, lon: -52.3371 },
    { nome: "Caxias do Sul", lat: -29.1678, lon: -51.1794 },
    { nome: "Santa Maria", lat: -29.6842, lon: -53.8069 },
    { nome: "Passo Fundo", lat: -28.262, lon: -52.4066 },
    { nome: "Uruguaiana", lat: -29.7614, lon: -57.0853 },
    { nome: "Bagé", lat: -31.3313, lon: -54.1064 },
    { nome: "Rio Grande", lat: -32.0349, lon: -52.1071 },
    { nome: "Santa Cruz do Sul", lat: -29.7153, lon: -52.4259 },
    { nome: "Novo Hamburgo", lat: -29.6875, lon: -51.1328 },
    { nome: "Lajeado", lat: -29.4593, lon: -51.9645 }
    ];

    cidades.forEach(cidade => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cidade.lat}&lon=${cidade.lon}&appid=${apiKey}&lang=pt_br&units=metric`

        fetch(url)
            .then(res => res.json())
            .then(dado => {
                const temp = Math.round(dado.main.temp)
                const desc = dado.weather[0].description

                L.marker([cidade.lat, cidade.lon])
                    .addTo(mapa)
                    .bindPopup(`<strong>${cidade.nome}</strong><br>Temp: ${temp}°C<br>${desc}`)
            });
    });
}