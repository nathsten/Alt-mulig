import math
import random

nums = [4,2,7,5,4,12,18]
target = int(9)

#Finner de som er etterhverandre.
def twoSumBasic(a, b):
    output = []
    for i in range(0, len(a), 1):
        j = i+1
        if j<7:
            if(a[i] + a[j] == b):
                output.append([[i,j], [a[i], a[j]]])
    return output
# print(twoSumBasic(nums, target))

#Finner de uansett rekkefølge
def rndNum():
    tall = random.randint(0,20)
    return tall

tallListe = [rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum(), rndNum()]

print("tallListe:")
print(tallListe)
print("----------------------------------------------")
print("Skriv inn target, mellom 1 og 20")
targetNum = int(input("target: "))

print("----------------------------------------------")
print("twosum resutat:")
def twoSumAdvanced(a, b):
    output = []
    for i in range(0, len(a), 1):
        for j in range(0, len(a), 1):
            if a[i] + a[j] == b:
                output.append([[i,j], [a[i], a[j]]])
    return output
print(twoSumAdvanced(tallListe, targetNum))