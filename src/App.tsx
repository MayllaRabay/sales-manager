import { useState } from "react"
import "./App.css"
import { CommissionsTab } from "./features/commissions/CommissionsTab"

type Tab = "commissions" | "inventory" | "interest"

const tabs: { id: Tab; label: string }[] = [
  { id: "commissions", label: "Comissões" },
  { id: "inventory", label: "Estoque" },
  { id: "interest", label: "Juros" }
]

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("commissions")

  const activeTabContent = {
    commissions: {
      title: "Cálculo de comissões",
      description:
        "Consulte as vendas e calcule automaticamente a comissão de cada vendedor."
    },
    inventory: {
      title: "Controle de estoque",
      description: "Consulte produtos e registre entradas e saídas de estoque."
    },
    interest: {
      title: "Cálculo de juros",
      description:
        "Informe um valor e uma data de vencimento para calcular os juros por atraso."
    }
  }

  const content = activeTabContent[activeTab]

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">GESTÃO INTEGRADA</p>
          <h1>Sales Manager</h1>
          <p className="app-description">
            Gerencie vendas, movimentações de estoque e cobranças em um só
            lugar.
          </p>
        </div>
      </header>

      <section className="app-content">
        <nav className="tabs" aria-label="Funcionalidades">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="tab-content">
          {activeTab === "commissions" ? (
            <CommissionsTab />
          ) : (
            <>
              <h2>{content.title}</h2>
              <p>{content.description}</p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
