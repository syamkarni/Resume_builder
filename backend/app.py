from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
import json, os
import subprocess
from io import BytesIO
import zipfile
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Load environment variables
load_dotenv()
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['resume_builder']

# Separate collections for different sections
personal_collection = db['personal_info']
work_collection = db['work_experience']
education_collection = db['education']
projects_collection = db['projects']
skills_collection = db['skills']
certificates_collection = db['certificates']
awards_collection = db['awards']
extracurricular_collection = db['extracurricular']
volunteer_collection = db['volunteer_data']
description_collection = db['description']

# Paths for Typst and PDF files
TYPST_FOLDER = os.path.join(os.getcwd(), 'typst')
MAIN_TYP_PATH = os.path.join(TYPST_FOLDER, 'main.typ')
PDF_OUTPUT_PATH = os.path.join(TYPST_FOLDER, 'resume.pdf')
DATA_JSON_PATH = os.path.join(TYPST_FOLDER, 'data.json')

# Schema and initialization
@app.route('/save_personal_info', methods=['POST'])
def save_personal_info():
    data = request.json
    personal_collection.update_one({}, {'$set': data}, upsert=True)
    return jsonify({"message": "Personal info saved successfully", "data": data}), 200

@app.route('/save_work_experience', methods=['POST'])
def save_work_experience():
    data = request.json.get('workExperiences', [])
    work_collection.update_one({}, {'$set': {'work': data}}, upsert=True)
    return jsonify({"message": "Work experiences saved successfully", "data": data}), 200

@app.route('/save_education', methods=['POST'])
def save_education():
    data = request.json
    education_collection.update_one({}, {'$set': {'education': data}}, upsert=True)
    return jsonify({"message": "Education saved successfully", "data": data}), 200

@app.route('/save_projects', methods=['POST'])
def save_projects():
    data = request.json
    projects_collection.update_one({}, {'$set': {'projects': data}}, upsert=True)
    return jsonify({"message": "Projects saved successfully", "data": data}), 200

@app.route('/save_skills', methods=['POST'])
def save_skills():
    data = request.json
    skills = {
        'skills': data.get('skills', []),
        'languages': data.get('languages', []),
        'interests': data.get('interests', [])
    }
    skills_collection.update_one({}, {'$set': skills}, upsert=True)
    return jsonify({"message": "Skills data saved successfully", "data": skills}), 200

@app.route('/save_certificates', methods=['POST'])
def save_certificates():
    data = request.json
    certificates_collection.update_one({}, {'$set': {'certificates': data}}, upsert=True)
    return jsonify({"message": "Certificates saved successfully", "data": data}), 200

@app.route('/save_awards', methods=['POST'])
def save_awards():
    data = request.json
    awards_collection.update_one({}, {'$set': {'awards': data}}, upsert=True)
    return jsonify({"message": "Awards saved successfully", "data": data}), 200

@app.route('/save_extracurricular', methods=['POST'])
def save_extracurricular():
    data = request.json
    extracurricular_collection.update_one({}, {'$set': {'extracurricular': data}}, upsert=True)
    return jsonify({"message": "Extracurricular saved successfully", "data": data}), 200

@app.route('/save_volunteer_data', methods=['POST'])
def save_volunteer_data():
    data = request.json
    volunteer_collection.update_one({}, {'$set': {'volunteer_data': data}}, upsert=True)
    return jsonify({"message": "Volunteer data saved successfully", "data": data}), 200

