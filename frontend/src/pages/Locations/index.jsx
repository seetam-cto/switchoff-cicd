import React, {useState} from "react"
import DashboardWrapper, { DashboardWrapperMain } from "../../components/dashboard-wrapper/DashboardWrapper"
import "./style.scss"
import Tabs, {TabHead, Tab} from "../../components/tabs"

const Tab1 = () => (
    <Tab>
        <div className="row">
            <div className="col-12">
                <div className="title">
                    
                </div>
            </div>
        </div>
    </Tab>
)

const Locations = () => {
    const [activeTab, setActiveTab] = useState(1)
    const handleActiveTab = (tid) => {
        setActiveTab(tid)
    } 
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-4">
                        <TabHead active={activeTab} clickTab={handleActiveTab} tab={1}>
                            <span>
                            <i className='bx bx-map-alt' ></i>
                            Countries
                            </span>
                            <i class='bx bxs-chevron-down-circle'></i>
                        </TabHead>
                    </div>
                    <div className="col-4">
                        <TabHead active={activeTab} clickTab={handleActiveTab} tab={2}>
                            <span>
                            <i className='bx bx-map-pin' ></i>
                            States
                            </span>
                            <i class='bx bxs-chevron-down-circle'></i>
                        </TabHead>
                    </div>
                    <div className="col-4">
                        <TabHead active={activeTab} clickTab={handleActiveTab} tab={3}>
                            <span>
                            <i className='bx bx-map' ></i>
                            Regions
                            </span>
                            <i class='bx bxs-chevron-down-circle'></i>
                        </TabHead>
                    </div>
                </div>
                <Tabs>
                    {activeTab && activeTab === 1 && (
                        <Tab1 />
                    )}
                    {activeTab && activeTab === 2 && (
                        <Tab>
                            Hello 2
                        </Tab>
                    )}
                    {activeTab && activeTab === 3 && (
                        <Tab>
                            Hello 3
                        </Tab>
                    )}
                </Tabs>
            </DashboardWrapperMain>
        </DashboardWrapper>
    )
}

export default Locations
