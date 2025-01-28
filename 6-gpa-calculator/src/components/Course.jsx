/* eslint-disable react/prop-types */
export default function Course({ course, semesterId, setSemesters }){
  function handleCourseChange(field, value){
    setSemesters((semesters) =>
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
            ...semester,
            courses: semester.courses.map((c) =>
              c.id === course.id
                ? {
                  ...c, [field]:
                    value === ''
                      ? ''
                      : field === 'credit' || field === 'grade'
                      ? parseFloat(value) || ''
                      : value,
                } : c
              ),
          } : semester
        )
    );
  }

  function handleDeleteCourse(){
    setSemesters((semesters) => 
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
            ...semester,
            courses: semester.courses.filter((c) => c.id !== course.id),
          } : semester
      )
    );
  }

  return (
    <li className='grid w-full grid-flow-col'>
      <input
        type="text"
        placeholder='Course Name'
        value={course.name}
        onChange={(e) => handleCourseChange('name', e.target.value)}
        />
      <select
        value={course.grade}
        onChange={(e) => handleCourseChange('grade', e.target.value)}
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
        value={course.credit || ''}
        onChange={(e) => handleCourseChange('credit', e.target.value)}
      />
      <button type="button" className='btn-delete' onClick={handleDeleteCourse}>&times;</button>
    </li>
  );
}