import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './App.css';
import EventCtreate from './components/EventCreator';
import { getEvenetsService } from './services/getEvents';

function App() {
  const [dispos, setDispos] = useState([]);
  const [openEventCreate, setOpenEventCreate] = useState(false);
  const [eventSelectionInfo, setEventSelectionInfo] = useState({
    allDay: false,
    dateStr: "",
    endStr: "",
    startStr : ""
  })

  const fetchEvents = async () => {
    const response = await getEvenetsService()
    setDispos(response);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = (args) => {
    console.log(args)
    if(args.allDay) {
      setEventSelectionInfo({
        allDay: args.allDay,
        dateStr: args.startStr
      })
    } else {
      setEventSelectionInfo({
        allDay: args.allDay,
        endStr: args.endStr,
        startStr: args.startStr
      })
    }    
    setOpenEventCreate(true)
  }

  const evenetClick = (args) => {
    console.log("event clicked", args);
  }
  
  return (
    <div className='main'>
      <h1 className='title'>My Calendar Spots</h1>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={createEvent}
          initialView="dayGridMonth"
          height={"100%"}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={dispos}
          eventClick={evenetClick}
          nowIndicator={true}
          selectOverlap={false}
          selectMirror={true}
          selectable={true}
          select={createEvent}
        />
        <EventCtreate open={openEventCreate} close={() => setOpenEventCreate(false)} eventInfo={eventSelectionInfo} refetch={fetchEvents} />    
      </div>
    </div>
  );
}

export default App;
