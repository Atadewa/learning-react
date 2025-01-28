/* eslint-disable react/prop-types */
import Course from "./Course";

export default function Semester({ semester, setSemesters }){
  function handleDeleteSemester(){
    setSemesters((semesters) => semesters.filter((s) => s.id !== semester.id));
  }

  function handleAddCourse(){
    const newCourse = {
      id: Date.now(),
      name: '',
      grade: 4,
      credit: 0
    }

    setSemesters((semesters) =>
      semesters.map((s) =>
        s.id === semester.id 
        ? {
            ...semester,
              courses: [...semester.courses, newCourse],
          } : semester
      )
    );
  }

  function calculateGPA(courses){
    const totalCredits = courses.reduce((sum, course) => sum + (course.credit || 0), 0);
    const totalPoints = courses.reduce((sum, course) => sum + (course.grade || 0) * (course.credit || 0), 0);

    return totalCredits === 0 ? 0 : (totalPoints/totalCredits).toFixed(2);
  }

  return(
    <div key={semester.id} className='p-5'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>{semester.name}</h2>

        <button
          onClick={handleDeleteSemester} className='btn-delete w-fit px-4'
        >
          Delete Semester
        </button>
      </div>

      <div>
        <button className='btn-add mt-4' onClick={handleAddCourse}>Add Course</button>            

        <ul className=''>
          {semester.courses.map((course) => (
            <Course
              key={course.id}
              course={course}
              semesterId={semester.id}
              setSemesters={setSemesters}
            />
          ))}
        </ul>
      </div>

      <p>GPA {semester.name}: {calculateGPA(semester.courses)}</p>
    </div>
  );
}