from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
import math
import time
import os

load_dotenv()

api_key_r1 = os.getenv('API_KEY')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['POST'])
def get_data():
    if request.method == 'POST':
        data = request.get_json()
        value = data['value']

    client = OpenAI(
        base_url = "https://integrate.api.nvidia.com/v1",
        api_key = api_key_r1
    )

    completion = client.chat.completions.create(
        model="deepseek-ai/deepseek-r1",
        messages=[{"role":"user","content": value}],
        temperature=0.6,
        top_p=0.7,
        max_tokens=4096,
        stream=True
    )

    result = ""

    for chunk in completion:
        if chunk.choices[0].delta.content is not None:
            result += chunk.choices[0].delta.content
    return jsonify({'value': result})

@app.route('/api/prime', methods=['POST'])
def get_prime():
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