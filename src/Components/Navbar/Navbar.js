import React from 'react'
import './navbar.css'

function Navbar(props) {
  return (
    <nav className={props.darkMode ? "dark" : ""}>
      <h2 className='navbar-title'><i className="fa-brands fa-bitcoin"></i> Crypto Currency App <i className="fa-brands fa-bitcoin"></i></h2>
      <section className="toggler">
        <p className="toggler--light">Light</p>
          <div className="toggler--slider" onClick={props.toggleDarkMode}>
            <div className="toggler--slider--circle"></div>
          </div>
          <p className="toggler--dark">Dark</p>
        </section>
    </nav>
  )
}

export default Navbar