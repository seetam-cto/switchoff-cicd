import images from "./images"

const data = {
    user: {
        name: 'Tuatta',
        img: images.avt
    },
    summary: [
        {
            title: 'Customers',
            subtitle: 'Registered today',
            value: '120',
            percent: 70
        },
        {
            title: 'Bookings',
            subtitle: 'Total bookings today',
            value: '3000',
            percent: 49
        },
        {
            title: 'Revenue',
            subtitle: 'Total revenue today',
            value: '₹678/-',
            percent: 38
        },
        {
            title: 'Visits',
            subtitle: 'Total visits today',
            value: '2345',
            percent: 55
        }
    ],
    revenueSummary: {
        title: 'Revenue',
        value: '₹10,278',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    overall: [
        {
            value: '1.234k',
            title: 'Bookings'
        },
        {
            value: '9.876K',
            title: 'Customers'
        },
        {
            value: '11.234K',
            title: 'Visits'
        },
        {
            value: '₹55,20,678',
            title: 'Revenue'
        }
    ],
    revenueByChannel: [
        {
            title: 'Direct',
            value: 70
        },
        {
            title: 'External search',
            value: 40
        },
        {
            title: 'Referal',
            value: 60
        },
        {
            title: 'Social',
            value: 30
        }
    ],
    revenueByMonths: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
    }
}

export default data