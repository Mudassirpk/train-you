import React from 'react'
import Course from './course'

type Props = {}

function CourseList({}: Props) {
  return (
    <div className='w-full flex-1 overflow-y-scroll p-2 flex flex-col gap-2 items-center'>
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
    </div>
  )
}

export default CourseList