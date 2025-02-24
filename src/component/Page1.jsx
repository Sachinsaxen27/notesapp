import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import image1 from './image/nonotes.png'
import sendbutton from './image/sendbutton.png'
import arrowbutton from './image/arrow.png'
import CreateNoteForm from './CreateNoteForm'
import NoteData from './NoteData'
function Page1() {
    const [NotesDetails, setMyNoteDetails] = useState({ note: '', notedate: '', notetime: "" })
    const [Showform, setMyShowForm] = useState(false)
    const formpop = useRef(false)
    const notelist = JSON.parse(localStorage.getItem('noteName'))
    useEffect(() => {
        const handleClickOutside = (event) => {
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
    // const [Notevalue, setMyNoteValue] = useState("")
    const [OpenNotes, setMyOpenNotes] = useState()
    const handlechange = (e) => {
        setMyNoteDetails({ ...NotesDetails, note: e.target.value })
    }
    const handleopenNotes = (value) => {
        const [firstName, lastName] = value.name.split(" ");
        const firstCharFirstName = firstName ? firstName[0] : "";
        const firstCharLastName = lastName ? lastName[0] : '';
        const Iconname = firstCharFirstName + firstCharLastName
        value.iconname = Iconname
        setMyOpenNotes(value)
    }
    const handleupdatetime = () => {
        const datetime = new Date()
        const currenttime = datetime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
        setMyNoteDetails(prestate => ({
            ...prestate,
            notedate: datetime.toDateString(),
            notetime: currenttime
        }))
    }
    const mynotes = JSON.parse(localStorage.getItem('submitnotes')) || [];
    console.log(mynotes)
    const handlesubmit = () => {
        const notesotre = [NotesDetails, ...(OpenNotes.notes ?? [])]
        if (!OpenNotes?.notes?.length) {
            OpenNotes.notes = notesotre
        }
        setMyOpenNotes(prestate => ({
            ...prestate,
            notes: notesotre
        }))

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
    }
    // localStorage.clear()
    console.log(OpenNotes)
    return (
        <>
            <div className='firstdiv'>
                <div className='notedivoption' >
                    <div className='divheading'>
                        <h1 className='pocektnoteheading' >Pocket Note</h1>
                    </div>
                    <br />
                    <div className='divfirstouteroptionlist'>
                        <div className='disouteroptionlist'>
                            {notelist ? notelist.map((value, index) => {
                                const [firstName, lastName] = value.name.split(" ");
                                const firstCharFirstName = firstName ? firstName[0] : "";
                                const firstCharLastName = lastName ? lastName[0] : '';
                                return <div key={index} className='divoptionlist' onClick={() => handleopenNotes(value)}>
                                    <div className='divchoicecircle' style={{ backgroundColor: `${value.color}` }}>{firstCharFirstName + firstCharLastName}</div>
                                    <div>
                                        {value.name}
                                    </div>
                                </div>
                            }) : "No Data"}
                        </div>
                        <button className='addnotebutton ' onClick={() => setMyShowForm(true)}>+</button>
                    </div>
                </div>
                <div className='notedivcontent'>
                    {OpenNotes === undefined ? <div className='noNotesdiv'>
                        <img src={image1} alt="nonotes" className='imagenonotes' />
                        <div>
                            <h1 style={{ margin: '0px' }}>Pocket Notes</h1>
                            <p>Send and receive messages without keeping your phone online. <br />
                                Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                        </div>
                    </div> :
                        <div className='noteareadiv'>
                            <div className='notenavbar'>
                                <div>
                                    <img src={arrowbutton} alt="<---" className='arrowimage' />
                                </div>
                                <div className='divchoicecircle' style={{ backgroundColor: `${OpenNotes.color}`, border: "none" }}>{OpenNotes.iconname}</div>
                                <div style={{ fontSize: '20px' }}>
                                    {OpenNotes.name}
                                    {/* My notes */}
                                </div>
                            </div>
                            <div style={{ overflowY: "scroll", height: "27rem" }}>
                                {mynotes.length > 0 ? mynotes.map((element, index) => {
                                    <div className='contentbox' key={index}>
                                        {element.name === OpenNotes.name && element.notes.map((value, index) => {
                                            return<NoteData key={index} value={value} />
                                            // <div style={{ textAlign: "justify", lineHeight: '24px' }}>{element.notes[0].note}</div><div style={{ textAlign: 'end', fontWeight: "600" }}>{element.time}  &bull; 11:11 AM</div>
                                        })
                                        }
                                    </div>
                                }) : ""}
                                {/* <div style={{ textAlign: "justify", lineHeight: '24px' }}>{element.notes[0].note}</div>
                                        <div style={{ textAlign: 'end', fontWeight: "600" }}>
                                            {element.time}  &bull; 11:11 AM
                                        </div> */}
                                {/* <div className='contentbox'>
                                <div style={{ textAlign: "justify", lineHeight: '24px' }}>
                                    Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.
                                </div>
                                <div style={{ textAlign: 'end', fontWeight: "600" }}>
                                    20 Feb 2025  &bull; 11:11 AM
                                </div>
                            </div>
                            <div className='contentbox'>
                                <div style={{ textAlign: "justify", lineHeight: '24px' }}>
                                    Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.
                                </div>
                                <div style={{ textAlign: 'end', fontWeight: "600" }}>
                                    20 Feb 2025  &bull; 11:11 AM
                                </div>
                            </div>
                            <div className='contentbox'>
                                <div style={{ textAlign: "justify", lineHeight: '24px' }}>
                                    Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.
                                </div>
                                <div style={{ textAlign: 'end', fontWeight: "600" }}>
                                    20 Feb 2025  &bull; 11:11 AM
                                </div>
                            </div>
                            <div className='contentbox'>
                                <div style={{ textAlign: "justify", lineHeight: '24px' }}>
                                    Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.
                                </div>
                                <div style={{ textAlign: 'end', fontWeight: "600" }}>
                                    20 Feb 2025  &bull; 11:11 AM
                                </div>
                            </div> */}

                            </div>
                            <div>
                                <div className='textareadiv'>
                                    <textarea name="note" id="inputnotes" cols={130} rows={7} value={NotesDetails.note} onChange={handlechange} placeholder='Here’s the sample text for sample work'></textarea>
                                </div>
                                <img src={sendbutton} alt="send button" className='imagebutton' onClick={handlesubmit} onMouseEnter={handleupdatetime} />
                            </div>
                        </div>}
                </div>
            </div>
            {Showform && <CreateNoteForm formpop={formpop} closeform={() => setMyShowForm(false)} />}
        </>
    )
}

export default Page1