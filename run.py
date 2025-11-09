from flask import Flask, render_template

app = Flask(__name__, static_folder='web/static', template_folder='web/templates')

# Home route
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/sermons')
def sermons():
    return render_template('sermons.html')


@app.route('/giving')
def giving():
    return render_template('giving.html')

@app.route('/prayer')
def prayer():
    return render_template('prayer.html')

@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/community')
def community():
    return render_template('community.html')

@app.route('/chatroom')
def chatroom():
    return render_template('chatroom.html')

@app.route('/sermon-details/<int:sermon_id>')
def sermon_details(sermon_id):
    return render_template('sermonDetails.html', sermon_id=sermon_id)


if __name__ == '__main__':
    app.run(debug=True)
