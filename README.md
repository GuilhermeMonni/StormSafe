# 🌩️ StormSafe

**StormSafe** é um sistema de previsão do tempo desenvolvido em PHP, com foco em fornecer informações meteorológicas em tempo real de forma simples e acessível.

## ⚙️ Funcionalidades

- Consulta de clima atual por cidade
- Conexão com APIs meteorológicas para dados atualizados
- Exibição de informações como temperatura, umidade e condições climáticas

## 🧰 Tecnologias utilizadas

- PHP
- JavaScript
- HTML5 e CSS3
- OpenWeatherMap ((https://openweathermap.org/api/one-call-3))

## 📦 Estrutura do projeto

- `index.php`: Página principal para consulta do clima
- `buscarClima.php`: Script responsável por buscar os dados meteorológicos
- `config.php`: Arquivo de configuração com as credenciais da API
- `scripts/`: Scripts JavaScript utilizados no projeto
- `estilos/`: Arquivos de estilo CSS
- `img/`: Imagens utilizadas na interface

## 🚀 Como executar

1. Clone este repositório para o diretório do seu servidor web:

   ```bash
   git clone https://github.com/GuilhermeMonni/StormSafe.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd StormSafe
   ```

3. Configure as credenciais da API meteorológica no arquivo `config.php`.

4. Inicie o servidor web e acesse o sistema através do navegador:

   ```
   http://localhost/StormSafe/index.php
   ```

## 📝 Observações

Este projeto foi desenvolvido para fins didáticos. Para uso em produção, recomenda-se implementar medidas de segurança adicionais e otimizações de desempenho.

---

Sinta-se à vontade para abrir uma *issue* neste repositório caso tenha alguma sugestão ou encontre algum problema.
