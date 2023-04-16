import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useForm } from "react-hook-form";
import './style.css'
import { createEvenetService } from '../../services/createEvent';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    padding: 0,
    width: 350,
  },
};

Modal.setAppElement('#root');
function EventCtreate({ open, close, eventInfo, refetch }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const onSubmit = async (info) => {
    try {
      const data = await createEvenetService(info)
      refetch()
      close();
    } catch (error) {
      console.log(error)
      alert('something went wrong')
    }
  };
  function afterOpenModal() {
    console.log(eventInfo)
    if(eventInfo.allDay) {
      setValue('date', new Date(eventInfo.dateStr).toISOString().split('T')[0])
    } else {
      setValue('date', new Date(eventInfo.startStr).toISOString().split('T')[0])
      setValue('startTime', new Date(eventInfo.startStr).toTimeString().split(' ')[0])
      setValue('endTime', new Date(eventInfo.endStr).toTimeString().split(' ')[0])
    }
  }

  return (
    <div>
      <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        // className="modalBody"
        shouldCloseOnOverlayClick={true}
      >
        <div className='eventHeader'>
          <span className='cross-stand-alone' onClick={close}></span>
          <span className='modalTitle'>Fill the info</span>
        </div>
        <div className='eventBody'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input">
              <div className="text">
                <input type='date' {...register("date", { required: true, type: "date" })} />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input type='time' {...register("startTime", { required: true, type: "date" })} />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input type='time' {...register("endTime", { required: true, type: "date" })} />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input placeholder='Description...' {...register("description", { required: true, type: "date" })} />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input placeholder='email' type='email' {...register("email", { required: true, type: "date" })} />
              </div>
            </div>
            <button className='btn' type='submit'>Sauvgarder</button>
          </form>
        </div>

      </Modal>
    </div>
  )
}

export default EventCtreate