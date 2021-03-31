// Calculates brightness using three RGB values. (Dark, high, perfect).
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

// Calculates how bright the image is, and adjusts, exposure, contrast, vibrance, whites, and blacks.
pub fn caluclate_exposure_fix(img_brightness: f64, mut xmp_data: Vec<Vec<String>>, rgb_data: Vec<Vec<i32>>) -> Vec<Vec<String>> {
    let exposure_change: f64 = (format!("{:.1}", 10 as f64 - img_brightness)).parse::<f64>().unwrap();
    println!("Exposure_change: {}", exposure_change);

    for i in 0..xmp_data.len(){
        if xmp_data[i][0] == "   crs:Exposure2012".to_string(){
            let curr_exp: f64 = (xmp_data[i][1]).replace("\"", "").parse::<f64>().unwrap();
            let new_exp: f64 = curr_exp + exposure_change;
            let mut change = String::new();
            change.push('\"');
            change.push_str(&new_exp.to_string());
            change.push('\"');
            xmp_data[i][1] = change;
        }
        else if xmp_data[i][0] == "   crs:Vibrance".to_string(){
            let curr_vib: f64 = (xmp_data[i][1]).replace("\"", "").parse::<f64>().unwrap();
            let mut new_vib: f64 = curr_vib + (exposure_change * -1 as f64);
            if exposure_change < 0 as f64{
                new_vib = new_vib * 100 as f64;
            }
            else {
                new_vib = new_vib * 50 as f64;
            }
            let mut change = String::new();
            change.push('\"');
            change.push_str(&new_vib.to_string());
            change.push('\"');
            xmp_data[i][1] = change;
        }
        else if xmp_data[i][0] == "   crs:Contrast2012".to_string(){
            let curr_contr: f64 = (xmp_data[i][1]).replace("\"", "").parse::<f64>().unwrap();
            let mut new_contr: f64 = curr_contr + exposure_change;
            if exposure_change < 0 as f64{
                new_contr = new_contr * 100 as f64;
            }
            else {
                new_contr = new_contr * 50 as f64;
            }
            let mut change = String::new();
            change.push('\"');
            change.push_str(&new_contr.to_string());
            change.push('\"');
            xmp_data[i][1] = change;
        }
        else if xmp_data[i][0].to_string() == "   crs:Whites2012"{
            let curr_white: f64 = (xmp_data[i][1]).replace("\"", "").parse::<f64>().unwrap();
            let mut new_white: f64 = curr_white + exposure_change;
            if exposure_change < 0 as f64{
                new_white = new_white * 70 as f64;
            }
            else {
                new_white = new_white * 35 as f64;
            }
            if rgb_data[1][0] > 250 && rgb_data[1][1] > 250 && rgb_data[1][2] > 250  {
                new_white = new_white * 2.5;
            }
            let mut change = String::new();
            change.push('\"');
            change.push_str(&new_white.to_string());
            change.push('\"');
            xmp_data[i][1] = change;
        }
        else if xmp_data[i][0].to_string() == "   crs:Blacks2012"{
            let curr_black: f64 = (xmp_data[i][1]).replace("\"", "").parse::<f64>().unwrap();
            let mut new_black: f64 = curr_black + exposure_change;
            if exposure_change < 0 as f64{
                new_black = new_black * 70 as f64;
            }
            else {
                new_black = new_black * 35 as f64;
            }
            let mut change = String::new();
            change.push('\"');
            change.push_str(&new_black.to_string());
            change.push('\"');
            xmp_data[i][1] = change;
        }

    }

    xmp_data
}