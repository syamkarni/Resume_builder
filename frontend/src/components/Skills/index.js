import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_skills');
      const data = await response.json();
      setSkillsData(data.skills || []);
      setLanguages(data.languages || []);
      setInterests(data.interests || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSkillChange = (e, categoryIndex, skillIndex) => {
    const updatedSkillsData = [...skillsData];
    updatedSkillsData[categoryIndex].skills[skillIndex] = e.target.value;
    setSkillsData(updatedSkillsData);
    saveSkillsData(updatedSkillsData, languages, interests); 
  };

  const handleCategoryInputChange = (e) => {
    setCurrentCategory({ ...currentCategory, category: e.target.value });
  };

  const addSkillField = (categoryIndex) => {
    const updatedSkillsData = [...skillsData];
    updatedSkillsData[categoryIndex].skills.push('');
    setSkillsData(updatedSkillsData);
    saveSkillsData(updatedSkillsData, languages, interests); 
  };

  const deleteSkill = (categoryIndex, skillIndex) => {
    const updatedSkillsData = [...skillsData];
    updatedSkillsData[categoryIndex].skills.splice(skillIndex, 1);
    setSkillsData(updatedSkillsData);
    saveSkillsData(updatedSkillsData, languages, interests); 
  };

  const addCategory = () => {
    if (currentCategory.category) {
      const updatedSkillsData = [...skillsData, currentCategory];
      setSkillsData(updatedSkillsData);
      saveSkillsData(updatedSkillsData, languages, interests);
      setCurrentCategory({ category: '', skills: [''] });
    }
  };

  const deleteCategory = (categoryIndex) => {
    const updatedSkillsData = skillsData.filter((_, index) => index !== categoryIndex);
    setSkillsData(updatedSkillsData);
    saveSkillsData(updatedSkillsData, languages, interests); 
  };

  const addLanguage = () => {
    if (currentLanguage.language && currentLanguage.fluency) {
      const updatedLanguages = [...languages, currentLanguage];
      setLanguages(updatedLanguages);
      saveSkillsData(skillsData, updatedLanguages, interests);
      setCurrentLanguage({ language: '', fluency: '' });
    }
  };

  const deleteLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
    saveSkillsData(skillsData, updatedLanguages, interests); 
  };

  const addInterest = () => {
    if (currentInterest) {
      const updatedInterests = [...interests, currentInterest];
      setInterests(updatedInterests);
      saveSkillsData(skillsData, languages, updatedInterests);
      setCurrentInterest('');
    }
  };

  const deleteInterest = (index) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    saveSkillsData(skillsData, languages, updatedInterests); 
  };

  const saveSkillsData = async (skills, languages, interests) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/save_skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, languages, interests }),
      });

      if (!response.ok) throw new Error('Failed to save skills data');
      console.log('Skills data saved successfully');
    } catch (error) {
      console.error('Error saving skills data:', error);
    }
  };

  const downloadResumeJson = () => {
    fetch('http://127.0.0.1:5000/download_json')
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume_data.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => console.error('Error downloading JSON:', error));
  };

  return (
    <div className="section-container" id="skills">
      <div className="section-main">
        <h3>Skill Categories</h3>
        <input
          type="text"
          placeholder="Category"
          value={currentCategory.category}
          onChange={handleCategoryInputChange}
        /><br />
        <button onClick={addCategory}>Add Category</button>

        {skillsData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4>{category.category}</h4>
            <ul>
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>
                  {skill}
                  {' '}
                  <button onClick={() => deleteSkill(categoryIndex, skillIndex)}>Delete Skill</button>
                </li>
              ))}
            </ul>
            <button onClick={() => addSkillField(categoryIndex)}>Add Skill</button>
            <button onClick={() => deleteCategory(categoryIndex)}>Delete Category</button>
          </div>
        ))}

        <h3>Languages</h3>
        <input
          type="text"
          placeholder="Language"
          value={currentLanguage.language}
          onChange={(e) => setCurrentLanguage({ ...currentLanguage, language: e.target.value })}
        /><br />
        <select
          value={currentLanguage.fluency}
          onChange={(e) => setCurrentLanguage({ ...currentLanguage, fluency: e.target.value })}
        >
          <option value="" disabled>Select Fluency</option>
          {fluencyLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select><br />
        <button onClick={addLanguage}>Add Language</button>

        {languages.map((lang, index) => (
          <div key={index}>
            <p>{lang.language} - {lang.fluency}</p>
            <button onClick={() => deleteLanguage(index)}>Delete Language</button>
          </div>
        ))}

        <h3>Interests</h3>
        <input
          type="text"
          placeholder="Interest"
          value={currentInterest}
          onChange={(e) => setCurrentInterest(e.target.value)}
        /><br />
        <button onClick={addInterest}>Add Interest</button>

        {interests.map((interest, index) => (
          <div key={index}>
            <p>{interest}</p>
            <button onClick={() => deleteInterest(index)}>Delete Interest</button>
          </div>
        ))}

        <button onClick={() => navigate('/Awards')}>Back</button>
        <button onClick={downloadResumeJson}>Download JSON</button>
      </div>
    </div>
  );
};

export default Skills;
