import React, { useState, useEffect, useContext } from 'react'
import GetRequest from '../api/GetRequest'
import { Context } from './Context'

const RightNotFound = () => {
    const [status, setStatus] = useState(false)
    let value = useContext(Context)

    useEffect(() => {
        GetRequest.getLocation(value.search).then((response) => {
            if (response.status !== 200) {
                setStatus(true)
            } else {
                setStatus(false)
            }
        }).catch(e => {
            setStatus(true);
        })
    }, [value.search]);

    console.log('status = ', status);

    return (
        <>
            {status && (
                <div className="alert alert-danger" role="alert" style={{display: "none"}}>
                Not found city
                </div>
            )}
        </>
    )
}

export default RightNotFound