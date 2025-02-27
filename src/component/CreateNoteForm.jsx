import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
function CreateNoteForm(props) {
    const colorarray = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]
    const [Notedetails, setMyNotesDetails] = useState({ name: '', color: "" })
    const [NoteError, setMyNoteError] = useState(false)
    console.log(NoteError)
    const handlesubmit = (e) => {
        e.preventDefault()
        let storevalue = JSON.parse(localStorage.getItem('noteName'))

        if (!Array.isArray(storevalue) && storevalue === null) {
            storevalue = []
        }
        let existvalue = storevalue.filter(note => note.name === Notedetails.name)
        if (existvalue.length > 0) {
            toast.error("Already Exist")
        } else {
            console.log(Notedetails.name)
            if ((Notedetails.name).trim().length <= 2) {
                console.log(existvalue)
                setMyNoteError(true)
            } else {
                storevalue.push(Notedetails)
                localStorage.setItem('noteName', JSON.stringify(storevalue))
                props.closeform()
                setMyNotesDetails({ name: '', color: '' })
            }
        }
    }
    const handlevalueChange = (e) => {
        setMyNotesDetails({ ...Notedetails, [e.target.name]: e.target.value })
        if(Notedetails.name.trim().length>2){
            setMyNoteError(false)
        }   
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
                        {/* <div style={{width:'10rem',height:'2rem'}}>
                        </div> */}
                        <div style={{width:'15.7rem'}}>
                            <input type="text" name="name" value={Notedetails.name} className='inputcreategroup' id="name" placeholder='Enter group name' onChange={handlevalueChange} />
                            {NoteError && <p className='perror'>Group name should have at least 4 Character</p>}
                        </div>
                        
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
            <ToastContainer />
        </>
    )
}

export default CreateNoteForm