import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './main.css'
import { Link } from "react-router-dom"

function Main(props) {

  const [coin, setCoin] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    handleFetch();
  }, [])

  function handleFetch() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => setCoin(res.data))
  }

  return (
    <div className={props.darkMode ? "dark-main" : "main-body"}>
      <h2 className='main-title'>Check information about your favourite crypto currency!</h2>
      <input
        className='search-coins'
        type="text"
        placeholder='Search Coin...' 
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      <section>
        {coin.filter((coin) => {
            if (coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())) {
              return coin;
            }
          })
            .map(coin => {
          return (
              <div key={coin.id} className='coin-container'>
                <div className='coin-basic-info'>
                  <img src={coin.image} alt="" className='coin-logo'/>
                  <Link to='/info' className='coin-name'
                  state={{id: coin.id}}>{coin.name}</Link>
                </div>
              </div>
          )
        })}
      </section>
    </div>
  )
}

export default Main;
