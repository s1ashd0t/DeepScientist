from flask import Flask, render_template, request, jsonify
import math
import time

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['POST'])
def get_data():
    if request.method == 'POST':
        data = request.get_json()
        value = int(data['value'])
        result = None
        start_time = time.time()
        # Edge cases
        if value == 1:
            result = 'neither'
        elif value == 2:
            result = 'prime'
        elif value % 2 == 0:
            result = 'composite'
        else:
            result = 'prime'
            max_divisor = int(math.sqrt(value)) + 1
            for i in range(3, max_divisor, 2):
                if value % i == 0:
                    result = 'composite'
                    break
        end_time = time.time()
        elapsed_time = end_time - start_time

        print(value, result)
        print(elapsed_time)
        return jsonify({'value': result, 'time': elapsed_time})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)