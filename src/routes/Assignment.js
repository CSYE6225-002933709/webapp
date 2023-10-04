import app from "../../index.js";

// GET /v1/assignments - Get List of All Assignments
app.get('/v1/assignments', (req, res) => {
  
    console.log('/v1/assignments get called');
    // TODO: Get from db
});

// POST /v1/assignments - Create Assignment
app.post('/v1/assignments', (req, res) => {
    
  console.log('/v1/assignments post called');
  const newAssignment = req.body;
  // TODO: add to db
  res.status(201).json(newAssignment);
});

app.get('/v1/assignments/:id', (req, res) => {
  const assignmentId = req.params.id;
  var assignment = null;
  // TODO: Get Assignment based on id
  console.log('/v1/assignments:id get called');
  if (!assignment) {
    res.status(404).json({ error: 'Assignment not found' });
  } else {
    res.json(assignment);
  }
});

app.delete('/v1/assignments/:id', (req, res) => {

  const assignmentId = req.params.id;
  // TODO : Delete assignment based on id
  console.log('/v1/assignments:id delete called');
  if (index === -1) {
    
    res.status(404).json({ error: 'Assignment not found' });

  } else {
    
    res.status(204).send();
  }
});

app.put('/v1/assignments/:id', (req, res) => {
  
  const assignmentId = req.params.id;
  const updatedAssignment = req.body;
  
  // TODO : update assignmnent based on id
  console.log('/v1/assignments:id put called');

  if (index === -1) {
    res.status(404).json({ error: 'Assignment not found' });
  } else {
    
    res.json(updatedAssignment);
  }
});

export default app;

