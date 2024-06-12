import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

function CreateQuestionnaire() {
  const [questionnaireTitle, setQuestionnaireTitle] = useState("");
  const [companyName, setCompanyName] = useState(""); 
  const [creationStatus, setCreationStatus] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "" }] },
  ]);
  const [qpoints, setQPoints] = useState(''); // Renamed state for clarity

  const handleQuestionTextChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = text;
    setQuestions(newQuestions);
  };

  const handleOptionTextChange = (questionIndex, optionIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [{ text: "" }] }]);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ text: "" });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQuestionnaire = {
      title: questionnaireTitle,
      company: companyName,
      questions,
      qpoints // Using the renamed state
    };

    try {
      await axios.post('http://localhost:5000/create', newQuestionnaire);
      setCreationStatus('Questionnaire created successfully!');
      setQuestionnaireTitle('');
      setCompanyName('');
      setQuestions([{ questionText: "", options: [{ text: "" }] }]);
      setQPoints(''); // Resetting the points input field
    } catch (error) {
      setCreationStatus('Error creating questionnaire. Please try again.');
      console.error('Error creating questionnaire:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>Create New Questionnaire</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          overflowY: 'auto',
          maxHeight: '60vh',
          width: '50vh',
          maxWidth: '50vh',
          bgcolor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          p: '20px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="Questionnaire Title"
          value={questionnaireTitle}
          onChange={(e) => setQuestionnaireTitle(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        
        <TextField 
        fullWidth
        label="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        variant="outlined"
        margin="normal"
      />
        {questions.map((question, qIndex) => (
          <Box key={qIndex} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              label="Question Text"
              variant="outlined"
              value={question.questionText}
              onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
              margin="normal"
            />
            {question.options.map((option, oIndex) => (
              <TextField
                key={oIndex}
                fullWidth
                label="Option Text"
                variant="outlined"
                value={option.text}
                onChange={(e) => handleOptionTextChange(qIndex, oIndex, e.target.value)}
                margin="normal"
              />
            ))}
            <Button variant="outlined" onClick={() => addOption(qIndex)} sx={{ mt: 1, mb: 1 }}>
              Add Option
            </Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={addQuestion} sx={{ mt: 1, mb: 1 }}>
          Add Question
        </Button>
        <TextField
          type="number"
          fullWidth
          label="QPoints" // Label updated to reflect what this field represents
          value={qpoints}
          onChange={(e) => setQPoints(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit Questionnaire
        </Button>
      </Box>
      {creationStatus && <Typography color="textSecondary" sx={{ mt: 2 }}>{creationStatus}</Typography>}
    </Box>
  );
}

export default CreateQuestionnaire;
