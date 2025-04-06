import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <JobListing></JobListing>
        <JobCard></JobCard>
        <Footer></Footer>
    </div>
  )
}

export default Home