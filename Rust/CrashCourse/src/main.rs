#![allow(non_snake_case)]
#[allow(dead_code)]
mod all;
mod binarySearch;

fn main() {
    let sortedList: Vec <i32> = vec![1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51];
    let val: i32 = 37;
    let index: usize = binarySearch::binarySearch(sortedList, val);
    println!("Index of {} in sortedList is: {}", val, index);
    all::formatting();
    all::variables();
    all::dataTypes();
    all::strings();
    all::tuples();
    all::arrays();
    all::vectors();
    all::functions();
    all::structs();
    all::enums();
    all::cli();

    let mut s = String::new();
    std::io::stdin().read_line(&mut s).expect("error");
    println!("You typed: {}",s);
}
