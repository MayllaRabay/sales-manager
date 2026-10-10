import { useState } from "react"
import { products } from "../../data/products"
import "./InventoryTab.css"

type MovementType = "entry" | "exit"

type StockMovement = {
  id: string
  productCode: number
  type: MovementType
  quantity: number
  description: string
}

const numberFormatter = new Intl.NumberFormat("pt-BR")

export function InventoryTab() {
  const [movements, setMovements] = useState<StockMovement[]>([])
  const [productCode, setProductCode] = useState(products[0].code)
  const [type, setType] = useState<MovementType>("entry")
  const [quantity, setQuantity] = useState("1")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const stockByProduct = products.map((product) => {
    const balance = movements.reduce((stock, movement) => {
      if (movement.productCode !== product.code) {
        return stock
      }

      return movement.type === "entry"
        ? stock + movement.quantity
        : stock - movement.quantity
    }, product.initialStock)

    return { ...product, currentStock: balance }
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const parsedQuantity = Number(quantity)
    const selectedProduct = stockByProduct.find(
      (product) => product.code === productCode
    )

    if (
      !selectedProduct ||
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity <= 0
    ) {
      setError("Informe uma quantidade inteira maior que zero.")
      return
    }

    if (!description.trim()) {
      setError("Informe uma descrição para a movimentação.")
      return
    }

    if (type === "exit" && parsedQuantity > selectedProduct.currentStock) {
      setError("A saída não pode ser maior que o estoque disponível.")
      return
    }

    const movement: StockMovement = {
      id: `MOV-${String(movements.length + 1).padStart(3, "0")}`,
      productCode,
      type,
      quantity: parsedQuantity,
      description: description.trim()
    }

    setMovements((current) => [...current, movement])
    setQuantity("1")
    setDescription("")
  }

  return (
    <div className="inventory">
      <div className="inventory-heading">
        <div>
          <h2>Controle de estoque</h2>
          <p>Consulte os saldos e registre entradas ou saídas.</p>
        </div>
        <span className="inventory-count">{products.length} produtos</span>
      </div>

      <div className="inventory-section">
        <h3>Saldo atual</h3>

        <div className="table-wrapper">
          <table className="data-table inventory-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Produto</th>
                <th>Estoque inicial</th>
                <th>Estoque atual</th>
              </tr>
            </thead>
            <tbody>
              {stockByProduct.map((product) => (
                <tr key={product.code}>
                  <td>{product.code}</td>
                  <td>{product.description}</td>
                  <td>{numberFormatter.format(product.initialStock)}</td>
                  <td className="stock-balance">
                    {numberFormatter.format(product.currentStock)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="inventory-section">
        <h3>Registrar movimentação</h3>

        <form className="movement-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="product">Produto</label>
            <select
              id="product"
              value={productCode}
              onChange={(event) => setProductCode(Number(event.target.value))}
            >
              {products.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.description}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="movement-type">Tipo de movimentação</label>
            <select
              id="movement-type"
              value={type}
              onChange={(event) => setType(event.target.value as MovementType)}
            >
              <option value="entry">Entrada</option>
              <option value="exit">Saída</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ex.: Reposição de mercadoria"
            />
          </div>

          {error && (
            <p className="inventory-error" role="alert">
              {error}
            </p>
          )}

          <button className="movement-submit" type="submit">
            Registrar movimentação
          </button>
        </form>
      </div>

      <div className="inventory-section">
        <h3>Histórico de movimentações</h3>

        {movements.length === 0 ? (
          <p className="inventory-empty">
            Nenhuma movimentação registrada. Use o formulário acima para
            começar.
          </p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table inventory-table">
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Produto</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((movement) => {
                  const product = products.find(
                    (item) => item.code === movement.productCode
                  )

                  return (
                    <tr key={movement.id}>
                      <td>{movement.id}</td>
                      <td>{product?.description}</td>
                      <td>
                        <span className={`movement-badge ${movement.type}`}>
                          {movement.type === "entry" ? "Entrada" : "Saída"}
                        </span>
                      </td>
                      <td>{numberFormatter.format(movement.quantity)}</td>
                      <td>{movement.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
