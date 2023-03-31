import React, { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import '../css/module.scss'
import Clear from '../img/Clear.png'
import Clouds from '../img/Clouds.png'
import Drizzle from '../img/Drizzle.png'
import Rain from '../img/Rain.png'
import Snow from '../img/Snow.png'
import Thunderstorm from '../img/Thunderstorm.png'
import atmosphere from '../img/atmosphere.png'
import bg from '../img/100615959.jpg'
import initData from "../api/initData";
import initLocation from "../api/initLocation";
import GetRequest from "../api/GetRequest";
import FormatDayTime from "./FormatDayTime";
import { Context } from './Context';

const Left = () => {
    const [data, setData] = useState(initData)
    const [date, setDate] = useState(Date.now())
    const [location, setLocation] = useState(initLocation)
    const [status, setStatus] = useState(false)
    let value = useContext(Context)

    useEffect(() => {
        GetRequest.getLocation(value.search).then((response) => {
            if (response.status !== 200) {
                setStatus(true)
            } else {
                setLocation(response.data)
                const lat = response.data.coord.lat
                const lon = response.data.coord.lon
                GetRequest.getData(lat, lon).then((response) => {
                    setData(response.data)
                    setDate(FormatDayTime(response.data.current.dt))
                })
            }
        }).catch(e => {
            setStatus(true);
        })
    }, [value.search]);

    return (
        <>            
            <div className='img'>
                <img src={data.current.weather[0].main === "Mist" ? atmosphere : Clear} alt=''></img>
            </div>
            <div>
                <h2><b>{location.name}</b></h2>
                <h1><b>{Math.round(data.current.temp)}°C</b></h1>
                <div className='fs-5 lh-lg'>{date}</div>
                <div className='fs-6 lh-base text-capitalize text-muted mb-3'>
                    {data.current.weather[0].description}
                    <br/>
                    {data.current.weather[0].main} {data.current.clouds}%
                </div>
            </div>

            <div className="position-relative d-flex justify-content-center align-items-center">
                <div className="position-absolute">
                    <div className="fs-3 fw-bold text-white">{location.name}</div>
                    </div>
                    <img src={bg} alt="" className="img-fluid rounded " />
            </div>
        </>
    )
}

export default Left