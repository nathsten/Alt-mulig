#[allow(unused_variables)]
use std::vec;

pub fn formatting() {
    // Formattimg strings and numbers.
    println!("Number: {0} string: {1}, hey again: {1}!", 123, "Hey");
    // Alternative way:
    println!("{name} like to play {sport}", name = "John", sport = "football");

    // Praceholder traits:
    println!("Binary: {:b} Hex: {:x} Octal: {:o}", 100, 10, 10);

    // Placeholder for debugging:
    println!("Debug: {:?}", (12, false, [1,2,3]));    
}

pub fn variables() {
    // Decleare variables:
    // constant by default
    let a = "constant variable";
    // mut = mutable. 
    let mut b = "varrying variable";
    println!("{:?}", (a,b)); // Prints ("constant variable", "varrying variable")
    b = "12";
    println!("{}",b); // Prints 12;

    // Decleare constants
    // When using constants, must decleare data-type
    // i:32 = integer of 32 bits;
    const ID: i32 = 1001;
    println!("ID: {}", ID);

    let (a, b, c ) = ("a", 18, "d");
    println!("{:?}", (a,b,c)); // Prints: ("a", 18, "d");
}

pub fn dataTypes() {
    // Default i32 (integer 32-bits)
    // let _variableName = can be unused.
    let _a = 1;

    // Default f64 (float 64-bits):
    let _b = 2.5;
    
    // Constant float
    const FLOAT: f32 = 1.666667;

    // Check max of data type:
    print!("Max of i64: {}\n", std::i32::MAX); // Prints: Max of i64: 2147483647

    // All constanst should be UPPERCASE
    const STILL_LEARNING: bool = true;

    println!("{}", STILL_LEARNING);

    // chars
    let _ch1: char = 'a';

    // \u{1F600} = unicode for emoji...
    let smiley = '\u{1F600}';
    println!("Smile! {}", smiley);
}

pub fn strings() {
    // Primitive string, immutable fixed-length. Type: &str
    let _prstr = "Hello";

    // String (normalString), growable, heap-allowcated data structure. Type: std::string::String
    let mut _norStr = String::from("Hello ");

    // String.push(char)
    _norStr.push('W');

    // Pushed whole string.
    _norStr.push_str("orld!");
    
    print!("Primitive string: {0}, String: {1}, length of String: {2}.", _prstr, _norStr, _norStr.len()); // Length of String:

    // Capasity
    println!(" Capasity of a string: {}", _norStr.capacity());

    // Loop trough string:
    for word in _norStr.split_whitespace(){
        print!("{}", word)
    }
    print!("\n");

    // Create a string with the capacity of 4.
    let mut s = String::with_capacity(4);
    s.push('a');

    // Assertion testing, ceck if left = right
    assert_eq!(12, _norStr.len()); // Prints: thread 'main' panicked at 'assertion failed: `(left == right)` if left != right.
}

// Tuples group togheter values of different types
// Max length 12 elements.
pub fn tuples() {
    // Kind of like a class.
    let person: (&str, &str, i16) = ("Joe", "Biden", 78);

    println!("The president of the USA is {} {}, and he is {} years old!", person.0, person.1, person.2);
}

// Fixed list with all the same data-types.
pub fn arrays() {

    // Declare type (integer 32 bits, length of 5).
    // Making it mutable
    let mut nums: [i32; 6] = [1,2,3,4,5,6];

    // Print the whole array, use debug method {:?}
    println!("New array: {:?}", (nums));

    // Change value:
    nums[2] = 8;
    println!("Changed array: {:?}", nums);

    // Get how much memory it takes up.
    println!("Bytes: {}", std::mem::size_of_val(&nums)); // Prints: Bytes: 24

    // Get a slice of the array
    let slice: &[i32] = &nums[0..2];

    println!("Slice: {:?}", slice); // Prints: Slice: [1, 2]

    // Basic for lopp to find largest element in array
    let mut max: i32 = nums[0];
    for i in 0..nums.len(){
        if nums[i] > max {
            max = nums[i];
        }
    }
    println!("Max: {}", max);
}

// Vectors are resizeble arrays.
// Works the same way as an array with indexes, bytes, length, slices...
pub fn vectors() {
    // Deffine a vector. Vec<Type> = vec![]
    let mut nums: Vec<i32> = vec![2,4,6,8,10];
    // Add on to vector.
    nums.push(12);
    println!("{:?}", nums);

    // Loop and mutate values. Same as Array.map() in JS
    for num in nums.iter_mut() {
        // element in array needs to start with * before change.
        *num += 2;
    }

    println!("{:?}", nums);
}

pub fn functions() {

    // Closure function.
    let summer = |n1: i32, n2: i32| n1 + n2;
    println!("Sum of 3 and 7: {}", summer(3, 7)); // Prints Sum of 3 and 7: 10.

    println!("{}", greeting("John"));

    fn greeting(name: &str) -> String{
        let mut a = String::from("Nice to meet you");
        let b = name;
        a.push(' ');
        a.push_str(b);
        return a
    }
}

pub fn structs() {
    // Tratidional Struct
    struct Color {
        r: u8,
        g: u8,
        b: u8
    }

    // New Color, just like a Class in JS.
    let mut c = Color{
        r: 221,
        g: 21,
        b: 225
    };

    c.b = 255;

    println!("Color: {} {} {}", c.r, c.g, c.b);

    // Tuple struct. A struct with varrying data types
    struct Person1(String, String, u8);

    let mut p1 = Person1(String::from("Jon"), String::from("Doe"), 40);
    p1.2 = 41;
    println!("Person: {} {} {}", p1.0, p1.1, p1.2);

    struct Person{
        firstName: String,
        lastName: String
    };

    impl Person{
        // Constructor function for Person
        fn newPerson(first: &str, last: &str) -> Person{
            // Makes it to a normal string
            let f = String::from(first);
            // Makes it to a normal string
            let l = last.to_string();
            // Returns a new Person.
            Person{
                firstName: f,
                lastName: l
            }
        }

        // Function that returns the full name:
        fn fullName(&self) -> String{ // Returns String
            format!("{} {}", self.firstName, self.lastName) // Does not end with ";" because it returns,
        }
    }

    let p = Person::newPerson("John", "Doe");
    println!("New Person: {} {}", p.firstName, p.lastName);
    println!("Fullname: {}", p.fullName());
}

// Types with a few definete values
pub fn enums() {
    // New enum
    enum Movement {
        // Variants
        Up,
        Down,
        Left,
        Right
    }

    fn move_avatar(m: Movement) {
        // Preform action depending on parameter
        match m {
            Movement::Up => println!("Move Up"),
            Movement::Down => println!("Move Down"),
            Movement::Left => println!("Move Left"),
            Movement::Right => println!("Move Right")
        };
    }

    let newAvatar1 = Movement::Left;
    let _newAvatar2 = Movement::Right;
    let _newAvatar3 = Movement::Up;
    let _newAvatar4 = Movement::Down;

    move_avatar(newAvatar1);
}

// Get client info from rust command-line
use std::env;
pub fn cli(){
    let args: Vec<String> = env::args().collect();

    
    // Compiled like: cargo run hello ->  ["target/debug/CrashCourse", "hello"]
    println!("Args: {:?}", args);
    
    // Cloning 1st value of args Vector
    let command = args[1].clone();
    println!("Command: {}", command); // Prints hello.

}