import React from "react"
import "./style.scss"
import Modal from 'react-modal';
import Media from "../../../../models/media";

const MediaHandler = ({selectedMedia, setSelectedMedia}) => {
    return (
        <div className="div">
            <Media popup={false} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
        </div>
    )
}

export default MediaHandler