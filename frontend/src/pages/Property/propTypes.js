export const PropTypes = {
    apartment: {
        steps: {
            name_location: {
                title: "Name & Location",
                name: {
                    title: "What's the name of your place?",
                    tips: {
                        title: "What should I consider when choosing a name?",
                        data: [
                            "Keep it Short and Catchy",
                            "Avoid abbrevations",
                            "Stick to the facts"
                        ]
                    },
                    reason: {
                        title: "Why do I need to name my property?",
                        data: "This is the name that will appear as the title of your listing on our site. It should tell guests something specific about your place, where it is or what you offer.This will be visible to anyone visiting our site, so don't include your address in the name."
                    }
                },
                about: {
                    title: "What's the name of your place?",
                    subTitle: "Help your listing stand out by telling potential guests a bit more about yourself, your property and your neighbourhood. This information will be shown on your property page."
                },
                address: {
                    title: "Where is the property you're listing?",
                    subTitle: "We may send a letter to confirm the location of your property, so make sure that the address is correct – it’s difficult to make changes to it later.",
                    tips: {
                        title: "What needs to be included in my address?",
                        data: [
                            "Include both your street name and house number",
                            "Provide an apartment or floor number if you have one",
                            "Provide the post/zip code",
                            "Correctly spell the street name",
                            "Use the physical address of the property, not your office or home address"
                        ]
                    },
                    reason: {
                        title: "Why do I need to add my address?",
                        data: "Once a guest books your property, this is the address that will be shared with them. It's important that it is correct so that guests can easily find your property."
                    }
                },
                map: {
                    title: "Pin the location of your property",
                    subTitle: "This is the location we'll show to guests on our site. Drag the map so the pin matches the exact location of your place."
                }
            },
            property_setup: {
                title: "Property Setup",
                details: {
                    bedrooms: {
                        title: "Where can people sleep?"
                    },
                    guests: {
                        title1: "How many guests can stay?",
                        title2: "How many bathrooms are there?"
                    },
                    size: {
                        title: "How big is this apartment?",
                    }
                },
                amenities: {
                    title: "What can guests use at your place?",
                    reason: {
                        title: "What if I don’t see a facility I offer?",
                        data: "The facilities listed here are the ones most searched for by guests. After you complete your registration, you can add more facilities from a larger list in our platform that you'll use to manage your property."
                    }
                },
                rules: {
                    title: "House rules",
                    reason: {
                        title: "What if my house rules change?",
                        data: "You can easily customise these house rules later and additional house rules can be set on the Policies page of the extranet after you complete registration."
                    }
                },
            },
            gallery: {
                title: "What does your place look like?",
                subTitle: "Upload at least 5 photos of your property. The more you upload, the more likely you are to get bookings. You can add more later."  
            },
            pricing_calendar: {
                title: "Pricing and Calendar",
                price_per_night: {
                    title: "Price per night",
                    price: {
                        title: "How much do you want to charge per night?"
                    }
                },
                availabe: {
                    title: "Availability",

                }
            },
            legal : {
                title: "Legal Information",
                partner: {
                    title: "Partner Verification",
                    subTitle: "In order to comply with various legal and regulatory requirements, we need to collect and verify some information about you and your property."
                },
                gst : {
                    title: "Goods and Services Tax",
                    subTitle: "Due to regulations established by the Indian government, we need the following details. By submitting this information, you are confirming that your PAN and state registration are accurate."
                }
            }
        }
    }

}