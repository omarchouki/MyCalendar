import { useState, useEffect } from 'react';
import './App.css';
import EventCtreate from './components/EventCreator';
import { getEvenetsService } from './services/getEvents';
import Calendar from './components/Calendar';
import { useForm } from "react-hook-form";
import EventDisplayer from './components/EventDisplayer';


function App() {
  const [dispos, setDispos] = useState([]);
  const [openEventCreate, setOpenEventCreate] = useState(false);
  const [openEventDisplayer, setOpenEventDisplayer] = useState(false)
  const [showAuthBox, setShowAuthBox] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [eventSelectionInfo, setEventSelectionInfo] = useState({
    allDay: false,
    dateStr: "",
    endStr: "",
    startStr: ""
  })
  const [selectedEventToDisplay, setSelectedEventToDisplay] = useState({})

  const fetchEvents = async () => {
    const response = await getEvenetsService()
    setDispos(response);
  }

  useEffect(() => {
    if(localStorage.getItem('username')) {
      setIsLoggedIn(true);
      setShowAuthBox(false);
    }
    fetchEvents();
  }, []);

  const onSubmit = (args) => {
    localStorage.setItem('username', args.username)
    localStorage.setItem('password', args.password)
    setShowAuthBox(false);
    setIsLoggedIn(true);
  }

  const disconnect = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setShowAuthBox(false)
  }

  return (
    <div className='main'>
      <div className='main-header'>
        <h1 className='title'>My Calendar Spots</h1>
        {isLoggedIn && <button className='btn' onClick={() => disconnect()}>Disconnect</button>}
        {!showAuthBox && !isLoggedIn && <button className='btn' onClick={() => setShowAuthBox(true)}>Connect as admin</button>}
        {showAuthBox && <form onSubmit={handleSubmit(onSubmit)} className='loginform'>
          <div className="input">
            <div className="text">
              <input type='text' placeholder='username' {...register("username", { required: true })} />
            </div>
          </div>
          <div className="input">
            <div className="text">
              <input type='password' placeholder='password' {...register("password", { required: true })} />
            </div>
          </div>
          <button type='submit' className='btn'>Connect</button>
          <button type='cancel' onClick={()=> setShowAuthBox(false)} className='btn'>Cancel</button>
        </form>}
      </div>
      <div className="calendar-container">
        <Calendar reservations={dispos} setEventSelectionInfo={setEventSelectionInfo} selectEvent={setSelectedEventToDisplay} setOpenEventCreate={setOpenEventCreate}  setOpenEventDisplayer={setOpenEventDisplayer} />
        <EventCtreate open={openEventCreate} close={() => setOpenEventCreate(false)}  eventInfo={eventSelectionInfo} refetch={fetchEvents} />
        {isLoggedIn && <EventDisplayer open={openEventDisplayer} close={()=> setOpenEventDisplayer(false)} eventInfo={selectedEventToDisplay} refetch={fetchEvents}/>}
      </div>
    </div>
  );
}

export default App;
