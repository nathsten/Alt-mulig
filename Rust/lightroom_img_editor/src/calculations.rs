pub fn calculate_brightness(rgb_data: Vec<Vec<i32>>) -> f64 {
    let mut sum: i32 = 0;

    for rgb in rgb_data{
        let mut rgb_sum: i32 = 0;
        for n in rgb{
            rgb_sum = rgb_sum + n;
        }
        sum = sum + (rgb_sum)/3;
    }

    (sum/3) as f64 / 15.8
}

pub fn caluclate_exposure_fix(img_brightness: f64, mut xmp_data: Vec<Vec<String>>) -> Vec<Vec<String>> {
    let exposure_change: f64 = (format!("{:.1}", 10 as f64 - img_brightness)).parse::<f64>().unwrap();
    println!("Exposure_change: {}", exposure_change);

    for i in 0..xmp_data.len(){
        if xmp_data[i][0] == "   crs:Exposure2012".to_string(){
            let curr_exp: f64 = (xmp_data[i][1]).parse::<f64>().unwrap();
            let new_exp: f64 = curr_exp + exposure_change;
            xmp_data[i][1] = new_exp.to_string();
        }
    }

    xmp_data
}

// 63.83.118,250.251.251,156.159.151