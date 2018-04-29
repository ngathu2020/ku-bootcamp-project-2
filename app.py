from flask import Flask, request, send_from_directory
app = Flask(__name__)

def zillow_data():
    api_key = "X1-ZWz1gd7cng5897_634pb"
    return api_key


@app.route("/")
def home():
    return send_from_directory("templates", "index.html")


@app.route('/<path:path>')
def send_static_file(path):
    return send_from_directory("", path)



if __name__ == "__main__":
  app.run(debug=True)

  