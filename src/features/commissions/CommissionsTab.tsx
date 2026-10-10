import { useState } from "react"
import { sales } from "../../data/sales"
import "./CommissionsTab.css"
import { calculateSalesCommissions } from "./commissionsUtils"

type SortColumn = "seller" | "amount" | "commissionRate" | "commission"

type SortDirection = "asc" | "desc"

const sortableColumns: { key: SortColumn; label: string }[] = [
  { key: "seller", label: "Vendedor" },
  { key: "amount", label: "Valor da venda" },
  { key: "commissionRate", label: "Taxa" },
  { key: "commission", label: "Comissão" }
]

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
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  function handleSort(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortColumn(column)
    setSortDirection("asc")
  }

  const sortedSales = [...salesWithCommissions]

  if (sortColumn) {
    sortedSales.sort((a, b) => {
      const firstValue = a[sortColumn]
      const secondValue = b[sortColumn]

      let comparison: number

      if (typeof firstValue === "string") {
        comparison = firstValue.localeCompare(String(secondValue), "pt-BR")
      } else {
        comparison = firstValue - Number(secondValue)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }

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

      <div className="table-wrapper summary-table-wrapper">
        <table className="data-table summary-table">
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

      <div className="table-wrapper details-table-wrapper">
        <table className="data-table details-table">
          <thead>
            <tr>
              {sortableColumns.map(({ key, label }) => (
                <th key={key} scope="col">
                  <button
                    type="button"
                    className="sort-button"
                    onClick={() => handleSort(key)}
                    aria-label={`Ordenar por ${label}`}
                  >
                    {label}
                    <span className="sort-indicator" aria-hidden="true">
                      {sortColumn === key
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedSales.map((sale) => (
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
