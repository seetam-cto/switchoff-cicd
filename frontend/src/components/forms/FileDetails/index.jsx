import React, { useEffect, useState } from "react"
import "./style.scss"
import "../style.scss"
import Modal from 'react-modal';

const FileDetails = ({
    handleFileDetails,
    fileDetails
}) => {
    const [file, setFile] = useState({
        title: '',
        alt: ''
    })
    const [modalData, setModalData] = useState({
        url: '',
        type: ''
    })
    const modalHandler = (url, type) => {
        setModalData({
            url: url,
            type: type
        })
        openModal()
    }

    const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalData({
        url: '',
        type: ''
    })
  }

    useEffect(() => {
        if(fileDetails){
            setFile({
                title: fileDetails.title,
                alt: fileDetails.alt
            })
        }
    },[fileDetails])
    return (
        <div className="form-container">
            <form onSubmit={handleFileDetails}>
                {(fileDetails && (fileDetails.media_type === "image" || fileDetails.media_type === "icon")) && (
                    <div className="form-image">
                        <img src={fileDetails.url} alt="" />
                        <div
                        onClick={() => modalHandler(fileDetails.url, fileDetails.media_type)}
                        className="form-image-overlay">
                            <i class='bx bx-zoom-in' ></i>
                        </div>
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">
                        File Name
                    </label>
                    <input
                    value={file.title}
                    onChange={(e) => setFile({title: e.target.value})}
                    type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Alt Text
                    </label>
                    <input
                    value={file.alt}
                    onChange={(e) => setFile({alt: e.target.value})}
                    type="text" name="alt" className="form-control" />
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="modal"
                >
                    <div className="modal-overlay">&nbsp;</div>
                    <div className="modal-container">
                        <span
                        onClick={() => closeModal()}
                        className="modal-close">
                            <i class='bx bx-x-circle'></i>
                        </span>
                        {(modalData && modalData.type === "image") && <img src={modalData.url} alt="" />}
                    </div>
                </Modal>
            </form>
        </div>
    )
}

export default FileDetails