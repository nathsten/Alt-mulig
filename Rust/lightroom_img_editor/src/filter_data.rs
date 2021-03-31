// ISO = (log(PS_ISO / img_ISO))/log(2)
// ShutterSpeed = (log(PS_SS / img_SS))/log(2)
// Aperture = (log(PS_APT/ img_APT) / log(sqrt(2))

// Get input from user: brightest rgb, darkest rgb, and perfect rgb. 


pub fn filter_edit_data(all_xmp_data: Vec<Vec<String>>) -> Vec<Vec<String>> {
    // List of the necessary imgs settings that is needed to manipulate it.
    // Stored with [data_name, data_value, line nr in .xmp file]. 
    let mut necessary: Vec<Vec<String>> = vec![];

    // List of all names for the img-settings that will be added to necessary Vec. 
    let id: [&str; 33] = ["   crs:Exposure2012", "   crs:Contrast2012", "   crs:Highlights2012", "   crs:Shadows2012", "   crs:Whites2012",
                        "   crs:Blacks2012", "   crs:Clarity2012", "   crs:DefringePurpleAmount", "   crs:DefringePurpleHueLo", 
                        "   crs:DefringePurpleHueHi", "   crs:DefringeGreenAmount", "   crs:DefringeGreenHueLo", "   crs:DefringeGreenHueHi",
                        "   crs:Temperature", "   crs:Tint", "   crs:Saturation", "   crs:HueAdjustmentRed", "   crs:HueAdjustmentOrange",
                        "   crs:HueAdjustmentYellow", "   crs:HueAdjustmentGreen", "   crs:HueAdjustmentAqua", "   crs:HueAdjustmentBlue",
                        "   crs:HueAdjustmentPurple", "   crs:HueAdjustmentMagenta", "   crs:Vibrance", "    crs:SaturationAdjustmentRed",
                        "   crs:SaturationAdjustmentOrange", "   crs:SaturationAdjustmentYellow", "   crs:SaturationAdjustmentGreen",
                        "   crs:SaturationAdjustmentAqua", "   crs:SaturationAdjustmentBlue", "   crs:SaturationAdjustmentPurple", 
                        "   crs:SaturationAdjustmentMagenta"];
    
// maybe add these
    //    crs:LuminanceAdjustmentRed="0"
    //    crs:LuminanceAdjustmentOrange="0"
    //    crs:LuminanceAdjustmentYellow="0"
    //    crs:LuminanceAdjustmentGreen="0"
    //    crs:LuminanceAdjustmentAqua="0"
    //    crs:LuminanceAdjustmentBlue="0"
    //    crs:LuminanceAdjustmentPurple="0"
    //    crs:LuminanceAdjustmentMagenta="0"
    
    let mut intresting_data: Vec<String> = vec![];
    for i in 0..id.len(){
        intresting_data.push(String::from(id[i]));
    }

    for i in 0..all_xmp_data.len(){
        if intresting_data.contains(&all_xmp_data[i][0].to_string()) {
            let nec_data: Vec<String> = vec![all_xmp_data[i][0].to_string(), all_xmp_data[i][1].to_string(), (i+1).to_string()];
            necessary.push(nec_data);
        }
    }
    
    necessary
}

pub fn filter_img_info(all_xmp_data: Vec<Vec<String>>) -> Vec<Vec<String>> {
    // List of brightness, tone, and other raw data from shot. 
    // Used to calculate how much exposure, contrast and other settings that needs to be added or subtracted. 
    let mut img_info: Vec<Vec<String>> = vec![];
    let id: [String; 3] = ["   exif:ExposureTime".to_string(), "   exif:ShutterSpeedValue".to_string(), "   <exif:ISOSpeedRatings>".to_string()];

    for i in 0..all_xmp_data.len(){
        if id.contains(&all_xmp_data[i][0].to_string()) {
            if all_xmp_data[i][0] == "   <exif:ISOSpeedRatings>".to_string() {
                let new_img_info: Vec<String> = vec!["ISO".to_string(), all_xmp_data[i+2][0].to_string(), (i+3).to_string()];
                img_info.push(new_img_info);
            }
            else {
                let new_img_info: Vec<String> = vec![all_xmp_data[i][0].to_string(), all_xmp_data[i][1].to_string(), (i+3).to_string()];
                img_info.push(new_img_info);
            }
        }
    }

    img_info
}