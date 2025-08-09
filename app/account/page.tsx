
export default function Account() {
  return (
    <div className="space-y-6">
      <div className="header-bar">Account Settings</div>
      <div className="grid grid-cols-12 gap-8 mt-4">
        <div className="col-span-3 card p-4 space-y-2">
          {['Personal Info','Contact Info','Identification','Supporting Billing Document','Login Credentials'].map(x=>(
            <div key={x} className="px-3 py-2 rounded hover:bg-gray-50">{x}</div>
          ))}
        </div>
        <div className="col-span-9 card p-6 space-y-6">
          <div>
            <div className="section-title">Personal Info</div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">First Name</label><input className="input"/></div>
              <div><label className="label">Middle Name</label><input className="input"/></div>
              <div><label className="label">Last Name</label><input className="input"/></div>
              <div><label className="label">Date of Birth</label><input className="input" placeholder="DD/MM/YYYY"/></div>
            </div>
          </div>
          <div>
            <div className="section-title">Contact Info</div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Address</label><input className="input"/></div>
              <div><label className="label">Phone</label><input className="input"/></div>
              <div className="col-span-2"><label className="label">Email</label><input className="input"/></div>
            </div>
          </div>
          <div>
            <div className="section-title">Identification</div>
            <div className="border-2 border-dashed rounded-xl p-8 text-center text-gray-500">Drag & drop your ID document</div>
          </div>
          <div>
            <div className="section-title">Supporting Billing Document</div>
            <div className="border-2 border-dashed rounded-xl p-8 text-center text-gray-500">Drag & drop your billing document</div>
          </div>
          <div>
            <div className="section-title">Login Credentials</div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Email</label><input className="input"/></div>
              <div><label className="label">Password</label><input type="password" className="input"/></div>
            </div>
            <div className="mt-6"><button className="btn-primary">Save Changes</button></div>
          </div>
        </div>
      </div>
    </div>
  )
}
