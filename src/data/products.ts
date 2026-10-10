type RawProduct = {
  codigoProduto: number
  descricaoProduto: string
  estoque: number
}

export type Product = {
  code: number
  description: string
  initialStock: number
}

const productsData: RawProduct[] = [
  {
    codigoProduto: 101,
    descricaoProduto: "Caneta Azul",
    estoque: 150
  },
  {
    codigoProduto: 102,
    descricaoProduto: "Caderno Universitário",
    estoque: 75
  },
  {
    codigoProduto: 103,
    descricaoProduto: "Borracha Branca",
    estoque: 200
  },
  {
    codigoProduto: 104,
    descricaoProduto: "Lápis Preto HB",
    estoque: 320
  },
  {
    codigoProduto: 105,
    descricaoProduto: "Marcador de Texto Amarelo",
    estoque: 90
  }
]

export const products: Product[] = productsData.map((product) => ({
  code: product.codigoProduto,
  description: product.descricaoProduto,
  initialStock: product.estoque
}))
