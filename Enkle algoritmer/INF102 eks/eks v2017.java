import java.util.ArrayList;

class oppg2{
    public static void main(String args[]){
        int[] tall = {3,8,2,5,1,7,4,10};
        System.out.println(sort(tall).toString());
    }

    private static ArrayList<String> sort(int[] a) {
        ArrayList<String> sorted = new ArrayList<>();
        ArrayList <String> kopi = new ArrayList<>();
        for(int i=0; i<a.length; i++){
            kopi.add(String.valueOf(a[i]));
        }
        while(kopi.size() != 0){
            String max = kopi.get(0);
            for(int i=0; i<kopi.size(); i++){
                if(Integer.parseInt(kopi.get(i)) < Integer.parseInt(max)){
                    max = kopi.get(i);
                }
            }
            sorted.add(max);
            kopi.remove(kopi.indexOf(max));
        }

        return sorted;
    }
}

class oppg1 {
    public static void main(String args[]) {
        int[] tallListe = {2,-1,-1,3,-4,-2};
        System.out.println(treeSumNotZero(tallListe));

    }

    private static int treeSumNotZero(int[] a) {
        int triplets = 0;
        String trip = "";

        for(int i=0; i<a.length; i++){
            for(int j=0; j<a.length; j++){
                for(int k=0; k<a.length; k++){
                    if(a[i] + a[j] + a[k] != 0 && a[i] + a[j] + a[k] > 0 && i!=j && j!=k && i!=k){
                        triplets += 1;
                        trip += a[i] + "," + a[j] + "," + a[k] + "|";
                        // Bare for å slippe å få så mange av den samme kobinasjonen.
                        j++; i++;
                    }
                }
            }
        }
        System.out.println(trip);
        return triplets;
    }
}