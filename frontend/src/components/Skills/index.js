import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Skills = () => {
  const navigate = useNavigate();
  const [skillsData, setSkillsData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    category: '',
    skills: ['']
  });

  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState({
    language: '',
    fluency: ''
  });

  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState('');

  const fluencyLevels = [
    'Native Speaker',
    'Professional Proficiency',
    'Intermediate Proficiency',
    'Basic Proficiency',
    'Beginner'
  ];

  const handleSkillInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      const updatedSkills = [...currentCategory.skills];
      updatedSkills[index] = value;
      setCurrentCategory({ ...currentCategory, skills: updatedSkills });
    } else {
      setCurrentCategory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLanguageInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentLanguage((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestInputChange = (e) => {
    setCurrentInterest(e.target.value);
  };

  const addSkillField = () => {
    setCurrentCategory((prev) => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const addCategory = () => {
    if (currentCategory.category && currentCategory.skills.length > 0) {
      setSkillsData((prev) => [...prev, currentCategory]);
      setCurrentCategory({
        category: '',
        skills: ['']
      });
    }
  };

  const addLanguage = () => {
    if (currentLanguage.language && currentLanguage.fluency) {
      setLanguages((prev) => [...prev, currentLanguage]);
      setCurrentLanguage({ language: '', fluency: '' });
    }
  };

  const addInterest = () => {
    if (currentInterest) {
      setInterests((prev) => [...prev, currentInterest]);
      setCurrentInterest('');
    }
  };

  return (
    <div className="section-container" id="skills">
      <div className="section-main">
        {/* Skill Categories */}
        <label htmlFor="category">Skill Category:</label><br />
        <input
          type="text"
          id="category"
          name="category"
          value={currentCategory.category}
          onChange={handleSkillInputChange}
          required
        /><br />

        {currentCategory.skills.map((skill, index) => (
          <div key={index}>
            <label htmlFor={`skill-${index}`}>Skill:</label><br />
            <input
              type="text"
              id={`skill-${index}`}
              name="skills"
              value={skill}
              onChange={(e) => handleSkillInputChange(e, index)}
              required
            /><br />
          </div>
        ))}

        <button type="button" onClick={addSkillField}>Add Skill</button><br />
        <button type="button" onClick={addCategory}>Add Category</button>

        {/* Display Skills */}
        <div className="skills-list">
          {skillsData.map((category, index) => (
            <div key={index} className="skills-entry">
              <h3>{category.category}</h3>
              <ul>
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="languages-section">
          <h3>Languages</h3>
          <label htmlFor="language">Language:</label><br />
          <input
            type="text"
            id="language"
            name="language"
            value={currentLanguage.language}
            onChange={handleLanguageInputChange}
            required
          /><br />

          <label htmlFor="fluency">Fluency:</label><br />
          <select
            id="fluency"
            name="fluency"
            value={currentLanguage.fluency}
            onChange={handleLanguageInputChange}
            required
          >
            <option value="" disabled>Select fluency</option>
            {fluencyLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select><br />

          <button type="button" onClick={addLanguage}>Add Language</button>

          {languages.map((lang, index) => (
            <div key={index}>
              <p>{lang.language} - {lang.fluency}</p>
            </div>
          ))}
        </div>

        {/* Interests */}
        <div className="interests-section">
          <h3>Interests</h3>
          <label htmlFor="interest">Interest:</label><br />
          <input
            type="text"
            id="interest"
            value={currentInterest}
            onChange={handleInterestInputChange}
            required
          /><br />
          <button type="button" onClick={addInterest}>Add Interest</button>

          {interests.map((interest, index) => (
            <div key={index}>
              <p>{interest}</p>
            </div>
          ))}
        </div>

        
      </div>
      <br />
      <button onClick={() => navigate('/Awards')}>Back</button>
    </div>
  );
};

export default Skills;
