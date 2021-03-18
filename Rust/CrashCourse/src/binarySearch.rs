pub fn binarySearch(list: Vec<i32>, val: i32) -> usize {
    let mut low = 0;
    let mut high = list.len();
    let mut mid = (high + low) / 2;
    let mut att: i8 = 0;

    while low <= high {
        if list[mid] > val{
            high = mid - 1;
            mid = (high + low) / 2;
        }
        else if list[mid] < val{
            low = mid+1;
            mid = (high + low) / 2;
        }
        else {
            println!("Attempts: {}", att);
            return mid
        }
        att+=1;
    }
    
    return 1;
}