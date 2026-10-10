import { useState } from "react"
import "./App.css"
import { CommissionsTab } from "./features/commissions/CommissionsTab"
import { InterestTab } from "./features/interest/InterestTab"
import { InventoryTab } from "./features/inventory/InventoryTab"

type Tab = "commissions" | "inventory" | "interest"

const tabs: { id: Tab; label: string }[] = [
  { id: "commissions", label: "Comissões" },
  { id: "inventory", label: "Estoque" },
  { id: "interest", label: "Juros" }
]

const tabComponents = {
  commissions: CommissionsTab,
  inventory: InventoryTab,
  interest: InterestTab
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("commissions")
  const ActiveTabComponent = tabComponents[activeTab]

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
          <ActiveTabComponent />
        </div>
      </section>
    </main>
  )
}

export default App
