import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import JobCard from '../components/JobCard'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <JobListing></JobListing>
        <JobCard></JobCard>
    </div>
  )
}

export default Home