import React from 'react'
import { useParams } from 'react-router-dom';

function ActivityDetail() {
  // @ts-ignore
  const { id } = useParams()
  console.log(id);
  

  return (
    <div>ActivityDetail</div>
  )
}

export default ActivityDetail