use std::io;
use std::fs;

fn parse_xmp_data(file: String) -> Vec<Vec<String>> {
    println!("Parsing xmp data...");

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
            setting_value.push(sv.to_string());
        }

        xmp_data.push(setting_value);
    }

    xmp_data
}

pub fn get_img() -> Vec<Vec<String>> {
    println!("Enter full directory link to the .xmp file: ");
    let mut file_name = String::new();
    io::stdin().read_line(&mut file_name).expect("File not found!");

    if let Some('\n')=file_name.chars().next_back() {
        file_name.pop();
    }
    if let Some('\r')=file_name.chars().next_back() {
        file_name.pop();
    }

    println!("\nSearching for {} ...", file_name);

    let read_file = fs::read_to_string(file_name).expect("Could not read file\n");
    println!(".xmp File found\n{:?}", read_file);

    let xmp_data = String::from(read_file);

    let parsed_xmp_data: Vec<Vec<String>> = parse_xmp_data(xmp_data);
    parsed_xmp_data
}