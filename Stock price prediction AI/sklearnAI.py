import requests
import json
from sklearn import tree

def getAndTrain():
  response = requests.get('https://raw.githubusercontent.com/nathsten/Alt-mulig/main/Stock%20price%20prediction%20AI/testfile.json')
  allData = response.json()
  data = allData["data"]
  # print(data)

  labels = []
  output = []

  for i in range(0, len(data)-1, 1):
    o = int(data[i]["open"])
    h = int(data[i]["high"])
    l = int(data[i]["low"])
    c = int(data[i]["close"])

    labels.append([o,h,l])
    output.append(c)

  newSet = [int(data[99]["open"]), int( data[99]["high"]), int(data[99]["low"])]

  clf = tree.DecisionTreeClassifier()
  clf = clf.fit(labels, output)
  prob = clf.predict([newSet])

  return prob

print(getAndTrain())