/* eslint-disable react/prop-types */
export default function CumulativeGPA({ semesters }){
  function calculateCumulativeGPA() {
    const allCourses = semesters.flatMap((semester) => semester.courses);
    const totalCredits = allCourses.reduce((sum, course) => sum + (course.credit || 0), 0);
    const totalPoints = allCourses.reduce((sum, course) => sum + (course.grade || 0) * (course.credit || 0), 0);
  
    return totalCredits === 0 ? 0 : (totalPoints/totalCredits).toFixed(2);
  }

  return <p className='m-5'>Cumulative GPA: {calculateCumulativeGPA()}</p>
}