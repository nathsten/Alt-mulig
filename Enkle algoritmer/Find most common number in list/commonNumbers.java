class commonNumbers {

    public static void main(String args[]){
        int[] tall = {5,2,4,6,7,2,1,2};
        System.out.println(sortNums((findCommonNumber(tall))));
    }

    public static int[][] findCommonNumber(int[] nums) {
        // float output;
        int[][] numberTimesFound = {};

        for(int i=0; i<nums.length; i++){
            int timesFound = 1;
            
            for(int j=0; j<nums.length; j++){
                if(nums[i] == nums[j] && i != j){
                    timesFound += 1;
                }
            }
            if(timesFound > 1){
                int[] CN = {nums[i], timesFound};
                int poss = numberTimesFound.length;
                numberTimesFound[poss] = CN;
            }
        }
        return numberTimesFound;
    }

    public static int sortNums(int[][] n) {
        int commonNumber = n[0][0];

        for(int i=0; i<n.length; i++){
            if(n[i][0] > commonNumber){
                commonNumber = n[i][0];
            }
        }
        return commonNumber;
    }
}