import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import image1 from './image/nonotes.png'
import sendbutton from './image/sendbutton.png'
import arrowbutton from './image/arrow.png'
import CreateNoteForm from './CreateNoteForm'
function Page1() {
    const [Showform, setMyShowForm] = useState(false)
    const formpop = useRef(false)
    const notelist = JSON.parse(localStorage.getItem('noteName'))
    const [SelectNote, setMySelectNote] = useState({ name: "", color: "", iconName: "" })
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
                                const firstCharFirstName = firstName?firstName[0]:"";
                                const firstCharLastName = lastName?lastName[0]:'';
                                return <div key={index} className='divoptionlist' onClick={() => setMySelectNote({ name: value.name, color: value.color, iconName: (firstCharFirstName + firstCharLastName) })}>
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
                    {/* <div className='noNotesdiv'>
                        <img src={image1} alt="" />
                        <div>
                            <h1 style={{ margin: '0px' }}>Pocket Notes</h1>
                            <p>Send and receive messages without keeping your phone online. <br />
                                Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                        </div>
                    </div> */}
                    <div className='noteareadiv'>
                        <div className='notenavbar'>
                            <div>
                                <img src={arrowbutton} alt="<---" className='arrowimage' />
                            </div>
                            <div className='divchoicecircle' style={{ backgroundColor: `${SelectNote.color}`, border: "none" }}>{SelectNote.iconName}</div>
                            <div style={{ fontSize: '20px' }}>
                                {SelectNote.name}
                            </div>
                        </div>
                        <div style={{ overflowY: "scroll", height: "27rem" }}>
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

                        </div>
                        <div>
                            <div className='textareadiv'>
                                <textarea name="notes" id="inputnotes" cols={130} rows={7} placeholder='Here’s the sample text for sample work'></textarea>
                            </div>
                            <img src={sendbutton} alt="send button" className='imagebutton' />
                        </div>
                    </div>
                </div>
            </div>
            {Showform && <CreateNoteForm formpop={formpop} closeform={() => setMyShowForm(false)} />}
        </>
    )
}

export default Page1