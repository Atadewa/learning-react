import { useState } from 'react';
import Header from './Header';
import Semester from './Semester';
import CumulativeGPA from './CumulativeGPA';

export default function App() {
  const [semesters, setSemesters] = useState([]);

  function handleAddSemester(){
    const newSemester = {
      id: Date.now(),
      name: `Semester ${semesters.length + 1}`,
      courses: []
    }

    setSemesters([...semesters, newSemester]);
  }
  
  return (
    <>
      <Header />

      <div className='bg-white border border-sky-100 rounded m-3 shadow-md'>
        <button type="button" className=" mt-5 mx-5 btn-add" onClick={handleAddSemester}>Add Semester</button>

        {semesters.map((semester) => (
          <Semester 
            key={semester.id}
            semester={semester}
            setSemesters={setSemesters}
          />
        ))}

        <CumulativeGPA semesters={semesters}/>
      </div>
    </>
  )
}

