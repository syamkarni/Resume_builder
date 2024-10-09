from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


resume_data = {}

@app.route('/save_personal_info', methods=['POST'])
def save_personal_info():
    data = request.json
    resume_data['personal'] = data
    print(resume_data['personal'])
    return jsonify({"message": "Personal info saved successfully", "data": resume_data['personal']}), 200

@app.route('/save_work_experience', methods=['POST'])
def save_work_experience():
    data = request.json.get('workExperiences', [])
    resume_data['work'] = data
    print(resume_data['work'])
    return jsonify({"message": "Work experiences saved successfully", "data": resume_data['work']}), 200

@app.route('/save_education', methods=['POST'])
def save_education():
    data = request.json
    resume_data['education'] = data
    print(resume_data['education'])
    return jsonify({"message": "Education saved successfully", "data": resume_data['education']}), 200

@app.route('/save_projects', methods=['POST'])
def save_projects():
    data = request.json
    resume_data['projects'] = data
    print(resume_data['projects'])
    return jsonify({"message": "Projects saved successfully", "data": resume_data['projects']}), 200

@app.route('/save_skills', methods=['POST'])
def save_skills():
    data = request.json
    resume_data['skills'] = data
    print(resume_data['skills'])
    return jsonify({"message": "Skills saved successfully", "data": resume_data['skills']}), 200

@app.route('/save_certificates', methods=['POST'])
def save_certificates():
    data = request.json
    resume_data['certificates'] = data
    print(resume_data['certificates'])
    return jsonify({"message": "Certificates saved successfully", "data": resume_data['certificates']}), 200

@app.route('/save_awards', methods=['POST'])
def save_awards():
    data = request.json
    resume_data['awards'] = data
    print(resume_data['awards'])
    return jsonify({"message": "Awards saved successfully", "data": resume_data['awards']}), 200

@app.route('/save_extracurricular', methods=['POST'])
def save_extracurricular():
    data = request.json
    resume_data['extracurricular'] = data
    print(resume_data['extracurricular'])
    return jsonify({"message": "Extracurricular saved successfully", "data": resume_data['extracurricular']}), 200

@app.route('/save_volunteer_data', methods=['POST'])
def save_volunteer_data():
    data = request.json
    resume_data['volunteer_data'] = data
    print(resume_data['volunteer_data'])
    return jsonify({"message": "Volunteer data saved successfully", "data": resume_data['volunteer_data']}), 200

@app.route('/save_description', methods=['POST'])
def save_description():
    data = request.json
    resume_data['description'] = data
    print(resume_data['description'])
    return jsonify({"message": "Description saved successfully", "data": resume_data['description']}), 200




if __name__ == '__main__':
    app.run(debug=True)
