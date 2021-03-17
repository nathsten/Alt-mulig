import numbers
import json
import requests as req
import numpy
from requests.models import Response
import random

def main():
    getAllwords = req.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
    allWords = getAllwords.text
    wordList = parseText(allWords)
    gameOn = True
    charsLeft = splitString("abcdefghijklmopqrstuvwxyz")
    startChars = splitString("aemioun") # Add theese to the first 2-3 guessed chars
    usedChars = []
    attemtsLeft = 10
    print("Game ready!\n")
    length = int(input("How long is your word? "))
    wordList = filterLength(wordList, length)
    charsLeft = filterChars(wordList, usedChars)
    guessedWord = []
    for i in range(0, length):
        guessedWord.append("_")

    print(guessedWord)

    while gameOn:
        print("I have", attemtsLeft, "attemts left.\n")
        newGuess = guessChar(charsLeft)
        usedChars.append(newGuess)
        print("Does your word include the letter", newGuess, "? ")
        includes = str(input("(y/n) "))

        if(includes == "y"):
                indexes = []
                print("How many times does", newGuess, "appear in your word?")
                times = int(input("Times: "))

                for i in range(0, times, 1):
                    print("On what index does", newGuess, "nr",i+1, "lie on? (0 - ", length-1, ")")
                    pos = int(input("Index: "))
                    indexes.append(pos)
                
                for index in indexes:
                    guessedWord[index] = newGuess

                print("Is this correct? ", guessedWord)
                comfirm = str(input("(y/n) "))

                if(comfirm == "y"):
                    for index in indexes:
                        wordList = filterValue(wordList, newGuess, index)

                    charsLeft = filterChars(wordList, usedChars)
                
                elif comfirm == "n":
                    ## Fix this and ask for index again
                    break

        else:
            attemtsLeft-=1
            wordList = filterAllLetters(wordList, newGuess)
            charsLeft = filterChars(wordList, usedChars)

        if attemtsLeft == 0:
            print("\nI lost...\n")
            break
        
        if(checkFullWord(guessedWord)):
            word = joinWord(guessedWord)
            print("Is your word", word, "?")
            comfirm = str(input("(y/n) "))
            if(comfirm == "y"):
                print("\nI won!\n")
                break


def parseText(text: str):
    splitText = text.split("\n")
    wordList = []
    for word in splitText:
        wordList.append(word.split("\r")[0])

    return wordList

def filterValue(a: list[str], v: str, i: int):
    newList = []
    
    for word in a:
        if word[i] == v:
            newList.append(word)

    return newList

def filterLength(a: list[str], l: int):
    newList = []
    for word in a:
        if len(word) == l:
            newList.append(word)

    return newList

def filterAllLetters(words: list[str], v: str):
    newWordList = []
    for word in words:
        if v not in word:
            newWordList.append(word)

    return newWordList

def guessChar(chars: list[str]):
    rand = random.randint(0, len(chars)-1)
    return chars[rand]


def filterChars(wordList: list[str], used: list[str]):
    newChars = []

    for word in wordList:
        letters = splitString(word)
        for l in letters:
            if(l not in newChars and l not in used):
                newChars.append(l)

    return newChars


def splitString(s: str) -> list[str]:
    splitted = []
    for i in range(0, len(s), 1):
        splitted.append(s[i])
    
    return splitted

def checkFullWord(word: list[str]):
    guessed = True
    for l in word:
        if l == "_":
            guessed = False

    return guessed


def joinWord(word: list[str]):
    fullWord = ""
    for l in word:
        fullWord += l

    return fullWord

print("\nStarting new game...\n")
main();