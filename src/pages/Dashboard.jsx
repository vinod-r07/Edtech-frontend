import React, { useState, useEffect} from 'react';
import { apiConnector } from '../services/apiConnector';
import Sidebar from '../component/profile/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Pie,Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Dashboard = () => {

    const userData= useSelector( state => state.user.user);
    const navigate= useNavigate();
    const [ data, setData]= useState([]);
    const [ currentChart, setCurrentChart]= useState("revenue")



    if( userData.role !== "Instructor")
    navigate('/profile')

    useEffect( () => {
        getData();
    }, [])

    const getData= async() => {

        const headers= {
            Authorization: `Bearer ${userData?.token}`
        }

        try {
            const res= await apiConnector("GET", '/instructor/get-revenue', {}, headers);
            console.log("response from get revenue : ", res?.data?.data);
            setData(res?.data?.data)
        } catch (error) {
            console.log("something went wrong : ", error);
        }
    }

    ChartJS.register(ArcElement, Tooltip, Legend);

    useEffect( () => {
        if( data)
        console.log("data : ", data)
    }, [data])



    const randomColor = (num) => {
        const colors = []
        for(let i=0; i<num; i++) {
            colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)
        }
        return colors;
    }

    const studentsData= {
        labels: data?.courses?.map( item => item.title),
        datasets: [
            {
                label: '# of Students',
                data: data?.courses?.map(course => course?.students),
                backgroundColor: randomColor(data?.courses?.length),
                borderColor: randomColor(),
                borderWidth: 1,
            },
        ]
    }

    const revenueData= {
        labels: data?.courses?.map( item => item.title),
        datasets: [
            {
                label: 'Revenue',
                data: data?.courses?.map(course => course?.revenue),
                backgroundColor: randomColor(data?.courses?.length),
                borderColor: randomColor(),
                borderWidth: 1,
            },
        ]
    }

    const dt= []


  return (
        <div className='flex bg-[#000814] justify-between'>
            
            <div>
                <Sidebar/>
            </div>

            <div className='p-10 w-full'>
                <div>
                <div className='space-y-2'>
                    <h1 className='text-2xl font-bold text-richblack-5'>Hi {userData?.fullName} 👋</h1>
                    <p className='font-medium text-richblack-200'>Let's start something new</p>
                </div>

                <div  className='my-4 flex flex-col-reverse  gap-3 md:flex-row md:flex md:h-[450px] md:space-x-4'>
                    <div className='flex flex-col flex-1 rounded-md bg-richblack-800 p-6'>
                        <div className='flex items-center justify-between'>
                        <p className='text-lg font-bold text-richblack-5'>
                        Visualize
                        </p>
                        <div className='flex items-center space-x-4'>
                        <button onClick={() => setCurrentChart('revenue')} className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>Revenue</button>
                        <button onClick={() => setCurrentChart('students')} className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>Students</button>
            </div>
                        </div>

                  {currentChart === 'revenue' ? <Pie data={revenueData}
                options={{
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 10,
                                boxHeight: 10,
                                padding: 20,
                                font: {
                                    size: 12,
                                },
                            },
                        },
                    },
                    aspectRatio: 2,
                }
            }

                 /> : <Pie data={studentsData} />}
    

                    </div>
                    <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                        <p className='text-lg font-bold text-richblack-5'>Statistics</p>
                        <div className='mt-4 space-y-4'>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Courses</p>
                                <p className='text-3xl font-semibold text-richblack-50'>9</p>
                            </div>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Students</p>
                                <p className='text-3xl font-semibold text-richblack-50'>151</p>
                            </div>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Earnings</p>
                                <p className='text-3xl font-semibold text-richblack-50'>₹ 10,09,900</p>
                                </div>
                        </div>
                    </div>
                </div>
           
            </div>
           
            </div>
        </div>

  )
}

export default Dashboard
