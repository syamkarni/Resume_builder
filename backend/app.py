from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)


resume_data = {
    "personal": {}, 
    "work": [],
    "education": [],
    "projects": [],
    "skills": [],
    "languages": [],
    "interests": [],
    "certificates": [],
    "awards": [],
    "extracurricular": [],
    "volunteer_data": [],
    "description": ""
}


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
    resume_data['skills'] = data.get('skills', [])
    resume_data['languages'] = data.get('languages', [])
    resume_data['interests'] = data.get('interests', [])
    print(resume_data['skills'])
    print(resume_data['languages'])
    print(resume_data['interests'])
    return jsonify({"message": "Skills data saved successfully", "data": resume_data}), 200

@app.route('/download_json', methods=['GET'])
def download_json():
    file_path = 'resume_data.json'

    with open(file_path, 'w') as json_file:
        json.dump(resume_data, json_file, indent=4)
    

    return send_file(file_path, as_attachment=True)


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
    resume_data['description'] = data.get('description', '')
    print(resume_data['description'])
    return jsonify({"message": "Description saved successfully"}), 200


#------------------------------------------------------------------------------------------------
#get end points here

@app.route('/get_personal_info', methods=['GET'])
def get_personal_info():
    return jsonify({"personal": resume_data['personal']}), 200

@app.route('/get_work_experience', methods=['GET'])
def get_work_experience():
    return jsonify({"workExperiences": resume_data['work']}), 200

@app.route('/get_education', methods=['GET'])
def get_education():
    return jsonify({"education": resume_data['education']}), 200

@app.route('/get_projects', methods=['GET'])
def get_projects():
    return jsonify({"projects": resume_data['projects']}), 200

@app.route('/get_skills', methods=['GET'])
def get_skills():
    return jsonify({
        "skills": resume_data['skills'],
        "languages": resume_data['languages'],
        "interests": resume_data['interests']
    }), 200

@app.route('/get_certificates', methods=['GET'])
def get_certificates():
    return jsonify({"certificates": resume_data['certificates']}), 200

@app.route('/get_awards', methods=['GET'])
def get_awards():
    return jsonify({"awards": resume_data['awards']}), 200

@app.route('/get_extracurricular', methods=['GET'])
def get_extracurricular():
    return jsonify({"extracurricular": resume_data['extracurricular']}), 200

@app.route('/get_volunteer_data', methods=['GET'])
def get_volunteer_data():
    return jsonify({"volunteer_data": resume_data['volunteer_data']}), 200

@app.route('/get_description', methods=['GET'])
def get_description():
    print("Fetching description:", resume_data)
    return jsonify({"description": resume_data.get('description', '')}), 200
#------------------------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)
