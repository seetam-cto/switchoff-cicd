import React, {useState, useEffect} from "react"
import "./style.scss"
import "../../pages/Media/style.scss"
import Modal from 'react-modal';
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";

import { uploadMedia, getMedia } from "../../actions/media"
import { toast } from "react-toastify";
import ContentLoader from 'react-content-loader'
const placeImg = "https://placehold.jp/30/a8a8a8/ffffff/300x150.png?text="

const fileTypes = ["JPEG", "JPG", "PNG", "PDF"];
const onlyIcon = ["PNG"]

const ShortFileSpan = ({filename}) => {
    let file_name = filename
    var file_ext = file_name.substring(file_name.lastIndexOf('.')+1);
    if (file_name.length > 15){
        file_name = file_name.substring(0,10)+'...'+file_ext;
    }
    return (
        <span>
            {file_name}
        </span>
    )
}

const FileBox = ({fileData, selected, setSelected, findex}) => {
    return (
        <div
        onClick={() => setSelected(findex)}
        className={`files-view-wrapper-box ${selected === findex && 'active'}`}>
            {fileData && (
                <>
                {(fileData.media_type === "image" || fileData.media_type === "icon") && <img src={fileData.url} alt="" /> }
                {(fileData.media_type === "document") && <i className='bx bxs-file-pdf pdf-icon' ></i>}
                <ShortFileSpan filename={fileData.title} />
                </>
            )}
        </div>
    )
}

const FileBoxLoading = () => (
    <div className="files-view-wrapper-box">
        <ContentLoader
        viewBox="0 0 100 100">
            {/* Only SVG shapes */}
            <rect x="0" y="0" rx="1" ry="1" width="100" height="75" />
            <rect x="0" y="80" rx="1" ry="1" width="100" height="25" />
        </ContentLoader>
    </div>
)

