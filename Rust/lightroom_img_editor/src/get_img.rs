use std::io;
use std::fs;

fn parse_xmp_data(file: String) -> Vec<Vec<String>> {
    println!("\nParsing xmp data...\n");

    let split_by_line = file.split("\n");
    let mut xmp_lines: Vec<String> = vec![];
    for line in split_by_line{
        xmp_lines.push(String::from(line));
    }

    let mut xmp_data: Vec<Vec<String>> = vec![];

    for line in xmp_lines{
        let split_by_equal = line.split("=");
        let mut setting_value: Vec<String> = vec![];

        for sv in split_by_equal{
            setting_value.push(sv.replace("\"", "").to_string());
        }

        xmp_data.push(setting_value);
    }

    xmp_data
}

pub fn get_img(file_name: String) -> Vec<Vec<String>> {

    println!("\nSearching for {} ...\n", file_name);

    // Reading the inserted file. 
    let read_file = fs::read_to_string(file_name).expect("Could not read file\n");
    println!("\n.xmp File found\n{:?}", read_file);

    let xmp_data = String::from(read_file);

    // Parsing the raw file to a 2d vector. 
    parse_xmp_data(xmp_data)
}

// Change to Vec<Vec<i32>>
pub fn get_rgb_data() -> Vec<Vec<i32>> {
    let mut rgb_data: Vec<Vec<i32>> = vec![];

    println!("\nEnter darkest, brightest, and perfect RGB value in the image spepperated by \",\"\nexample: \"68.119.87,255.237.248,187.199.137\"\nWhere the first 3 are the darkest values, second 3 are the brightest, \nand last 3 are the perfect values from a perfect spot in the image.");

    let mut low_rgb = String::new();
    io::stdin().read_line(&mut low_rgb).expect("Invalid RGB");
    if let Some('\n')=low_rgb.chars().next_back(){low_rgb.pop();};
    if let Some('\r')=low_rgb.chars().next_back(){low_rgb.pop();};

    let arr_low_rgb = low_rgb.split(",");

    for rgb in arr_low_rgb{
        let split_by_dot = rgb.split(".");
        let mut nums: Vec<i32> = vec![];

        for r_g_b in split_by_dot{
            nums.push(r_g_b.parse::<i32>().unwrap());
        }

        rgb_data.push(nums.to_vec());
    }

    rgb_data
}