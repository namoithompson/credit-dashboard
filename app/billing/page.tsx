
export default function Billing() {
  return (
    <div className="space-y-6">
      <div className="header-bar">Billing and Payments</div>
      <div className="card p-6">
        <div className="card p-4 mb-6">
          <div className="text-lg font-semibold">Saved Card</div>
          <div className="text-gray-500 text-sm">No payment method saved.</div>
        </div>
        <div className="space-y-3">
          <div><label className="label">Name on Card</label><input className="input"/></div>
          <div><label className="label">Card Number</label><input className="input" placeholder="Card number"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Expiry Date</label><input className="input" placeholder="MM/YYYY"/></div>
            <div><label className="label">CVV</label><input className="input" placeholder="•••"/></div>
          </div>
          <button className="btn-primary mt-4">Save Card</button>
        </div>
      </div>
    </div>
  )
}
