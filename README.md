# 🚀 Sales Manager

## 💻 Sobre o projeto

Aplicação web desenvolvida como desafio técnico de front-end, com o objetivo de implementar três funcionalidades relacionadas à gestão de vendas e operações financeiras: cálculo de comissões por vendedor, controle de movimentações de estoque e cálculo de juros por atraso.

O projeto foi desenvolvido com foco em organização, legibilidade, reutilização de componentes e separação das responsabilidades, buscando manter o código simples e fácil de evoluir.

### ✨ Funcionalidades

- **Comissões:** cálculo automático das comissões sobre as vendas, de acordo com o valor de cada venda.
- **Estoque:** consulta do estoque inicial e atualizado dos produtos, com registro de entradas e saídas e validação para evitar saídas superiores à quantidade disponível.
- **Juros:** cálculo dos juros por atraso a partir do valor original da dívida e da data de vencimento.

### 📋 Regras de negócio

**Comissões por venda**

- Vendas abaixo de R$ 100,00: sem comissão.
- Vendas a partir de R$ 100,00 e abaixo de R$ 500,00: comissão de 1%.
- Vendas a partir de R$ 500,00: comissão de 5%.

**Controle de estoque**

- Cada produto possui um código, uma descrição e uma quantidade inicial em estoque.
- As movimentações de entrada e saída atualizam a quantidade disponível.
- Não são permitidas movimentações com quantidades inválidas ou saídas superiores ao estoque disponível.

**Cálculo de juros**

- Taxa de juros simples de 2,5% ao dia de atraso, aplicada sobre o valor original da dívida.
- Não há cobrança de juros antes ou na data de vencimento.
- Os juros são arredondados para duas casas decimais antes de serem somados ao valor original.

_Observação: a regra de juros simples foi adotada como premissa de implementação para interpretar o enunciado do desafio._

## 💡 Pré-requisitos

Para executar o projeto localmente, você precisará de:

- [Git](https://git-scm.com/) para clonar o repositório.
- [Node.js](https://nodejs.org/) para executar a aplicação e gerenciar as dependências com o NPM.
- Um editor de código de sua preferência, como [Visual Studio Code](https://code.visualstudio.com/).

## 🚀 Como executar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/MayllaRabay/sales-manager.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd sales-manager
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse o endereço exibido no terminal, normalmente:

   http://localhost:5173/

### 🏗️ Build de produção

Para verificar se a aplicação está pronta para produção, execute:

```bash
npm run build
```

Para visualizar localmente a versão gerada pelo build:

```bash
npm run preview
```

## 🔧 Tecnologias utilizadas

- [React](https://react.dev/) — construção da interface.
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática e maior segurança no desenvolvimento.
- [Vite](https://vite.dev/) — ambiente de desenvolvimento e build.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) — estilização da aplicação.
- [Git](https://git-scm.com/) e [GitHub](https://github.com/) — versionamento e hospedagem do código.

## 🌐 Deploy

A aplicação está preparada para ser publicada na [Vercel](https://vercel.com/).

## 👩‍💻 Autora

Desenvolvido por **Maylla Rabay**.

[LinkedIn](https://www.linkedin.com/in/mayllarabay/) · [GitHub](https://github.com/MayllaRabay)
