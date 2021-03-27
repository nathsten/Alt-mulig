// testfile: metadata/DSC_7867.xmp
// test RGB values from testfile: 
// 63.83.118,250.251.251,156.159.151

use std::io;
mod get_img;
mod filter_data;
mod calculations;
mod update_metadata;
mod presets;

fn main(){
    println!("\nEnter full directory link to the .xmp file: ");
    let mut file_name = String::new();
    // Read user input
    io::stdin().read_line(&mut file_name).expect("File not found!");

    // If the userinput String ends with newline or tab, will be removed. 
    if let Some('\n')=file_name.chars().next_back() {
        file_name.pop();
    }
    if let Some('\r')=file_name.chars().next_back() {
        file_name.pop();
    }
    let parsed_xmp_data: Vec<Vec<String>> = get_img::get_img(file_name.clone());

    println!("{:?}", parsed_xmp_data);
    println!("\nFiltering .xmp data...\n");
    let necessary_xmp = filter_data::filter_edit_data(parsed_xmp_data.to_vec());
    let img_info = filter_data::filter_img_info(parsed_xmp_data.to_vec());

    println!("Necassary info: {:?}\n", necessary_xmp);
    println!("Img info: {:?}", img_info);

    let rgb_data: Vec<Vec<i32>> = get_img::get_rgb_data();

    println!("\nRGB data: {:?}", rgb_data);

    let img_brightness: f64 = calculations::calculate_brightness(rgb_data);
    println!("\nImg brightness: {}", img_brightness);

    let xmp_data_exposure_fix: Vec<Vec<String>> = calculations::caluclate_exposure_fix(img_brightness, necessary_xmp.to_vec());
    println!("Updated exposure XMP: {:?}", xmp_data_exposure_fix);

    // Add a selection of the different image presets that client wants to be applied:
    println!("\nSelect a preset: type one of a-d");
    let xmp_data_preset_add: Vec<Vec<String>> = presets::select_preset(xmp_data_exposure_fix.to_vec());

    // Just for a test:
    let done = update_metadata::update_metadata(parsed_xmp_data.to_vec(), xmp_data_preset_add.to_vec(), file_name.clone());
    println!("Image editied: {:?}", done);
}
