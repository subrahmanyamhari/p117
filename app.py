# import the necessary modules
from flask import Flask , render_template , request , jsonify

# importing sentiment_analysis file as sa
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

# write a route for post request
@app.route('/predict-data' , methods = ['POST'])
def review():

    # extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get('text_data')

    # check if the customer_review is empty, return error
    if not review:

        return jsonify({'status' : 'error' , 
                        'message' : 'Empty response'})

    if review == "":
        return jsonify({
            "status": "error",

        })

    else:

        sentiment, emoji = sa.predict(review)
        print(review)
        return jsonify({'status':'success', 'prediction': sentiment, "emoji": emoji})


if __name__  ==  "__main__":
    app.run(debug = True)