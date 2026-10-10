import type { Sale } from "../../data/sales"

export type SaleWithCommission = Sale & {
  commissionRate: number
  commission: number
}

export function calculateCommission(amount: number): number {
  if (amount < 100) {
    return 0
  }

  if (amount < 500) {
    return 0.01
  }

  return 0.05
}

export function calculateSalesCommissions(sales: Sale[]): SaleWithCommission[] {
  return sales.map((sale) => {
    const commissionRate = calculateCommission(sale.amount)

    return {
      ...sale,
      commissionRate,
      commission: sale.amount * commissionRate
    }
  })
}
