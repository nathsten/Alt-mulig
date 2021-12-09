use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sey_hello(name: &str) -> String {
    return format!("Hello {}!", name);
}

#[wasm_bindgen]
pub fn find_biggest(nums: Vec<i32>) -> i32 {
    let mut max: i32 = nums[0];
    for n in nums.iter(){
        if n > &max {
            max = *n;
        }
    }
    return max;
}