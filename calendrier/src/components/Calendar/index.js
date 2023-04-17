import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar({reservations, setEventSelectionInfo, setOpenEventCreate, selectEvent, setOpenEventDisplayer}) {

    const createEvent = (args) => {
        if (args.allDay) {
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
        console.log("event clicked", args.event);
        selectEvent(args.event);
        setOpenEventDisplayer(true)
    }

    return (
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
            events={reservations}
            eventClick={evenetClick}
            nowIndicator={true}
            selectOverlap={false}
            selectMirror={true}
            selectable={true}
            select={createEvent}
        />
    )
}

export default Calendar