import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormControl, Row, Table } from 'react-bootstrap';
import StudentDetail from './StudentDetail'; 
import './App.css';

function App() {
  const students = [
    { id: 1, name: 'Nguyen Van A', code: 'CODE12345', status: 'Active', selected: false },
    { id: 2, name: 'Tran Van B', code: 'CODE67890', status: 'In-active', selected: false }
  ];

  const [allStudents, setAllStudents] = useState(students);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', status: 'Active' });

  const clearHander = () => {
    setAllStudents([]);
  };

  const selectHander = (id) => {
    setAllStudents(prevStudents =>
      prevStudents.map(item => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      })
    );
  };

  const addHandler = () => {
    if (newStudent.name && newStudent.code) {
      const newEntry = {
        id: allStudents.length + 1,
        ...newStudent,
        selected: false
      };
      setAllStudents([...allStudents, newEntry]);
      setNewStudent({ name: '', code: '', status: 'Active' });
    }
  };

  const deleteHandler = (id) => {
    const updatedStudents = allStudents.filter(item => item.id !== id);
    setAllStudents(updatedStudents);
  };

  return (
    <Router>
      <Container className='mt-5'>
        <Row>
          <Col>
            <h2>Total Selected Student: {allStudents.filter(item => item.selected).length}</h2>
          </Col>
          <Col>
            <Button onClick={clearHander}>Clear</Button>
          </Col>
        </Row>

        <Row className='mt-5 mb-5'>
          <Col>
            <FormControl
              placeholder="Student name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <FormControl
              placeholder="Student Code"
              value={newStudent.code}
              onChange={(e) => setNewStudent({ ...newStudent, code: e.target.value })}
            />
            <Form.Check
              type='checkbox'
              label="Still Active"
              checked={newStudent.status === 'Active'}
              onChange={(e) => setNewStudent({ ...newStudent, status: e.target.checked ? 'Active' : 'In-active' })}
            />
          </Col>
          <Col>
            <Button onClick={addHandler}>Add</Button>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Selected</th>
                <th>Student Name</th>
                <th>Student Code</th>
                <th>Status</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map(item => (
                <tr key={item.id}>
                  <td>
                    <Form.Check type="checkbox" onChange={() => selectHander(item.id)} />
                  </td>
                  <td>
                    <Link to={`/student/${item.id}`}>{item.name}</Link> {/* Link to student detail page */}
                  </td>
                  <td>{item.code}</td>
                  <td>
                    <Button>{item.status}</Button>
                  </td>
                  <td>
                    <Button variant='danger' onClick={() => deleteHandler(item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

        <Routes>
          <Route path="/student/:id" element={<StudentDetail students={allStudents} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
