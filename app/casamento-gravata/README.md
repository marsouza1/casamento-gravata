# 💍 Ranking da Gravata — Casamento Leo & Lari

Site para a **brincadeira da gravata**: um painel no celular vai registrando os presentes em dinheiro, e o **telão** mostra o ranking em tempo real — estilo dashboard, com Placar lateral, card de destaque para o 1º lugar, 2º/3º lugar, painel de prêmio (com foto que você envia) e um Live Feed contando o que está acontecendo.

Tudo **100% gratuito** (Next.js + Supabase + Vercel).

- **`/telao`** → abre na TV/projetor.
- **`/admin`** → abre no celular. É onde você digita os presentes e configura o prêmio.

---

## 🧩 Como funciona (visão geral)

1. Você cria um banco de dados grátis no **Supabase**.
2. Roda o site (localmente ou publica no **Vercel**).
3. Abre `/telao` na TV e `/admin` no celular.
4. Tudo que você digita no celular aparece no telão **na hora**, sem apertar F5 — inclusive o Live Feed e a foto do prêmio.

### Por que atualiza sozinho?

O projeto usa o **Supabase Realtime**: o celular e o telão ficam "ouvindo" as mesmas tabelas do banco de dados. Quando o celular grava uma mudança, o Supabase avisa todo mundo que está ouvindo — inclusive o telão — e a tela se atualiza sozinha. Isso vale para:
- o ranking (presentes),
- o Live Feed (que é calculado a partir do próprio ranking),
- e o prêmio (nome + imagem).

---

## ✅ Passo 1 — Criar o banco no Supabase (3 minutos)

1. Acesse **https://supabase.com** e crie uma conta (grátis).
2. Clique em **New project**. Dê um nome (ex: `casamento-gravata`), crie uma senha e escolha a região mais próxima (South America).
3. Aguarde o projeto ficar pronto (~1 min).
4. No menu lateral, abra **SQL Editor** → **New query**.
5. Abra o arquivo **`supabase/setup.sql`** deste projeto, **copie tudo**, cole no editor e clique em **Run**.

Isso cria:
- a tabela `gifts` (os presentes),
- a tabela `settings` (nome e imagem do prêmio),
- o "bucket" `prize-images` no Storage (onde a foto do prêmio fica guardada),
- e liga o tempo real em tudo isso. ✅

### Pegar as chaves do Supabase

1. **Project Settings** (ícone de engrenagem) → **Data API** → copie o **Project URL**.
2. **Project Settings** → **API Keys** → copie a chave **`anon` / `public`**.

---

## ✅ Passo 2 — Rodar no seu computador (opcional, para testar)

```bash
npm install
cp .env.local.example .env.local
```

Abra o `.env.local` e cole suas chaves:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

Depois:

```bash
npm run dev
```

- Painel do celular: **http://localhost:3000/admin**
- Telão: **http://localhost:3000/telao**

Adicione um presente no `/admin`, mude um valor, envie uma imagem de prêmio — e veja o `/telao` reagir sozinho, na mesma rede ou até em abas diferentes.

---

## ✅ Passo 3 — Publicar de graça no Vercel

### 3.1 — Subir o código pro GitHub

```bash
git init
git add .
git commit -m "Ranking da gravata - casamento Leo e Lari"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/casamento-gravata.git
git push -u origin main
```

### 3.2 — Importar no Vercel

1. **https://vercel.com** → entre com o GitHub.
2. **Add New → Project** → selecione o repositório.
3. Em **Environment Variables**, adicione:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | sua URL do Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sua chave anon |

4. **Deploy**.

Pronto! Link tipo `https://casamento-gravata.vercel.app`.

- TV: `https://SEU-LINK.vercel.app/telao`
- Celular: `https://SEU-LINK.vercel.app/admin`

> **Dica:** salve o link do `/admin` na tela inicial do celular.

### Atualizações futuras

```bash
git add .
git commit -m "descrição da mudança"
git push origin main
```

O Vercel republica sozinho.

---

## 📁 Estrutura do projeto

```
casamento-gravata/
├── app/
│   ├── layout.js         → fontes (Playfair, Cormorant, Outfit)
│   ├── globals.css       → fundos claro (admin) e escuro (telão)
│   ├── page.js           → tela inicial
│   ├── admin/page.js     → PAINEL DO CELULAR
│   └── telao/page.js     → PAINEL DO TELÃO
│
├── components/
│   ├── admin/
│   │   ├── GiftForm.jsx    → formulário de adicionar
│   │   ├── GiftItem.jsx    → item da lista (editar/excluir/+/-)
│   │   └── PrizeEditor.jsx → nome + upload de imagem do prêmio
│   └── telao/
│       ├── RankingBoard.jsx → monta 1º/2º/3º + calcula o Live Feed + confete
│       ├── ChampionCard.jsx → card grande do 1º lugar
│       ├── RunnerCard.jsx   → cards do 2º e 3º lugar
│       ├── Sidebar.jsx      → "Placar" (4º ao 10º)
│       ├── PrizePanel.jsx   → painel do prêmio (imagem + nome)
│       ├── LiveFeed.jsx     → barra de eventos
│       └── Clock.jsx        → relógio
│
├── hooks/
│   ├── useGifts.js       → dados dos presentes + tempo real
│   └── useSettings.js    → nome/imagem do prêmio + upload + tempo real
│
├── lib/
│   ├── supabaseClient.js
│   └── format.js
│
└── supabase/
    └── setup.sql         → cria as tabelas, o bucket e liga o tempo real
```

---

## 🎨 Onde mudar as coisas mais comuns

- **Nome dos noivos:** `Leo`/`Lari` em `app/page.js`, `app/admin/page.js`, `app/telao/page.js`.
- **Nome do prêmio ("Green Label"):** não precisa mexer no código — troque direto no painel do celular, na seção "🏆 Prêmio do 1º lugar". O valor padrão está em `hooks/useSettings.js` (`DEFAULT_TITLE`).
- **Foto do prêmio:** envie pelo painel do celular (aceita PNG). Sem foto, aparece uma garrafa ilustrativa de exemplo.
- **Cores:** `tailwind.config.js`.
- **Valor dos botões +/−:** `components/admin/GiftItem.jsx`, função `bump` (hoje R$ 50).
- **Quantidade no Placar/Ranking:** `app/telao/page.js` (`gifts.slice(3, 10)`) e `RankingBoard.jsx` (`gifts.slice(0, 10)`).
- **Mensagens do Live Feed:** `components/telao/RankingBoard.jsx`.

---

## ❓ Dúvidas rápidas

**O telão não atualiza sozinho.**
Confira se rodou o `supabase/setup.sql` inteiro (as linhas `alter publication supabase_realtime add table ...` são o que ligam o tempo real).

**Enviei uma imagem no celular e não apareceu no telão.**
Confira se o bucket `prize-images` foi criado (ele vem no mesmo `setup.sql`). Se a imagem não aparecer, veja a mensagem de erro que aparece embaixo do botão de upload no painel.

**Posso trocar o prêmio para algo que não seja whisky?**
Sim — o nome e a imagem são livres, edite pelo próprio painel do celular a qualquer momento.

**Posso deixar vários celulares no /admin ao mesmo tempo?**
Pode. Todos escrevem no mesmo banco e o telão reflete tudo.

---

Feito com carinho para o casamento do **Leo ❤ Lari**. 🥂
