from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector

app = Flask(__name__)
CORS(app)

connection = mysql.connector.connect(
    host='localhost',
    database='globowave',
    user='root',
    password='surya123'
)

@app.route('/employees', methods=['GET'])
def listemployees():
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM employees order by id desc")
        results = cursor.fetchall()
        cursor.close()
        return jsonify(results)
    except mysql.connector.Error as error:
        return jsonify({"error": str(error)})

@app.route('/employeesdetails/<int:id>', methods=['GET'])
def employees(id):
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM employees WHERE id = %s", (id,))
        result = cursor.fetchone()
        cursor.close()
        if result:
            return jsonify([result])
        else:
            return jsonify({"error": "No data found for the given id"})
    except mysql.connector.Error as error:
        return jsonify({"error": str(error)})

@app.route('/empupdate/<int:id>', methods=['PUT'])
def empupdate(id):
    try:
        data = request.json
        firstName  = data.get('firstName')
        lastName = data.get('lastName')
        dateOfBirth = data.get('dateOfBirth')
        phoneNumber = data.get('phoneNumber')
        address = data.get('address')
        city = data.get('city')
        pincode = data.get('pincode')
        finalQualification = data.get('finalQualification')
        yearOfPassing = data.get('yearOfPassing')
        joiningDate = data.get('joiningDate')

        cursor = connection.cursor()
        cursor.execute("SELECT id FROM employees WHERE (phoneNumber = %s OR (firstName = %s AND lastName = %s ))AND id != %s", (phoneNumber, firstName,lastName, id,))
        existing_employee = cursor.fetchone()
        if existing_employee:
            return jsonify({"error": "Employee with the same phone number or first name and lastname already exists."}), 400
        
        cursor.callproc('spUpdateEmployees', [id, firstName , lastName, dateOfBirth, phoneNumber, address, city, pincode, finalQualification, yearOfPassing, joiningDate])
        connection.commit()
        print("Stored procedure executed successfully!")

        return jsonify({"message": "Employee Data Updated successfully"})
    except mysql.connector.Error as error:
        print(f"Error executing stored procedure: {error}")
        return jsonify({"error": str(error)})


@app.route('/empdelete/<int:id>', methods=['DELETE'])
def empdelete(id):
    try:
        cursor = connection.cursor()
        cursor.callproc('spDeleteEmployees', [id])
        connection.commit()
        print("Stored procedure executed successfully!")

        return jsonify({"message": "Employee Data Deleted successfully"})
    except mysql.connector.Error as error:
        print(f"Error executing stored procedure: {error}")
        return jsonify({"error": str(error)})

@app.route('/submit_form', methods=['POST'])
def submit_form():
    try:
        data = request.json
        # Extract form data
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        dateOfBirth = data.get('dateOfBirth')
        phoneNumber = data.get('phoneNumber')
        address = data.get('address')
        city = data.get('city')
        pincode = data.get('pincode')
        finalQualification = data.get('finalQualification')
        yearOfPassing = data.get('yearOfPassing')
        joiningDate = data.get('joiningDate')

        cursor = connection.cursor()

        cursor.execute("SELECT * FROM employees WHERE phoneNumber = %s OR (firstName = %s AND lastName = %s)",  (phoneNumber,firstName, lastName,))
        existing_employee = cursor.fetchone()
        if existing_employee:
            return jsonify({"error": "Employee with the same phone number or firstName & lastName already exists."}), 400

        cursor.callproc('spInsertEmployees', [firstName, lastName, dateOfBirth, phoneNumber, address, city, pincode, finalQualification, yearOfPassing, joiningDate])
        connection.commit()
        print("Stored procedure executed successfully!")

        return jsonify({"message": "Employee Data Inserted successfully"})
    except mysql.connector.Error as error:
        print(f"Error executing stored procedure: {error}")
        return jsonify({"error": str(error)})


if __name__ == '__main__':
    app.run(debug=True)