from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['POST'])
def get_data():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        return data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)