@app.route('/save_description', methods=['POST'])
def save_description():
    data = request.json
    description_collection.update_one({}, {'$set': {'description': data.get('description', '')}}, upsert=True)
    return jsonify({"message": "Description saved successfully"}), 200

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    try:
        data = request.json
        personal_collection.update_one({}, {'$set': data.get('personal', {})}, upsert=True)
        work_collection.update_one({}, {'$set': {'work': data.get('work', [])}}, upsert=True)
        education_collection.update_one({}, {'$set': {'education': data.get('education', [])}}, upsert=True)
        projects_collection.update_one({}, {'$set': {'projects': data.get('projects', [])}}, upsert=True)
        skills_collection.update_one({}, {'$set': {
            'skills': data.get('skills', []),
            'languages': data.get('languages', []),
            'interests': data.get('interests', [])
        }}, upsert=True)
        certificates_collection.update_one({}, {'$set': {'certificates': data.get('certificates', [])}}, upsert=True)
        awards_collection.update_one({}, {'$set': {'awards': data.get('awards', [])}}, upsert=True)
        extracurricular_collection.update_one({}, {'$set': {'extracurricular': data.get('extracurricular', [])}}, upsert=True)
        volunteer_collection.update_one({}, {'$set': {'volunteer_data': data.get('volunteer_data', [])}}, upsert=True)
        description_collection.update_one({}, {'$set': {'description': data.get('description', '')}}, upsert=True)
        return jsonify({"message": "Resume data uploaded successfully", "data": data}), 200
    except Exception as e:
        return jsonify({"error": "Failed to upload resume data"}), 500

# Get endpoints
@app.route('/get_personal_info', methods=['GET'])
def get_personal_info():
    data = personal_collection.find_one({}, {'_id': 0})
    return jsonify({"personal": data if data else {}}), 200

@app.route('/get_work_experience', methods=['GET'])
def get_work_experience():
    data = work_collection.find_one({}, {'_id': 0, 'work': 1})
    return jsonify({"workExperiences": data.get('work', []) if data else []}), 200

@app.route('/get_education', methods=['GET'])
def get_education():
    data = education_collection.find_one({}, {'_id': 0, 'education': 1})
    return jsonify({"education": data.get('education', []) if data else []}), 200

@app.route('/get_projects', methods=['GET'])
def get_projects():
    data = projects_collection.find_one({}, {'_id': 0, 'projects': 1})
    return jsonify({"projects": data.get('projects', []) if data else []}), 200

@app.route('/get_skills', methods=['GET'])
def get_skills():
    data = skills_collection.find_one({}, {'_id': 0, 'skills': 1, 'languages': 1, 'interests': 1})
    return jsonify({
        "skills": data.get('skills', []) if data else [],
        "languages": data.get('languages', []) if data else [],
        "interests": data.get('interests', []) if data else []
    }), 200

@app.route('/get_certificates', methods=['GET'])
def get_certificates():
    data = certificates_collection.find_one({}, {'_id': 0, 'certificates': 1})
    return jsonify({"certificates": data.get('certificates', []) if data else []}), 200

@app.route('/get_awards', methods=['GET'])
def get_awards():
    data = awards_collection.find_one({}, {'_id': 0, 'awards': 1})
    return jsonify({"awards": data.get('awards', []) if data else []}), 200

@app.route('/get_extracurricular', methods=['GET'])
def get_extracurricular():
    data = extracurricular_collection.find_one({}, {'_id': 0, 'extracurricular': 1})
    return jsonify({"extracurricular": data.get('extracurricular', []) if data else []}), 200

@app.route('/get_volunteer_data', methods=['GET'])
def get_volunteer_data():
    data = volunteer_collection.find_one({}, {'_id': 0, 'volunteer_data': 1})
    return jsonify({"volunteer_data": data.get('volunteer_data', []) if data else []}), 200

@app.route('/get_description', methods=['GET'])
def get_description():
    data = description_collection.find_one({}, {'_id': 0, 'description': 1})
    return jsonify({"description": data.get('description', '') if data else ''}), 200

