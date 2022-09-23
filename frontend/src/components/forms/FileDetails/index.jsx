import React, { useEffect, useState } from "react"
import "./style.scss"
import "../style.scss"
import Modal from 'react-modal';
import { toast } from "react-toastify";

const FileDetails = ({
    fileDetails
}) => {
    const [file, setFile] = useState({
        title: '',
        alt: ''
    })

    const shortFile = (filename) => {
        let file_name = filename
        var file_ext = file_name.substring(file_name.lastIndexOf('.')+1);
        if (file_name.length > 20){
            file_name = file_name.substring(0,15)+'...'+ file_name.substring(file_name.lastIndexOf('.')-3, file_name.lastIndexOf('.')+1) +file_ext;
        }
        return file_name
    }


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

    const [copyState, setCopyState] = useState(false)

    const copyText = (txt) => {
        navigator.clipboard.writeText(txt)
        setCopyState(true)
        setTimeout(() => setCopyState(false), 1000)
    }

    const handleFileDetails = async (e) => {
        e.preventDefault()
        console.log("hi")
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
            <form onSubmit={(e) => handleFileDetails(e)}>
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
                <div className="form-group">
                    <label className="form-label">
                        File Path
                    </label>
                    <div className="form-group-copy">
                    <input
                    value={fileDetails && shortFile(fileDetails.url)}
                    type="text" name="url" className="form-control" disabled/>
                    <span
                    onClick={() => copyText(fileDetails && fileDetails.url)}
                    className="copy">
                        <i class='bx bx-link'></i>
                        {copyState && <span className="copied">Copied</span>}
                    </span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-6">
                            <button
                            onClick={() => toast.success("Saved")}
                            className="form-button success">
                                Save
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                            className="form-button danger">
                                Delete
                            </button>
                        </div>
                    </div>
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