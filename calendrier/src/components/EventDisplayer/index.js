import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useForm } from "react-hook-form";
import { deleteEvenetService } from '../../services/deleteEvent';

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
function EventDisplayer({ open, close, eventInfo, refetch }) {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const onSubmit = async () => {
    try {
      await deleteEvenetService(eventInfo.id)
      refetch()
      close();
    } catch (error) {
      console.log("catch comp", error)
      alert('Username or password are wrong')
    }
  };
  function afterOpenModal() {
      setValue('date', new Date(eventInfo.startStr).toISOString().split('T')[0])
      setValue('startTime', new Date(eventInfo.startStr).toTimeString().split(' ')[0])
      setValue('endTime', new Date(eventInfo.endStr).toTimeString().split(' ')[0])
      setValue('description', eventInfo.title)
      setValue('email', eventInfo.extendedProps.email)
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
                <input type='date' {...register("date",)} readOnly />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input type='time' {...register("startTime",)} readOnly />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input type='time' {...register("endTime",)} readOnly />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input placeholder='Description...' {...register("description",)} readOnly />
              </div>
            </div>
            <div className="input">
              <div className="text">
                <input placeholder='email' type='email' {...register("email",)} readOnly />
              </div>
            </div>
            <button className='btn' type='submit'>Delete</button>
          </form>
        </div>

      </Modal>
    </div>
  )
}

export default EventDisplayer