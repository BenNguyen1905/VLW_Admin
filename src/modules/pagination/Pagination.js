import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = () => {
    const [students, setStudents]= useState([]);
    const [loading, setLoading] = useEffect(false);
    const getStudentData = async () => {
        try {
            const data = await axios.get(
                "http://localhost:3000"
            );
            console.log(data);
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        getStudentData();
    }, []);
};

export default Pagination;