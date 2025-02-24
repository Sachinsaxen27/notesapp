import React from 'react'
import './style.css'
function NoteData(props) {
    console.log(props.value?.note)
    return (
        <>
            <div style={{ textAlign: "justify", lineHeight: '24px' }}>{props.value.note}</div>
            <div style={{ textAlign: 'end', fontWeight: "600" }}>
                {element.time}  &bull; 11:11 AM
            </div>
        </>
    )
}

export default NoteData