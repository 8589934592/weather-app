import React, { useState, useEffect, useContext } from 'react'
import GetRequest from '../api/GetRequest'
import initData from '../api/initData'
import { Context } from './Context'
import FormatDate from './FormatDate'
import FormatTime from './FormatTime'

const RightWeek = () => {
    const [data, setData] = useState(initData)
    const [status, setStatus] = useState(false)
    let value = useContext(Context)

    useEffect(() => {
        GetRequest.getLocation(value.search).then((response) => {
            if (response.status !== 200) {
                setStatus(true)
            } else {
                const lat = response.data.coord.lat
                const lon = response.data.coord.lon
                GetRequest.getData(lat, lon).then((response) => {
                    setData(response.data)
                    setWeekData(response.data.daily[0])
                })
            }
        }).catch(e => {
            setStatus(true);
        })
    }, [value.search]);

    const [weekData, setWeekData] = useState(data.daily[0])

    const handleShowDetail = (e, index) => {
        setWeekData(e);
    }

    return (
        <>
            <div className='row'>
                <div className='d-flex flex-wrap'>
                    {data?.daily.map((e, index) =>
                        <div key={index} className='col-xs-12 col-md-3 col-sm-6 p-1' style={{ cursor: 'pointer' }} onClick={() => handleShowDetail(e, index)}>
                            <div className={`${e.dt === weekData.dt ? 'bg-info' : 'bg-white'} p-2 rounded-3 h-100`}>
                                <p className='fs-6 text-black-50'>
                                    {FormatDate(e.dt)}
                                </p>
                                <div className='text-center'>
                                    <img src={`https://openweathermap.org/img/w/${e.weather[0]?.icon}.png`} alt='' className="img-fluid" />
                                    <p className="fs-6 text-muted fw-bold">{Math.round(e.temp.min)}° - {Math.round(e.temp.max)}°</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            

            <div className='bg-white my-5 p-2 rounded-3 h-100'>
                <p className='fs-5 text-muted'>{FormatDate(weekData.dt)}</p>
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                        <p className='fs-6 text-muted'>Temp current: {Math.round(weekData.temp.day)}°C</p>
                        <p className='fs-6 text-muted'>Temp: {Math.round(weekData.temp.min)} °C - {Math.round(weekData.temp.max)} °C</p>
                        <p className='fs-6 text-muted'>Humidity: {weekData.humidity} %</p>
                        <p className='fs-6 text-muted'>Wind speed: {`${Math.round(weekData.wind_speed * 3.6 * 100) / 100} km/h`}</p>
                    </div>
                    
                    <div className='col-md-6 col-xs-12'>
                        <p className='fs-6 text-muted'>Sunrise: {FormatTime(weekData.sunrise)}</p>
                        <p className='fs-6 text-muted'>Sunset: {FormatTime(weekData.sunset)}</p>
                        <p className='fs-6 text-muted'>Description: {weekData.weather[0]?.description}</p>
                        <p className='fs-6 text-muted'>Atmospheric pressure: {weekData.pressure} hPa</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightWeek