import math
import numpy

def searchRange(nums, target):
    indexes = []
    output = []
    nums.sort()
    
    if target not in nums:
        output.append(-1)
        output.append(-1)
    else:
        for i in range(0, len(nums), 1):
            if nums[i] == target:
                indexes.append(i)

        output.append(indexes[0])
        a = len(indexes)
        output.append(a)
    

    return output

numbers = [4,7,1,6,9,5,3,5,6,8,3,5,6,3,2,5,7,8,6,3,2,4,5,4,6,7,6]
print(searchRange(numbers, 6))
