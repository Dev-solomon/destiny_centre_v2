from flask import Flask, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# You can add more routes for other pages later
@app.route('/sermons')
def sermons():
    return render_template('sermons.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
