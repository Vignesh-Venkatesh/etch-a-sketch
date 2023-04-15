import random as r
import math

letters = ['a','b','c','d','e','f']
numbers = ['0','1','2','3','4','5','6','7','8','9']

print("[")
for i in range(0,100):
    color = "'#"+r.choice(letters)+r.choice(numbers)+r.choice(numbers)+r.choice(letters)+r.choice(numbers)+r.choice(letters)+"',"
    print(color)
print("]")