import React, { useState, useEffect, useRef } from 'react'
import "./preview.scss"
import {useParams, useNavigate} from "react-router-dom"
import { getProperty } from '../../actions/property'
import Slider from "react-slick"
import sliderArrow from "../../assets/images/long-arrow.svg"
import ReactPlayer from 'react-player'
import vpimage from "../../assets/images/verified-property.svg"

const Gallery = ({imageList}) => {
    const settings = {
        for1: {
            dots: false,
            arrows: false,
            className: "preview-gallery-slider-container",
            fade: true,
          },
          for2: {
            infinite: true,
            slidesToShow: 3,
            speed: 500,
            arrows: true,
            focusOnSelect: true,
            className: "preview-gallery-slider-thumbs-container",
            nextArrow: <div className="arrow-next"><img src={sliderArrow} alt="" /></div>,
            prevArrow: <div className="arrow-prev"><img src={sliderArrow} alt="" /></div>
          }
    };
      const [navs, setNavs] = useState({
        nav1: null,
        nav2: null
      })
      let slider2 = useRef(null)
      let slider1 = useRef(null)
      useEffect(() => {
        setNavs({
            nav1: slider1,
            nav2: slider2
        })
      },[])
    return (
        <div className="preview-gallery-slider">
            <div className="row">
                <div className="col-5 preview-gallery-slider-slides">
                <Slider asNavFor={navs.nav2} 
                ref={slider => (slider1 = slider)}
                {...settings.for1}>
                    {imageList && imageList.map((image,i) => (
                        <div className="preview-gallery-slider-slide">
                            <img src={image} key={i} at="" />
                        </div>
                    ))}
                </Slider>
                </div>
                <div className="col-7 preview-gallery-slider-thumbs">
                <Slider asNavFor={navs.nav1} 
                ref={slider => (slider2 = slider)} {...settings.for2}>
                    {imageList && imageList.map((image,i) => (
                        <div className="preview-gallery-slider-slide-small">
                            <img src={image} key={i} at="" />
                        </div>
                    ))}
                </Slider>
                <div className="preview-gallery-link">View Gallery</div>
                </div>
            </div>
        </div>
    )
}

const Preview = () => {
    const [property, setProperty] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const loadPropertyDetails = async () => {
        try{
            let res = await getProperty(params.propertyId)
            let {data} = res
            setProperty(data)
        }catch(err){
            console.log("Couldn't Fetch Property Details")
        }
    }
    useEffect(() => {
        loadPropertyDetails()
    },[])
    return (
        <div className="preview">
            <div className="preview-header">
                <div onClick={() => navigate("/properties")} className="preview-header-back">
                    <i class='bx bx-left-arrow-alt'></i> Back
                </div>
            </div>
            <div className="preview-main">
                <div
                // style={{backgroundImage: `url(${property && property.gallery.cover_image})`}}
                className="preview-main-headbox">
                    {/* <div className="preview-main-headbox-overlay">&nbsp;</div> */}
                    <div className="row ontop">
                        <div className="col-4 d-flex flex-col justify-center">
                            <div className="preview-main-headbox-title">
                                {property && property.basic_info.name}
                            </div>
                            <div className="preview-main-headbox-location">
                                <i class='bx bxs-map' ></i> {property && property.basic_info.address.country}
                            </div>
                            <div className="preview-main-headbox-review">
                                <i class='bx bxs-hot' ></i> 4.62   30+ reviews
                            </div>
                        </div>
                        <div className="col-8">
                            {property && property.gallery.external_video
                            ? (
                            <div className='form-video-container'>
                                <img className='form-video-fallback' src={property && property.gallery.cover_image} alt="" />
                                <ReactPlayer
                                className="form-video"
                                width={"100%"}
                                controls={true} light
                                url={property.gallery.external_video} />
                            </div>)
                            : (<img className="cover" src={property && property.gallery.cover_image} alt="" />)}
                        </div>
                    </div>
                </div>
                <div className="preview-main-body">
                    <div className="row">
                        <div className="col-8">
                            <div className="h3">About the Property</div>
                            <p>{property && property.basic_info.content}</p>
                            <div className="divider"></div>
                            <div className="h3">What you can expect</div>
                            <Gallery imageList={property && [...property.gallery.images]} />
                        </div>
                        <div className="col-4">
                            <div className="preview-main-body-pricebox">
                                <div className="price"><span className="price-mrp">₹40,000</span> <span className="price-sale">₹35,000</span> Night</div>
                                <div className="row calender">
                                    <div className="col-5 col-md-5 calender-box">
                                        CHECK IN<br/>
                                        15 Oct 2022
                                    </div>
                                    <div className="col-2 col-md-2 calender-divider">
                                        <span>|</span>
                                        <i class='bx bxs-calendar-edit' ></i>
                                        <span>|</span>
                                    </div>
                                    <div className="col-5 col-md-5 calender-box">
                                        CHECK IN<br/>
                                        18 Oct 2022
                                    </div>
                                </div>
                                <div className="row guests">
                                    <div className="col-8 guests-box">
                                        <span>GUESTS</span>
                                        <span>4 Guests, 2 Rooms</span>
                                    </div>
                                    <div className="col-4 guests-edit">
                                        <i class='bx bx-pencil' ></i>
                                    </div>
                                </div>
                                <div className="row calc">
                                    <div className="col-7 calc-left">Room Charges</div>
                                    <div className="col-5 calc-right">₹35,000</div>
                                    <div className="col-7 calc-left">Service Fee</div>
                                    <div className="col-5 calc-right">₹5,000</div>
                                    <div className="col-7 calc-left discount">10% Discount</div>
                                    <div className="col-5 calc-right discount">- ₹3,500</div>
                                    <div className="col-7 calc-left total">Total</div>
                                    <div className="col-5 calc-right total">₹1,65,000</div>
                                    <div className="col-12 calc-right tax">PLUS TAXES</div>
                                </div>
                                <div className="checkout-btn">
                                    <span>Check Packages</span>
                                    <i class='bx bx-chevron-right' ></i>
                                </div>
                            </div>
                            <div className="preview-main-body-recommended">
                                <img src={vpimage} alt="" />
                                <p>This Property is <span>Switchoff Recommended</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview