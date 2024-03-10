import React from 'react'
import './Dropdown.css'

function Dropdown({data, selectedData, setSelectedData, disabled}) {

    const handleSelectData = (event) => {
        const selectedId = event.target.value;
        setSelectedData(selectedId);
    }

    return (
        <select className='custom-dropdown' value={selectedData} onChange={handleSelectData} disabled={disabled}>
            <option disabled value="">Favorite game</option>
            {data?.map((element) => (
                <option key={element.Id} value={element.Id}>{element.titulo}</option>
            ))}
        </select>
    )
}

export default Dropdown
