import React, { useEffect, useState } from "react"
import "./style.scss"
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";

import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import FileDetails from "../../components/forms/FileDetails"

import { uploadMedia, getMedia } from "../../actions/media"
import { toast } from "react-toastify";


const fileTypes = ["JPEG", "JPG", "PNG", "SVG", "MP4", "PDF"];

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

const Media = () => {
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
        try{
            let res = await getMedia(token)
            setAllFiles(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        file && handleUpload()
        loadMedia()
    },[file])

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

    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="files-upload-wrapper">
                    <div className="files-upload-header">
                        <div className="files-upload-header-blocks">
                            <div className="files-upload-header-blocks-block">
                                Media Library 
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
                        types={fileTypes}
                        classes="files-upload-container"
                    >
                        <div className="files-upload-area">
                            <i className='bx bxs-image-add' ></i>
                            <span>Upload or drop file right here!</span>
                            <h6>Only JPEG, PNG, SVG, MP4 and PDF allowed!</h6>
                        </div>
                    </FileUploader>)}
                </div>
                <div className="files-view-wrapper">
                    {allFiles && allFiles.map((f, i) => {
                        if(mediaType === "all"){
                            return (
                                <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />
                            )
                        }else if(mediaType === "image" && (f.media_type ==="image" || f.media_type === "icon")){
                            return (
                                <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />
                            )
                        }else if(mediaType === "video" && f.media_type ==="video"){
                            return (
                                <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />
                            )
                        }
                        else if(mediaType === "document" && f.media_type ==="document"){
                            return (
                                <FileBox selected={selectedFile} setSelected={setSelectedFile} findex={i} fileData={f} key={f._id} />
                            )
                        }
                    })}
                </div>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <div className="files-sidebar-heading">
                    File Details
                </div>
                <div className="files-details">
                    {allFiles && <FileDetails fileDetails={allFiles[selectedFile]} />}
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Media