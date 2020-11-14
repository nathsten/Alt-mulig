import java.util.Arrays;

public class twoSum{
    public static void main(String[] args){
        int[] tallListe = {4,1,12,2,6,5,2,7,11,8,3};

        System.out.println(twoSumAlgo(tallListe));
    }

    public static String twoSumAlgo(int[] tall) {
        int[] output = {};
        int target = 9;

        for(int i=0; i<tall.length; i++){
            for(int j=0; j<tall.length; j++){
                if(tall[i]+tall[j] == target){
                    output = Arrays.copyOf(output, output.length+2);
                    output[output.length - 2] = tall[i];
                    output[output.length - 1] = tall[j];
                }
            }
        }
        return Arrays.toString(output);
    }
}