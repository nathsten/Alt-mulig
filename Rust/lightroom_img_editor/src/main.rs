mod get_img;

fn main(){
    let parsed_xmp_data: Vec<Vec<String>> = get_img::get_img();
    println!("{:?}", parsed_xmp_data);
}
