import { useState } from "react"
import "./InterestTab.css"
import { calculateInterest } from "./interestUtils"

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
})

const dateFormatter = new Intl.DateTimeFormat("pt-BR")

export function InterestTab() {
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState<ReturnType<
    typeof calculateInterest
  > | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setResult(null)

    const parsedAmount = Number(amount)

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Informe um valor maior que zero.")
      return
    }

    if (!dueDate) {
      setError("Informe a data de vencimento.")
      return
    }

    const [year, month, day] = dueDate.split("-").map(Number)
    const parsedDate = new Date(year, month - 1, day)

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      setError("Informe uma data de vencimento válida.")
      return
    }

    setResult(calculateInterest(parsedAmount, dueDate))
  }

  return (
    <div className="interest">
      <div className="interest-heading">
        <h2>Calculadora de juros</h2>
        <p>
          Calcule os juros de uma dívida com base no valor e na data de
          vencimento.
        </p>
      </div>

      <form className="interest-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="debt-amount">Valor original (R$)</label>
          <input
            id="debt-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Ex.: 1000.00"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="due-date">Data de vencimento</label>
          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </div>

        {error && (
          <p className="interest-error" role="alert">
            {error}
          </p>
        )}

        <button className="interest-submit" type="submit">
          Calcular juros
        </button>
      </form>

      {result && (
        <section className="interest-result" aria-live="polite">
          <p className="result-eyebrow">RESULTADO DO CÁLCULO</p>

          <p className="result-label">Valor total atualizado</p>
          <p className="result-total">
            {currencyFormatter.format(result.total)}
          </p>

          <div className="result-details">
            <div>
              <span>Valor original</span>
              <strong>{currencyFormatter.format(result.amount)}</strong>
            </div>
            <div>
              <span>Vencimento</span>
              <strong>
                {dateFormatter.format(new Date(`${result.dueDate}T12:00:00`))}
              </strong>
            </div>
            <div>
              <span>Dias de atraso</span>
              <strong>{result.daysLate}</strong>
            </div>
            <div>
              <span>Taxa diária</span>
              <strong>2,5%</strong>
            </div>
            <div>
              <span>Juros calculados</span>
              <strong className="interest-amount">
                {currencyFormatter.format(result.interest)}
              </strong>
            </div>
          </div>

          {result.daysLate === 0 && (
            <p className="interest-note">
              Não há atraso na data de referência. Nenhum juro foi aplicado.
            </p>
          )}
        </section>
      )}
    </div>
  )
}