# Generate resume PDF
@app.route('/generate_resume', methods=['GET'])
def generate_resume():
    try:
        resume_data = {
            "personal": personal_collection.find_one({}, {'_id': 0}) or {},
            "work": work_collection.find_one({}, {'_id': 0, 'work': 1}).get('work', []),
            "education": education_collection.find_one({}, {'_id': 0, 'education': 1}).get('education', []),
            "projects": projects_collection.find_one({}, {'_id': 0, 'projects': 1}).get('projects', []),
            "skills": skills_collection.find_one({}, {'_id': 0, 'skills': 1}).get('skills', []),
            "languages": skills_collection.find_one({}, {'_id': 0, 'languages': 1}).get('languages', []),
            "interests": skills_collection.find_one({}, {'_id': 0, 'interests': 1}).get('interests', []),
            "certificates": certificates_collection.find_one({}, {'_id': 0, 'certificates': 1}).get('certificates', []),
            "awards": awards_collection.find_one({}, {'_id': 0, 'awards': 1}).get('awards', []),
            "extracurricular": extracurricular_collection.find_one({}, {'_id': 0, 'extracurricular': 1}).get('extracurricular', []),
            "volunteer_data": volunteer_collection.find_one({}, {'_id': 0, 'volunteer_data': 1}).get('volunteer_data', []),
            "description": description_collection.find_one({}, {'_id': 0, 'description': 1}).get('description', '')
        }

        with open(DATA_JSON_PATH, 'w') as f:
            json.dump(resume_data, f, indent=4)

        print(f"Saved data to {DATA_JSON_PATH}")

        compile_command = ['typst', 'compile', MAIN_TYP_PATH, PDF_OUTPUT_PATH]
        result = subprocess.run(compile_command, capture_output=True, text=True)

        if result.returncode != 0:
            print("Compilation failed with the following error:")
            print(result.stderr)
            return jsonify({
                'status': 'error',
                'message': 'Compilation failed',
                'error': result.stderr
            }), 500

        return jsonify({'status': 'success', 'message': 'PDF generated successfully!'})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Download JSON data
@app.route('/download_json', methods=['GET'])
def download_json():
    try:
        resume_data = {
            "personal": personal_collection.find_one({}, {'_id': 0}) or {},
            "work": work_collection.find_one({}, {'_id': 0, 'work': 1}).get('work', []),
            "education": education_collection.find_one({}, {'_id': 0, 'education': 1}).get('education', []),
            "projects": projects_collection.find_one({}, {'_id': 0, 'projects': 1}).get('projects', []),
            "skills": skills_collection.find_one({}, {'_id': 0, 'skills': 1}).get('skills', []),
            "languages": skills_collection.find_one({}, {'_id': 0, 'languages': 1}).get('languages', []),
            "interests": skills_collection.find_one({}, {'_id': 0, 'interests': 1}).get('interests', []),
            "certificates": certificates_collection.find_one({}, {'_id': 0, 'certificates': 1}).get('certificates', []),
            "awards": awards_collection.find_one({}, {'_id': 0, 'awards': 1}).get('awards', []),
            "extracurricular": extracurricular_collection.find_one({}, {'_id': 0, 'extracurricular': 1}).get('extracurricular', []),
            "volunteer_data": volunteer_collection.find_one({}, {'_id': 0, 'volunteer_data': 1}).get('volunteer_data', []),
            "description": description_collection.find_one({}, {'_id': 0, 'description': 1}).get('description', '')
        }

        file_path = 'resume_data.json'
        with open(file_path, 'w') as json_file:
            json.dump(resume_data, json_file, indent=4)

        return send_file(file_path, as_attachment=True)

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Download ZIP file with PDF and JSON data
@app.route('/download_data', methods=['GET'])
def download_data():
    """API to download both resume.pdf and data.json as a ZIP file."""
    try:
        if not (os.path.exists(PDF_OUTPUT_PATH) and os.path.exists(DATA_JSON_PATH)):
            return jsonify({'status': 'error', 'message': 'Files not found'}), 404

        zip_buffer = BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
            zip_file.write(PDF_OUTPUT_PATH, arcname='resume.pdf')
            zip_file.write(DATA_JSON_PATH, arcname='data.json')

        zip_buffer.seek(0)

        return send_file(
            zip_buffer,
            as_attachment=True,
            download_name='resume_package.zip',
            mimetype='application/zip'
        )

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')

