import { useState } from 'react';
import Logo from './assets/calculator.svg';

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

  function handleDeleteSemester(id){
    setSemesters(semesters.filter((semester) => semester.id !== id));
  }

  function handleAddCourse(semesterId){
    const newCourse = {
      id: Date.now(),
      name: '',
      grade: 0,
      credit: 0
    }

    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId 
        ? {
            ...semester,
              courses: [...semester.courses, newCourse],
          } : semester
      )
    );
  }

  function handleDeleteCourse(semesterId, courseId){
    setSemesters(semesters.map((semester) =>
      semester.id === semesterId
        ? {
          ...semester,
          courses: semester.courses.filter((course) => course.id !== courseId),
        } : semester
      )
    );
  }

  function handleCourseChange(semesterId, courseId, field, value){
    setSemesters(semesters.map((semester) =>
      semester.id === semesterId
        ? {
          ...semester,
          courses: semester.courses.map((course) =>
            course.id === courseId
              ? {
                ...course, [field]: field === 'credit' || field === 'grade' ? parseFloat(value) : value
              } : course
            ),
        } : semester
      )
    );
  }

  function calculateGPA(courses){
    const totalCredits = courses.reduce((sum, course) => sum + (course.credit || 0), 0);
    const totalPoints = courses.reduce((sum, course) => sum + (course.grade || 0) * (course.credit || 0), 0);

    return totalCredits === 0 ? 0 : (totalPoints/totalCredits).toFixed(2);
  }

  function calculateCumulativeGPA() {
    const allCourses = semesters.flatMap((semester) => semester.courses);
    return calculateGPA(allCourses);
  }

  return (
    <>
      <header className='w-full p-5 flex items-center justify-start gap-5'>
        <img src={Logo} alt="" className='w-15'/>
        <p className='text-2xl font-bold'>GPA Calculator</p>
      </header>

      <div className='bg-white border border-sky-100 rounded m-3 shadow-md'>
        <button type="button" className=" mt-5 mx-5 btn-add" onClick={handleAddSemester}>Add Semester</button>

        {semesters.map((semester) => (
          <div key={semester.id} className='p-5'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-bold'>{semester.name}</h2>

              <button
                onClick={() => handleDeleteSemester(semester.id)} className='btn-delete w-fit px-4'
              >
                Delete Semester
              </button>
            </div>

            <div>
              <button className='btn-add mt-4' onClick={() => handleAddCourse(semester.id)}>Add Course</button>            

              <ul className=''>
                {semester.courses.map((course) => (
                  <li key={course.id} className='grid w-full grid-flow-col'>
                    <input
                      type="text"
                      placeholder='Course Name'
                      value={course.name}
                      onChange={(e) => handleCourseChange(semester.id, course.id, 'name', e.target.value)}
                      />
                    <select
                      name="grade"
                      value={course.grade || "0"}
                      onChange={(e) => handleCourseChange(semester.id, course.id, 'grade', e.target.value)}
                      >
                        <option value="4">A</option>
                        <option value="3.5">B+</option>
                        <option value="3">B</option>
                        <option value="2.5">C+</option>
                        <option value="2">C</option>
                        <option value="1.5">D+</option>
                        <option value="1">D</option>
                        <option value="0">E</option>
                    </select>
                    <input
                      type="number"
                      placeholder='Credit'
                      value={course.credit || '0'}
                      onChange={(e) => handleCourseChange(semester.id, course.id, 'credit', e.target.value)}
                    />
                    <button type="button" className='btn-delete' onClick={() => handleDeleteCourse(semester.id, course.id)}>&times;</button>
                  </li>
                ))}
              </ul>
            </div>

            <p>GPA {semester.name}: {calculateGPA(semester.courses)}</p>
          </div>
        ))}

        <p className='m-5'>Cumulative GPA: {calculateCumulativeGPA()}</p>
      </div>
    </>
  )
}

