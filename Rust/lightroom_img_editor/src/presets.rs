use std::io;

pub fn select_preset(xmp_data_exposure_fix: Vec<Vec<String>>) -> Vec<Vec<String>>{
    println!("a) teal \t b) summer \t c) winter \t d) autumn\n");
    let mut preset = String::new();
    io::stdin().read_line(&mut preset).expect("error with preset input");

    if preset == "a".to_string(){
        return teal(xmp_data_exposure_fix);
    }
    else if preset == "b".to_string(){
        return summer(xmp_data_exposure_fix);
    }
    else if preset == "c".to_string(){
        return winter(xmp_data_exposure_fix);
    }
    else if preset == "b".to_string(){
        return autumn(xmp_data_exposure_fix);
    }

    xmp_data_exposure_fix
}

pub fn teal(xmp_data_exposure_fix: Vec<Vec<String>>) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}

pub fn summer(xmp_data_exposure_fix: Vec<Vec<String>>) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}

pub fn winter(xmp_data_exposure_fix: Vec<Vec<String>>) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}

pub fn autumn(xmp_data_exposure_fix: Vec<Vec<String>>) -> Vec<Vec<String>>{


    xmp_data_exposure_fix
}