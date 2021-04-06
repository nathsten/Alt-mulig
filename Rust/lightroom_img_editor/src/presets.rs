use std::io;

pub fn select_preset(xmp_data_exposure_fix: Vec<Vec<String>>, img_brightness: f64) -> Vec<Vec<String>>{
    println!("a) teal \t b) summer \t c) winter \t d) autumn\n");
    let mut preset = String::new();
    io::stdin().read_line(&mut preset).expect("error with preset input");
    if let Some('\n')=preset.chars().next_back() {
        preset.pop();
    }
    if let Some('\r')=preset.chars().next_back() {
        preset.pop();
    }

    let exposure_change: f64 = (format!("{:.1}", 10 as f64 - img_brightness)).parse::<f64>().unwrap();

    if preset == "a".to_string(){
        println!("Editing Teal");
        return teal(xmp_data_exposure_fix, exposure_change);
    }
    else if preset == "b".to_string(){
        return summer(xmp_data_exposure_fix, exposure_change);
    }
    else if preset == "c".to_string(){
        return winter(xmp_data_exposure_fix, exposure_change);
    }
    else if preset == "b".to_string(){
        return autumn(xmp_data_exposure_fix, exposure_change);
    }

    xmp_data_exposure_fix
}

// mod util;

/**
 * Temperature + exposure diff * 100
 * HueAdjustmentBlue - exposure diff * 50
 * SaturationAdjustmentBlue + exposure diff * 40
 * HueAdjustmentGreen - exposure diff * 150
 * HueAdjustmentOrange - exposure diff * 50
 */
pub fn teal(mut xmp_data_exposure_fix: Vec<Vec<String>>, exposure_diff: f64) -> Vec<Vec<String>>{
    let mut i: usize = 0;
    // exposure_diff = util::max(exposure_diff, 0.3 as f64);
    while i < xmp_data_exposure_fix.len(){
        if xmp_data_exposure_fix[i][0] == "   crs:Temperature".to_string(){
            let mut new_temp = exposure_diff * 400 as f64;
            if new_temp < 0 as f64 { new_temp = new_temp * -1 as f64; }

            let curr_temp = (xmp_data_exposure_fix[i][1].replace("\"", "")).parse::<f64>().unwrap();
            new_temp = curr_temp + new_temp;

            let mut new_temp_str = String::new();
            new_temp_str.push('\"');
            new_temp_str.push_str(&new_temp.to_string());
            new_temp_str.push('\"');
            xmp_data_exposure_fix[i][1] = new_temp_str;
        }
        else if xmp_data_exposure_fix[i][0] == "   crs:HueAdjustmentBlue".to_string(){
            let mut new_blue_hue = exposure_diff * 50 as f64;
            if new_blue_hue > 0 as f64 { new_blue_hue = new_blue_hue * -1 as f64; }

            let curr_blue_hue = (xmp_data_exposure_fix[i][1].replace("\"", "")).parse::<f64>().unwrap();
            new_blue_hue = curr_blue_hue + new_blue_hue;
            
            let mut new_blue_hue_str = String::new();
            new_blue_hue_str.push('\"');
            new_blue_hue_str.push_str(&new_blue_hue.to_string());
            new_blue_hue_str.push('\"');
            xmp_data_exposure_fix[i][1] = new_blue_hue_str;
        }
        else if xmp_data_exposure_fix[i][0] == "   crs:SaturationAdjustmentBlue".to_string(){
            let mut new_blue_sat = exposure_diff * 40 as f64;
            if new_blue_sat < 0 as f64 { new_blue_sat = new_blue_sat * -1 as f64; }

            let curr_blue_sat = (xmp_data_exposure_fix[i][1].replace("\"", "")).parse::<f64>().unwrap();
            new_blue_sat = curr_blue_sat + new_blue_sat;

            let mut new_blue_sat_str = String::new();
            new_blue_sat_str.push('\"');
            new_blue_sat_str.push_str(&new_blue_sat.to_string());
            new_blue_sat_str.push('\"');
            xmp_data_exposure_fix[i][1] = new_blue_sat_str;
        }
        else if xmp_data_exposure_fix[i][0] == "   crs:HueAdjustmentGreen".to_string(){
            let mut new_green_hue = exposure_diff * 150 as f64;
            if new_green_hue > 0 as f64 { new_green_hue = new_green_hue * -1 as f64; }

            let curr_green_hue = (xmp_data_exposure_fix[i][1].replace("\"", "")).parse::<f64>().unwrap();
            new_green_hue = curr_green_hue + new_green_hue;

            let mut new_green_hue_str = String::new();
            new_green_hue_str.push('\"');
            new_green_hue_str.push_str(&new_green_hue.to_string());
            new_green_hue_str.push('\"');
            xmp_data_exposure_fix[i][1] = new_green_hue_str;
        }
        else if xmp_data_exposure_fix[i][0] == "   crs:HueAdjustmentOrange".to_string(){
            let mut new_orange_hue = exposure_diff * 50 as f64;
            if new_orange_hue > 0 as f64 { new_orange_hue = new_orange_hue * -1 as f64; }

            let curr_orange_hue = (xmp_data_exposure_fix[i][1].replace("\"", "")).parse::<f64>().unwrap();
            new_orange_hue = curr_orange_hue + new_orange_hue;
            
            let mut new_orange_hue_str = String::new();
            new_orange_hue_str.push('\"');
            new_orange_hue_str.push_str(&new_orange_hue.to_string());
            new_orange_hue_str.push('\"');
            xmp_data_exposure_fix[i][1] = new_orange_hue_str;
        }
        i += 1;
    }

    xmp_data_exposure_fix
}

pub fn summer(xmp_data_exposure_fix: Vec<Vec<String>>, _exposure_diff: f64) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}

pub fn winter(xmp_data_exposure_fix: Vec<Vec<String>>, _exposure_diff: f64) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}

pub fn autumn(xmp_data_exposure_fix: Vec<Vec<String>>, _exposure_diff: f64) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}