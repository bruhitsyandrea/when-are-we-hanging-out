import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import "./App.css";



type View = "menu" | "form" | "confirmation";

function App() {
  const [view, setView] = useState<View>("menu");
  const [closing, setClosing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [contactText, setContactText] = useState("");


  const handleMenuClick = () => {
    setClosing(true);
    setTimeout(() => {
      setView("form");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { error } = await supabase.from("orders").insert([
      {
        name: customerName,
        date: selectedDate,
        options: selectedOptions,
        details: detailsText,
        contact: contactText,
      },
    ]);
  
    if (error) {
      console.error(error);
      alert("Something went wrong.");
      return;
    }
  
    const randomOrder = Math.floor(100 + Math.random() * 900);
    setOrderNumber(randomOrder);
    setView("confirmation");
  };
  
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);
  
  

  const options = [
    "Lunch",
    "Dinner",
    "Café",
    "Walk",
    "Shopping",
    "Gossip",
    "Fun?",
    "Museums",
  ];
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };
  
  
  return (
    <div className="app">

    {view === "menu" && (
      <div
        className={`menu-wall ${closing ? "zoom-out" : ""}`}
        onClick={handleMenuClick}
      >
        <div className="menu-container">
          <h1>Café with Andrea</h1>
          <p className="subtitle">when are we hanging out?</p>
          <div className="divider"></div>

          <div className="menu-items">
            <p>SPILL LE THÉ</p>
            <p>LATE NIGHT SPECIAL</p>
            <p>STUDY SESSION</p>
            <p>YUM YUM</p>
            <p>SIDE QUESTS MAYBE</p>
            <p>SURPRISE ME</p>
          </div>

          <p className="hint">tap anywhere to place your order</p>
        </div>
      </div>
    )}



      {view === "form" && (
        <div className="form-card">
          <button
            className="back-link"
            type="button"
            onClick={() => {
              setClosing(false);
              setView("menu");
            }}
            
          >
            ← back to menu
          </button>

          <h2>ORDER SLIP</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Customer Name
              <input
                type="text"
                required
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </label>

            <label>
              Preferred Date
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

            </label>
            
            <div className="option-group">
              <p className="option-title">Select your order</p>
              <div className="options">
                {options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`option-chip ${
                      selectedOptions.includes(option) ? "selected" : ""
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                    {selectedOptions.includes(option) && " ×"}
                  </button>
                ))}
              </div>
            </div>

            <label>
              Can you be more specific?
              <textarea
                rows={3}
                value={detailsText}
                onChange={(e) => setDetailsText(e.target.value)}
              />

            </label>

            <label>
              How do I contact you? ins? phone number? line :p?
              <input
                type="text"
                required
                value={contactText}
                onChange={(e) => setContactText(e.target.value)}
              />

            </label>

            <button type="submit">Place Order</button>
          </form>
        </div>
      )}

      {view === "confirmation" && (
        <div className="form-card">
          <h2>ORDER #{orderNumber}</h2>
          <p>for: {customerName}</p>
          <p>Your order has been sent to the barista.</p>
          <p>If accepted, you will be contacted shortly.</p>

          <button
            type="button"
            onClick={() => {
              setSelectedOptions([]);
              setCustomerName("");
              setSelectedDate("");
              setDetailsText("");
              setContactText("");
            
              setClosing(false); // 👈 THIS IS THE FIX
              setView("menu");
            }}
            
          >
            Back to Café
          </button>
        </div>
      )}

    </div>
  );
}

export default App;
