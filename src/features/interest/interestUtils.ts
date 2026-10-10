const DAILY_INTEREST_RATE = 0.025

export type InterestCalculation = {
  amount: number
  dueDate: string
  daysLate: number
  interest: number
  total: number
}

export function calculateInterest(
  amount: number,
  dueDate: string,
  referenceDate = new Date()
): InterestCalculation {
  const [year, month, day] = dueDate.split("-").map(Number)

  // Criamos as datas no horário local para evitar diferenças de fuso horário.
  const due = new Date(year, month - 1, day)
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  )

  const daysLate = Math.max(
    0,
    Math.floor((today.getTime() - due.getTime()) / 86_400_000)
  )

  const interest =
    Math.round(amount * DAILY_INTEREST_RATE * daysLate * 100) / 100

  const total = amount + interest

  return {
    amount,
    dueDate,
    daysLate,
    interest,
    total
  }
}
