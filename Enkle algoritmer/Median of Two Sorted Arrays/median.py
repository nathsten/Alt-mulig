class Solution(object):
    def findMedianSortedArrays(self, nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """
        tall = nums1 + nums2
        alleTall = sorted(tall)
        output = []
        median = len(alleTall)

        if ((median % 2) == 0):
            med = median/2
            med1 = int(med + 0.5)
            med2 = int(med - 0.5)
            regnMedian = float(alleTall[med1] + alleTall[med2]) / 2
            output = float(regnMedian)
        else:
            med = int(median/2)
            finnMedian = alleTall[med]
            output = float(finnMedian)

        return output

    print(findMedianSortedArrays(0, [1,3], [2,4]))