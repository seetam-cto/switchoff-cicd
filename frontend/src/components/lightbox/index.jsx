import "./style.scss"

const LightBox = ({url, media_type}) => {
    return (
        <div className="lightbox-wrapper">
            <div className="lightbox-overlay"></div>
            <div className="lightbox-container">
                <img src={url} alt="" />
            </div>
        </div>
    )
}

export default LightBox