// testfile: metadata/DSC_7867.xmp

mod get_img;
mod filter_data;

fn main(){
    let parsed_xmp_data: Vec<Vec<String>> = get_img::get_img();
    println!("{:?}", parsed_xmp_data);
    println!("\nFiltering .xmp data...\n");
    let necessary_xmp = filter_data::filter_edit_data(parsed_xmp_data.to_vec());
    let img_info = filter_data::filter_img_info(parsed_xmp_data.to_vec());

    println!("Necassary info: {:?}\n", necessary_xmp);
    println!("Img info: {:?}", img_info);
}
