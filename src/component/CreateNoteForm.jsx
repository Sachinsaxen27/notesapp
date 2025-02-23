import React, { useEffect, useState } from 'react'

function CreateNoteForm(props) {
    const colorarray = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]
    const [Notedetails, setMyNotesDetails] = useState({ name: '', color: "" })
   
    const handlesubmit = (e) => {
        e.preventDefault()
        let storevalue = JSON.parse(localStorage.getItem('noteName'))
        if (!Array.isArray(storevalue)) {
            storevalue = []
        }
        storevalue.push(Notedetails)
        localStorage.setItem('noteName', JSON.stringify(storevalue))
        props.closeform()
        setMyNotesDetails({ name: '', color: '' })
    }
    const handlevalueChange = (e) => {
        setMyNotesDetails({ ...Notedetails, [e.target.name]: e.target.value })
    }
    const handlecolorChange = (color) => {
        setMyNotesDetails({ ...Notedetails, color: color })
    }
    return (
        <>
            <div className='divgroupform' ref={props.formpop}>
                <div>
                    <h1 className='formheading'>Create New group</h1>
                </div>
                <form>
                    <label htmlFor="groupname" style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginBottom: '15px' }}>
                        <p className='ptagform'>
                            Group Name
                        </p>
                        <input type="text" name="name" value={Notedetails.name} className='inputcreategroup' id="name" placeholder='Enter group name' onChange={handlevalueChange} />
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='ptagcolourchoose'>
                            Choose Colour
                        </p>
                        {colorarray.map((element, index) => {
                            return <div className='colourlistoption' key={index} name='color' style={{ backgroundColor: `${element}`, border: `${Notedetails.color === element ? '1px solid' : ''}` }} onClick={() => handlecolorChange(element)}></div>
                        })}
                    </div>
                </form>
                <button className='buttoncreate' onClick={handlesubmit}>Create</button>
            </div >
        </>
    )
}

export default CreateNoteForm