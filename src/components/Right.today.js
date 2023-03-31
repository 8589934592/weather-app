import React, { useState, useEffect, useContext } from 'react'
import GetRequest from '../api/etRequest'
import initData from '../api/initData'
import Humidity from '../svg/Humidity'
import Pressure from '../svg/Pressure'
import Sun from '../svg/Sun'
import Sunrise from '../svg/Sunrise'
import Sunset from '../svg/Sunset'
import SunWind from '../svg/SunWind'
import Visibility from '../svg/Visibility'
import { Context } from "./Context";
import FormatTime from "./FormatTime";

const RightToday = () => {
    const [data, setData] = useState(initData)
    const [sunrise, setSunrise] = useState(Date.now())
    const [sunset, setSunset] = useState(Date.now())
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
                    setSunrise(FormatTime(response.data.current.sunrise))
                    setSunset(FormatTime(response.data.current.sunset))
                })
            }
        }).catch(e => {
            setStatus(true);
        })
    }, [value.search]);
    
    return (
        <>
            <div className='row'>
                <div className='d-flex flex-wrap'>
                    <div className='col-md-6 col-xl-4 col-sm-12 p-3'>
                        <div className='bg-white p-2 rounded-3 h-100'>
                            <p className='fs-5 text-black-50'>UV Index</p>
                            <div className='text-center'>
                                <Sun className='text-warning icon-size my-1'/>
                                <p className="fs-3 text-muted fw-bold">{data.current.uvi}</p>
                            </div>
                            

                        </div>
                    </div>
                    <div className='col-md-6 col-xl-4 col-sm-12 p-3'>
                        <div className='bg-white p-2 rounded-3 h-100'>
                            <p className='fs-5 text-black-50'>Wind Status</p>
                            <div className='text-center'>
                                <SunWind className='icon-color icon-size' />
                                <p className="fs-3 text-muted fw-bold">{`${Math.round(data?.current.wind_speed * 3.6 * 100) / 100} km/h`}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-xl-4 col-sm-12 p-3'>
                        <div className='bg-white p-2 rounded-3 h-100'>
                            <p className='fs-5 text-black-50'>Sunrise & Sunset</p>
                            <p className='fs-4 text-muted fw-bold'>
                                <Sunrise className='text-warning icon-size' />
                                {sunrise}
                            </p>
                            <p className='fs-4 text-muted fw-bold'>
                                <Sunset className='text-warning icon-size' />
                                {sunset}
                            </p>
                        </div>
                    </div>
                    <div className='col-md-6 col-xl-4 col-sm-12 p-3'>
                        <div className='bg-white p-2 rounded-3 h-100'>
                            <p className='fs-5 text-black-50'>Humidity</p>
                            <div className='text-center'>
                                <Humidity className='icon-color icon-size'/>
                                <p className='fs-3 text-muted fw-bold text-center'>
                                    {data.current.humidity} %
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-xl-4 col-sm-12 p-3'>
                        <div className='bg-white p-2 rounded-3 h-100'>
                            <p className='fs-5 text-black-50'>Visibility</p>
                            <div className='text-center'>
                                <Visibility className='text-warning icon-size'/>
                                <p className='fs-3 text-muted fw-bold text-center'>
                                    {Math.floor(data.current.visibility / 1000)} km
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-xl-4 col-sm-12 p-3'>
                        <div className='bg-white p-2 rounded-3 h-100'>
                            <p className='fs-5 text-black-50'>Pressure</p>
                            <div className='text-center'>
                                <Pressure className='icon-color icon-size' />
                                <p className='fs-3 text-muted fw-bold text-center'>
                                    {data.current.pressure} hPa
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightToday