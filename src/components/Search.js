import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import { Context } from './Context';

const Search = (props) => {
    const searchContext = useContext(Context)
    const [val, setVal] = useState("")
    const { search, setSearch } = searchContext
    
    function handleChange(e) {
        setVal(e.target.value);
    }

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearch(e.target.value)
            setVal("")
        }
    }

    return (
        <>
            <div className='wrap'>
                <Form.Control
                    type="search"
                    value={val}
                    onChange={handleChange}
                    placeholder="Search"
                    aria-label="Search"
                    onKeyDown={handleSubmit}
                />
            </div>
        </>
    )
}

export default Search