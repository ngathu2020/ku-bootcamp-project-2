from flask import Flask, render_template, jsonify, redirect, request, send_from_directory
from flask_pymongo import PyMongo
from lxml import html
from bs4 import BeautifulSoup
from sys import platform
from splinter import Browser

import requests
import unicodecsv as csv
import argparse


   
app = Flask(__name__)
mongo = PyMongo(app)



def zillow_data():
    city = "Kansas City"
    api_key = "X1-ZWz1gd7cng5897_634pb"
    queryURL = "http://www.zillow.com/webservice/GetZestimate.htm&zws-id=" + api_key;
    return api_key



@app.route("/")
def home():
    return send_from_directory("templates", "index.html")


@app.route("/zillow")
def get_zillow():
    mongo.db.zillow.drop()
    listings = mongo.db.zillow    
    listings_data = {}
    for listing in listings_data:
        listings.insert_one(listing)
    return redirect("/templates/page-housing.html#page-content", code=302)

# build data for the plotly line chart of Zillow housing data
@app.route("/line")
def get_line_data():
    data = [{
        "x": [1, 2, 3, 4, 5],
        "y": [1, 2, 4, 8, 16] }]
    return jsonify(data)


@app.route('/<path:path>')
def send_static_file(path):
    return send_from_directory("", path)



if __name__ == "__main__":
    app.run(debug=True)

  