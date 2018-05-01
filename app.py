from flask import Flask, render_template, jsonify, redirect, request, send_from_directory
from lxml import html
from bs4 import BeautifulSoup as bs
from bson.json_util import dumps

import requests
import json
import pymongo
import pandas as pd
import numpy as np
import csv
import os
import io


app = Flask(__name__)

# search for house for sale in the provided city 
# example kansas-city_rb, overland-park_rb
def get_zillow_data(city):

    # use Mongo db   
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.zillow
    collection = db.listings
    # remove old zillow data
    collection.drop()
    collection = db.listings

    # set valid request headers
    req_headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }

    # get data from this url
    with requests.Session() as s:
        url = 'https://www.zillow.com/homes/for_sale/' + city + '/?fromHomePage=true&shouldFireSellPageImplicitClaimGA=false&fromHomePageTab=buy'
        r = s.get(url, headers=req_headers)
        # display return code 200=good
        print(r)

    # scrape the content 
    soup = bs(r.content, 'lxml')
    price = soup.find_all('span', {'class': 'zsg-photo-card-price'})
    info = soup.find_all('span', {'class': 'zsg-photo-card-info'})
    address = soup.find_all('span', {'itemprop': 'address'})
        
    listing_str = ""
    count = 0
    for index, value in enumerate(price):
        # build the row
        each_listing = {"price": value.text, "info": info[index].text, "address": address[index].text}
        # write each row to the Mongo db        
        collection.insert_one(each_listing)
        # accumulate listings received
        print(type(each_listing))

        to_str = ''.join('{}{}'.format(key, val) for key, val in each_listing.items())     
        listing_str = listing_str + to_str
        
        # accumulate listing count
        count = count + 1

        print(each_listing)
        
    #display number of listing
    print(count)
    print(listing_str)

    return listing_str


# calculate KC graduation rate in 2016
def get_graduation_rate():
    csv_path = os.path.join("data", "KCDataSet.csv")
    kcdata = pd.read_csv(csv_path)
    kcdata = kcdata.replace(0, np.NaN)
    graduation_rate = kcdata["Graduation Rate"].mean()
    rate = "%.2f" % round(graduation_rate,2)
    return rate



# home page
@app.route("/")
def home():
    return send_from_directory("templates", "index.html")


# get graduation rate for the dashboard
@app.route("/dashboard")
def dashboard_data():
    return get_graduation_rate()


#get new zillow data
@app.route("/zillow")
def get_zillow():
    city = "kansas-city_rb"
    return get_zillow_data(city)


# build data for the plotly line chart of Zillow housing data
@app.route("/line")
def get_line_data():
    data = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17]
    }

    # var line2 = {
    #     x: [1, 2, 3, 4],
    #     y: [16, 5, 11, 9],
    #     type: 'scatter'
    # }

    # var data = [line1, line2]

    return jsonify(data)


@app.route('/<path:path>')
def send_static_file(path):
    return send_from_directory("", path)



if __name__ == "__main__":
    app.run(debug=True)

  