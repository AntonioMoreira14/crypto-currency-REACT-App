import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { CanvasJSChart } from 'canvasjs-react-charts'
import axios from 'axios'
import './info.css';

function Info(props) {

  const [info, setInfo] = useState([]);

  const location = useLocation();
  const id = location.state.id;

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=true`)
      .then(res => setInfo(res.data))
  }, [location.state.id])

  // Transform Time and Date
  let transformDate = info.map((info) => info.last_updated);
  const date = new Date(transformDate.toString());
  const newDay = date.getDay();
  const day = date.toString().split('').slice(3, 15).join('');
  const time = date.toString().split('').slice(15, 21).join('');

  const newDayWeek = () => { 
    let day;
    switch (newDay) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          day = "Wrong Day";
          break;
    }
    return day;
  }
  
  // Division API values in 7 Days
  let valueDays = info[0]?.sparkline_in_7d.price;
  let group = Math.ceil(valueDays?.length / 7);
  let finalArr = new Array(7).fill('').map((_, i) => valueDays?.slice(i * group, (i + 1) * group))
  

  let sum = (arr) => {
    let total = 0;
    for (let i = 0; i< arr?.length; i++) {
      total += arr[i];
    }
    return total;
  };

  let mean = (arr) => {
    let arraySum = sum(arr);
    return arraySum / arr?.length;
  };

  // Chart Days and options for the chart
  function newChartDate(x) {
    const chartDate = new Date();
    chartDate.setDate(date.getDate() - x);
    return chartDate.toString().split('').slice(3, 10).join('');
  }

  const options = {
    animationEnabled: true,
    theme: props.darkMode ? "dark2" : "light2",
    title:{
      text: `${id.toUpperCase()} Price Chart (EUR)`
    },
    axisY : {
      title: "Last 7 Days"
    },
    toolbar: {
      itemBackgroundColor: "#eccaa0"
    },
    toolTip: {
      shared: true,
      fontSize: 12,
			Content: "{x} : {y}"
    },
    data: [{
      type: "spline",
      name: "Value in €",
      showInLegend: true,
      dataPoints: [
        { y: mean(finalArr[0]), label: newChartDate(7)},
        { y: mean(finalArr[1]), label: newChartDate(6)},
        { y: mean(finalArr[2]), label: newChartDate(5)},
        { y: mean(finalArr[3]), label: newChartDate(4)},
        { y: mean(finalArr[4]), label: newChartDate(3)},
        { y: mean(finalArr[5]), label: newChartDate(2)},
        { y: mean(finalArr[6]), label: newChartDate(1)}
      ]
    }],
  }

  const myStyle = {
    width: '78%',
    margin: 'auto',
    marginBottom: '40px',
    padding: 20
  };

  return (
    <div className={props.darkMode ? "dark-info" : ""}>
      {info.map(info => {
          return (
              <div key={info.id}>
                <h2 className='coin-title'>{info.name} - {info.symbol}</h2>
                <img src={info.image} alt="" className='info-img'/>
                <section className='main-price'>
                  <h4>Real-Time Price</h4>
                  <h3>{info.current_price} €</h3>
                </section>
                <section className='other-prices'>
                  <div className='some-prices'>       
                    <div>
                      <h4>Highest value in 24h</h4>
                      <h3>{info.high_24h} €</h3>
                    </div>
                    <div>
                      <h4>Lowest value in 24h</h4>
                      <h3>{info.low_24h} €</h3>
                    </div>  
                  </div>                                         
                  <h4>Variation in 24h</h4>
                  <h3>{info.price_change_24h} € {info.price_change_24h > 0 ? <i className="arrow-up fa-solid fa-arrow-up"></i> : <i className="arrow-down fa-solid fa-arrow-down"></i>}</h3>
                </section>      
                <div style={myStyle}>
                  <CanvasJSChart options={options} />
                </div>
                <section className='other-infos'>
                  <h4>Market Cap</h4>
                  <h3>{info.market_cap} €</h3>
                  <br />
                  <h4>Last update</h4>
                  <h3>{newDayWeek(0)}</h3>
                  <h3>{day} - {time}</h3>
                </section>
              </div>
          )
        })}
    </div>
  )
}

export default Info;