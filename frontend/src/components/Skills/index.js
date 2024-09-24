import React, { useState } from 'react';

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    category: '',
    skills: ['']
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      const updatedSkills = [...currentCategory.skills];
      updatedSkills[index] = value;
      setCurrentCategory({ ...currentCategory, skills: updatedSkills });
    } else {
      setCurrentCategory((prev) => ({ ...prev, [name]: value }));
    }
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

  return (
    <div className="section-container" id="skills">
      <div className="section-main">
        <label htmlFor="category">Skill Category:</label><br />
        <input
          type="text"
          id="category"
          name="category"
          value={currentCategory.category}
          onChange={handleInputChange}
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
              onChange={(e) => handleInputChange(e, index)}
              required
            /><br />
          </div>
        ))}

        <button type="button" onClick={addSkillField}>Add Skill</button><br />
        <button type="button" onClick={addCategory}>Add Category</button>

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
      </div>
    </div>
  );
};

export default Skills;
