
import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import image1 from './image/nonotes.png'
import sendbutton from './image/sendbutton.png'
import arrowbutton from './image/arrow.png'
import CreateNoteForm from './CreateNoteForm'
import { toast, ToastContainer } from 'react-toastify'
function Page1() {
    document.addEventListener('keydown', (event) => { if (event.key === 'Enter') { handleupdatetime() } })
    const [NotesDetails, setMyNoteDetails] = useState({ note: '', notedate: '', notetime: "" })
    const [Showform, setMyShowForm] = useState(false)
    const formpop = useRef(null)
    const notelist = JSON.parse(localStorage.getItem('noteName'))
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("event",event, Showform)
            if (formpop.current && !formpop.current.contains(event.target)) {
                setMyShowForm(false);
            }
        };

        if (Showform) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [Showform]);
    const [OpenNotes, setMyOpenNotes] = useState()
    const handlechange = (e) => {
        setMyNoteDetails({ ...NotesDetails, note: e.target.value })
    }
    const handleMobileview = () => {
        console.log("HandleView")
        const element = document.getElementById('leftnotediv')
        const element2 = document.getElementById('rightnotediv')
        if (window.innerWidth <= 480) {
            element.style.display = 'none'
            element2.style.display = 'block'
        }
    }
    const handleMobileviewclose = () => {
        const element = document.getElementById('leftnotediv')
        const element2 = document.getElementById('rightnotediv')
        if (element.style.display === 'none') {
            element.style.display = 'block'
            element2.style.display = 'none'
        }
    }
    const handleopenNotes = (value) => {
        console.log("Function open notes")
        const [firstName, lastName] = value.name.split(" ");
        const firstCharFirstName = firstName ? firstName[0] : "";
        const firstCharLastName = lastName ? lastName[0] : '';
        const Iconname = firstCharFirstName + firstCharLastName
        value.iconname = Iconname
        setMyOpenNotes(value)
        handleMobileview()
    }
    const mynotes = JSON.parse(localStorage.getItem('submitnotes')) || [];
    const handleupdatetime = () => {
        const datetime = new Date()
        setMyNoteDetails(prestate => ({
            ...prestate,
            notedate: datetime.toDateString(),
            notetime: datetime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
        }))
    }
    useEffect(() => {
        if (NotesDetails.notetime) {
            handlesubmit()
        }
    }, [NotesDetails.notetime])
    const handlesubmit = () => {
        const notesotre = [NotesDetails, ...(OpenNotes.notes ?? [])]
        if (!OpenNotes?.notes?.length) {
            OpenNotes.notes = notesotre
        }
        setMyOpenNotes(prestate => ({
            ...prestate,
            notes: notesotre
        }))
        if (NotesDetails.note.length !== 0) {

            if (mynotes.length === 0) {
                localStorage.setItem('submitnotes', JSON.stringify([OpenNotes]))
            } else if (Array.isArray(mynotes)) {
                let existnoteobject = mynotes.find(note => note.name === OpenNotes.name)
                if (existnoteobject) {
                    // existnoteobject.notes=existnoteobject.note||[]
                    existnoteobject.notes.push(NotesDetails)
                } else {
                    mynotes.push(OpenNotes)
                }
                localStorage.setItem('submitnotes', JSON.stringify(mynotes));
            }
            setMyNoteDetails({ note: '', notedate: '', notetime: "" })
        } else {
            toast.error('Enter your note')
        }
    }
    // localStorage.clear()
    return (
        <>
            <div className='container'>
                <div className='noteslist' id='leftnotediv'>
                    <div className='divheading'>
                        <h1 className='pocektnoteheading' >Pocket Note</h1>
                    </div>
                    <div className='divfirstouteroptionlist'>
                        <div className='disouteroptionlist'>
                            {notelist ? notelist.map((value, index) => {
                                const [firstName, lastName] = value.name.split(" ");
                                const firstCharFirstName = firstName ? firstName[0] : "";
                                const firstCharLastName = lastName ? lastName[0] : '';
                                return <div key={index} className='divoptionlist' onClick={() => { handleopenNotes(value) }}>
                                    <div className='divchoicecircle' style={{ backgroundColor: `${value.color}` }}>{firstCharFirstName + firstCharLastName}</div>
                                    <div>
                                        {value.name}
                                    </div>
                                </div>
                            }) : <div style={{ textAlign: "center", marginTop: '15rem', marginRight: '50px' }}>
                                <h4>No Available Notes Group</h4>
                            </div>
                            }
                        </div>
                        <button className='addnotebutton' onClick={(event) => {setMyShowForm(true)}}>+</button>
                    </div>
                </div>

                
                <div className='divChatDialogList' id='rightnotediv'>
                    {OpenNotes === undefined ? <div className='noNotesdiv'>
                        <img src={image1} alt="nonotes" className='imagenonotes' />
                        <div>
                            <h1 style={{ margin: '0px' }}>Pocket Notes</h1>
                            <p>Send and receive messages without keeping your phone online. <br />
                                Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                        </div>
                    </div> : <div>
                        <div className="notenavbar">
                            <div className='notenavitem'>
                                <img src={arrowbutton} alt="<--" onClick={handleMobileviewclose} />
                                <div className='divchoicecircle' style={{ backgroundColor: `${OpenNotes.color}`, border: "none" }}>{OpenNotes.iconname}</div>
                                <div>
                                    {OpenNotes.name}
                                </div>
                            </div>
                        </div>
                        <div className='divoutercontentarray'>
                            {mynotes.map((element, index) => (
                                <div key={index}>
                                    {element.name === OpenNotes.name && element.notes.map((value, index) => (
                                        <div className='contentbox' key={index}>
                                            <div style={{ textAlign: "justify", lineHeight: '24px' }} className='valueNotes'>{value.note}</div>
                                            <div style={{ textAlign: 'end', fontWeight: "600", marginTop: '2px' }}>{value.notedate}  &bull; {value.notetime}</div>
                                        </div>
                                    ))
                                    }
                                </div>
                            ))}
                        </div>
                        <div className='textBox'>
                                <textarea name="note" id="inputnotes" cols={130} rows={7} value={NotesDetails.note} onChange={handlechange} placeholder='Here’s the sample text for sample work' className='notetextarea'></textarea>
                                <img src={sendbutton} alt="send button" className='imagebutton' onClick={handleupdatetime} />
                            </div>
                    </div>
                    }
                </div>
            </div>
            <ToastContainer />
            {Showform && <CreateNoteForm formpop={formpop} closeform={() => setMyShowForm(false)} />}
        </>
    )
}

export default Page1