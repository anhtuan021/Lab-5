import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const StudentDetail = ({ students }) => {
  const { id } = useParams();
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <Container className='mt-5'>
      <h2>Student Detail</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Code:</strong> {student.code}</p>
      <p><strong>Status:</strong> {student.status}</p>
      <Button variant='primary' onClick={() => window.history.back()}>Go Back</Button>
    </Container>
  );
};

export default StudentDetail;
