import React, { useState } from 'react';
import axios from 'axios';

function CreateQuestionnaire() {
  const [questionnaireTitle, setQuestionnaireTitle] = useState("");
  const [creationStatus, setCreationStatus] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "" }] },
  ]);

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
    const newQuestionnaire = { title: questionnaireTitle, questions };

    try {
      await axios.post('http://localhost:5000/create', newQuestionnaire);
      setCreationStatus('Questionnaire created successfully!');
      setQuestionnaireTitle('');
      setQuestions([{ questionText: "", options: [{ text: "" }] }]);
    } catch (error) {
      setCreationStatus('Error creating questionnaire. Please try again.');
      console.error('Error creating questionnaire:', error);
    }
  };

  return (
    <div>
      <h2>Create New Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={questionnaireTitle}
          onChange={(e) => setQuestionnaireTitle(e.target.value)}
          placeholder="Questionnaire Title"
        />
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
              placeholder="Question Text"
            />
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={option.text}
                onChange={(e) => handleOptionTextChange(qIndex, oIndex, e.target.value)}
                placeholder="Option Text"
              />
            ))}
            <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Submit Questionnaire</button>
      </form>
      {creationStatus && <p>{creationStatus}</p>}
    </div>
  );
}

export default CreateQuestionnaire;
