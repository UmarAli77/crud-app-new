import { Link, Outlet } from "react-router-dom"

function GeneraLayout() {
  return (
    <div>
      <header>
        <nav className="h-20 bg-slate-900 text-white">
          <ul className="flex items-center justify-center h-full gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Charts</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="h-auto py-5 bg-white border rounded-md shadow-xl mt-[50px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default GeneraLayout
