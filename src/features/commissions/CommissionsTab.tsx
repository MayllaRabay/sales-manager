import { sales } from "../../data/sales"
import "./CommissionsTab.css"
import { calculateSalesCommissions } from "./commissionsUtils"

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
})

const percentageFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 0
})

export function CommissionsTab() {
  const salesWithCommissions = calculateSalesCommissions(sales)

  const sellerTotals = salesWithCommissions.reduce<
    Record<string, { sales: number; commission: number }>
  >((totals, sale) => {
    const current = totals[sale.seller] ?? { sales: 0, commission: 0 }

    totals[sale.seller] = {
      sales: current.sales + sale.amount,
      commission: current.commission + sale.commission
    }

    return totals
  }, {})

  return (
    <div className="commissions">
      <div className="commissions-header">
        <div>
          <h2>Comissões por vendedor</h2>
          <p>Resumo das vendas e comissões calculadas.</p>
        </div>
        <span className="sales-count">{sales.length} vendas</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Total vendido</th>
              <th>Comissão</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(sellerTotals).map(([seller, totals]) => (
              <tr key={seller}>
                <td>{seller}</td>
                <td>{currencyFormatter.format(totals.sales)}</td>
                <td className="commission-value">
                  {currencyFormatter.format(totals.commission)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="sales-list-title">Detalhamento das vendas</h3>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Valor da venda</th>
              <th>Taxa</th>
              <th>Comissão</th>
            </tr>
          </thead>
          <tbody>
            {salesWithCommissions.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.seller}</td>
                <td>{currencyFormatter.format(sale.amount)}</td>
                <td>{percentageFormatter.format(sale.commissionRate)}</td>
                <td className="commission-value">
                  {currencyFormatter.format(sale.commission)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
