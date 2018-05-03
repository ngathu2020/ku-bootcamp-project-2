from flask import Flask, render_template, jsonify, redirect, request, send_from_directory
from lxml import html
from bs4 import BeautifulSoup as bs
from bson.json_util import dumps
from re import sub
from decimal import Decimal

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
        
    price_listing = []
    bedroom_listing = []
    bathroom_listing = []
    sqft_listing = []
    description_listing = []

    for index, value in enumerate(price):

        
        try:
            price_value = int('{:.0f}'.format(Decimal(sub(r'[^\d.]', '', value.text))))
            print("price = ", price_value)
            price_listing.append(price_value)
        except:
            print("price data error")
            price_value = 0

        info_value = info[index].text.split(" ")
        print(len(info_value))

        try:
            bedroom_count = int(float(info_value[0].split(" ")[0]))  
            print("bed rooms = ", bedroom_count)
            bedroom_listing.append(bedroom_count)
        except:
            print("bedroom data error")
            bedroom_count = 0

        try:
            bathroom_count = int(info_value[3].split(" ")[0])  
            print("bath rooms = ", bathroom_count)
            bathroom_listing.append(bathroom_count)
        except:
            print("bathroom data error")
            bathroom_count = 0

        try:
            sqft_count = int('{:.0f}'.format(Decimal(sub(r'[^\d.]', '', info_value[6].split(" ")[0]))))  
            print("sqft = ", sqft_count)
            sqft_listing.append(sqft_count)
        except:
            print("sqft data error")
            sqft_count = 0

        description_listing.append(str(bedroom_count) + " bds " + str(bathroom_count) + " ba: " + address[index].text)

        each_listing = {"price": price_value, "bedroom": bedroom_count, "bathroom": bathroom_count, "sqft": sqft_count, "address": address[index].text}
        collection.insert_one(each_listing)


    data  = [{
        "x": price_listing,
        "y": sqft_listing,
        "mode": "markers",
        "text": description_listing,
        "marker": {
            "color": "rgb(219, 64, 82)",
            "size": 20,
            "line": {
                "color": "white",
                "width": 0.5
            }
        },
        "type": "scatter"
    }]

    return jsonify(data)




# calculate KC graduation rate in 2016
def get_graduation_rate():
    csv_path = os.path.join("data", "KCDataSet3.csv")
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


# build data for the plotly chart from Zillow housing data
@app.route("/zillow")
def get_data():
    city = "kansas-city_rb"
    return get_zillow_data(city)




@app.route('/<path:path>')
def send_static_file(path):
    return send_from_directory("", path)



if __name__ == "__main__":
    app.run(debug=True)

  