import java.util.Arrays;

class Solution {

    public static void main(String args[]){
        int[] tall1 = {5,6,2,9};
        int[] tall2 = {3,8};
        System.out.println(findMedianSortedArrays(tall1, tall2));
    }

    public static float findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] tall1 = nums1;
        int[] tall2 = nums2;
        float output;

        int len1 = tall1.length;
        int len2 = tall2.length;

        int[] tallListe = new int[len1 + len2];

        System.arraycopy(tall1, 0, tallListe, 0, len1);
        System.arraycopy(tall2, 0, tallListe, len1, len2);

        Arrays.sort(tallListe);
        System.out.println(Arrays.toString(tallListe));
        
        int median = tallListe.length;

        if(median % 2 == 0){
            int med = median/2;
            int med1 = med-1;
            float regnMedian = (float) (tallListe[med] + tallListe[med1]) / 2;
            output = (float) regnMedian;
        }
        else{
            int med = median/2;
            int finnMedian = (tallListe[med]);
            output = (float) finnMedian;
        }
        
        return output;
    }
}