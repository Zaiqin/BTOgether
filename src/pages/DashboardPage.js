import React, { useState } from 'react';
import Navbar from "../components/NavBar";

import Comparison from '../components/Comparison';

const DashboardPage = () => {
  return (
    <div>
    <Navbar/>
      <Comparison/>
    </div>
  );
};

export default DashboardPage;
