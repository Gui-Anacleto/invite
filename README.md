# Convite interativo da Alice

Convite digital responsivo para o primeiro aniversário da Alice, criado com React e Vite. A primeira tela usa a própria imagem de referência (`public/images/convite-referencia.png`) para preservar a composição, as flores, as borboletas e a tipografia. Data, horário e local são apresentados por cima da arte a partir da configuração e os três botões visíveis são interativos.

## Requisitos

- Node.js LTS
- npm

## Executar localmente

Na pasta do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra no navegador o endereço local exibido pelo Vite. Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Dados da festa

Edite `src/partyConfig.js` para atualizar o nome, idade, data, horário, telefone e sugestões de presentes. O endereço e o link de mapas ficam em `PARTY.location`:

- `address`: deixe vazio enquanto o local estiver a definir. Ao preenchê-lo, o convite exibirá o endereço e gerará uma rota para esse destino no Google Maps.
- `mapsUrl`: opcional; use este campo para fornecer um link específico do Google Maps. Quando preenchido, ele será usado no botão de rota.

O projeto não define ano, endereço ou coordenadas para a festa. A confirmação abre o WhatsApp com nome e quantidade de pessoas preenchidos; o convidado ainda precisa enviar a mensagem.

## Publicar

Execute `npm run build`. Publique o conteúdo da pasta `dist` em um serviço de hospedagem estática, como Vercel ou Netlify. A configuração padrão do Vite funciona sem ajustes adicionais para uma publicação na raiz do domínio.

As sugestões de presentes são estáticas nesta versão; não há reservas nem banco de dados.