const MediaHandler = ({media, setSelectedMedia, modalState, setModalState, modalFor, clearModal}) => {
    //Upload
    const [uploadVisible, setUploadVisible] = useState(false)
    const [file, setFile] = useState(null);

    //load files
    const [allFiles, setAllFiles] = useState([])

    //active file
    const [selectedFile, setSelectedFile] = useState(0)

    //set media type
    const [mediaType, setMediaType] = useState("all")

    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth

    const handleChange = (file) => {
        setFile(file);
      };

    const loadMedia = async () => {
        setAllFiles([])
        try{
            let res = await getMedia(token)
            setTimeout(() => {
                setAllFiles(res.data)
            }, 1000)
        }catch(err){
            console.log(err)
        }
    }

    const handleRefresh = async () => {
        await handleUpload()
        await loadMedia()
    }

    useEffect(() => {
        loadMedia()
    },[])
    
    useEffect(() => {
        file && handleRefresh()
    })

    const handleUpload = async () => {
        let formData = new FormData()
        file && formData.append('media', file)
        try{
            let res = await uploadMedia(token, formData)
            if(res.status === 200) toast.success("File Uploaded!")
            // file && setFile(null)
        }catch(err){
            console.log(err)
        }finally{
            setSelectedFile(0)
            setFile(null)
        }
    }

    const handleMediaType = (mtype) => {
        setMediaType(mtype)
    }

    function closeModal() {
        setModalState(false)
    }

    const handleConfirm = (e) => {
        e.preventDefault()
        if(modalFor === "COUNTRY_FLAG"){
            setSelectedMedia({...media, icon: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "COUNTRY_COVER"){
            setSelectedMedia({...media, cover_image: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "STATE_COVER"){
            setSelectedMedia({...media, cover_image: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "PROPERTY_TYPE_ICON"){
            setSelectedMedia({...media, icon: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "AMENITY_ICON"){
            setSelectedMedia({...media, icon: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "EXPERIENCE_ICON"){
            setSelectedMedia({...media, icon: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "PROPERTY_COVER"){
            setSelectedMedia({...media, cover_image: allFiles[selectedFile] && allFiles[selectedFile].url });
        }else if(modalFor === "PROPERTY_GALLERY"){
            if(media.images.includes(allFiles[selectedFile] && allFiles[selectedFile].url)){
                toast.error("Image already added!")
            }else if(allFiles[selectedFile] && media.cover_image === allFiles[selectedFile].url){
                toast.error("Image cant be same as Cover!")
            }else{
                setSelectedMedia({...media, images: [...media.images, allFiles[selectedFile] && allFiles[selectedFile].url] });
            }
        }else if(modalFor === "ROOM_IMAGES"){
            if(media.images.map((ims) => ims.url).includes(allFiles[selectedFile] && allFiles[selectedFile].url)){
                toast.error("Image already added!")
            }else{
                setSelectedMedia({...media, images: [...media.images, {url: allFiles[selectedFile] && allFiles[selectedFile].url, caption: ''}] });
            }
        }
        clearModal('')
        closeModal()
    }

    return (
        <Modal
        isOpen={modalState && modalState}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="upload-modal">
            <div className="upload-modal-overlay"></div>
            <div className="upload-modal-container">
            <span
            onClick={() => closeModal()}
            className="upload-modal-close">
                <i class='bx bx-x-circle'></i>
            </span>
            <div className="files-upload-wrapper">
                    <div className="files-upload-header">
                        <div className="files-upload-header-blocks">
                            <div className="files-upload-header-blocks-block">
                                Media Library - Select Image for {modalFor.split("_").map((wrd) => wrd[0]+wrd.substring(1).toLowerCase()).join(" ")}
                            </div>
                            <div className="files-upload-header-blocks-block">
                                <span className="files-upload-header-btn" onClick={() => setUploadVisible(!uploadVisible)}>
                                    Upload
                                    <i className={`bx bx-plus ${uploadVisible && 'active'}`}></i>
                                </span>
                            </div>
                            <div className="files-upload-header-blocks-block">
                                <span
                                onClick={() => handleMediaType("all")}
                                className={`files-upload-header-type ${mediaType === "all" && 'active'}`}>
                                    All
                                </span>
                                <span
                                onClick={() => handleMediaType("image")}
                                className={`files-upload-header-type ${mediaType === "image" && 'active'}`}>
                                    Images
                                </span>
                                <span
                                onClick={() => handleMediaType("video")}
                                className={`files-upload-header-type ${mediaType === "video" && 'active'}`}>
                                    Videos
                                </span>
                                <span
                                onClick={() => handleMediaType("document")}
                                className={`files-upload-header-type ${mediaType === "document" && 'active'}`}>
                                    Documents
                                </span>
                            </div>
                        </div>
                    </div>
                    {uploadVisible && (<FileUploader
                        multiple={false}
                        handleChange={handleChange}
                        name="file"
                        types={modalFor.split("_")[modalFor.split("_").length - 1] === "ICON" ? onlyIcon : fileTypes }
                        classes="files-upload-container"
                    >
                        <div className="files-upload-area">
                            <i className='bx bxs-image-add' ></i>
                            <span>Upload or drop file right here!</span>
                            <h6>Only {modalFor.split("_")[modalFor.split("_").length - 1] === "ICON" ? "PNG" : "JPEG, PNG, SVG, MP4 and PDF"} allowed!</h6>
                        </div>
                    </FileUploader>)}
                </div>
                <div className="files-view-wrapper">
                    {allFiles && allFiles.length > 0 ? allFiles.map((f, i) => (
                        <>
                            {(mediaType === "video" && f.media_type ==="video") && <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />}
                            {(mediaType === "image" && (f.media_type ==="image" || f.media_type === "icon")) && <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />}
                            {mediaType === "all" && <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />}
                            {(mediaType === "document" && f.media_type ==="document") && <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />}
                        </>
                    )
                    ) : 
                        [1,2,3,4,5,6].map((k,i) => <FileBoxLoading key={i} />)
                    }
                </div>
                <div className="files-confirm-wrapper">
                    <div className="selected-file">
                        <strong>Selected File: </strong>{allFiles && allFiles.length > 0 && (<ShortFileSpan filename={allFiles[selectedFile].title} />)}
                    </div>
                    <button onClick={(e) => handleConfirm(e)} className="form-button">
                        Confirm Selection
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export const IconSelector = ({handler, iconurl}) => (
    <div className="icon-selector">
        <img className="icon-selector-img" src={iconurl ? iconurl : `${placeImg}60x60`} alt="" />
        <button
        onClick={(e) => handler(e)}
        className="icon-selector-button">
            Select
            <i className='bx bx-image-alt'></i>
        </button>
    </div>
)

export default MediaHandler