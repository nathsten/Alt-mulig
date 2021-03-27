use std::fs;
use std::io;

pub fn update_metadata(
    all_metadata: Vec<Vec<String>>, 
    updated_metadata: Vec<Vec<String>>,
    file_name: String) -> io::Result<()> {

    // All the new xmp data that will be written to the file. 
    let mut new_xmp = String::new();

    // Mannually adding the first line. 
    let label = all_metadata[0][0].to_string();
    let data1 = all_metadata[0][1].to_string();
    let data2 = all_metadata[0][2].to_string();
    new_xmp.push_str(&label);
    new_xmp.push('=');
    new_xmp.push_str(&data1);
    new_xmp.push('=');
    new_xmp.push_str(&data2);
    new_xmp.push('\n');

    let mut i: usize = 1;
    while i < all_metadata.len(){
        let mut line: usize = 0;
        let mut j: usize = 0;

        // Checks if the current line is a line that has been edited.
        while j < updated_metadata.len(){
            // Line nr in each adjusted metadata. 
            line = (updated_metadata[j][2]).replace("\"", "").parse::<usize>().unwrap();
            if (i+1) == line{
                let label = updated_metadata[j][0].to_string();
                let data = updated_metadata[j][1].to_string();
                new_xmp.push_str(&label);
                new_xmp.push('=');
                new_xmp.push_str(&data);
                new_xmp.push('\n');
                break;
            }
            j += 1;
        }
        if (i+1) != line{
            if all_metadata[i].len() > 1{
                let label = all_metadata[i][0].to_string();
                let data = all_metadata[i][1].to_string();
                new_xmp.push_str(&label);
                new_xmp.push('=');
                new_xmp.push_str(&data);
                new_xmp.push('\n');
            }
            else {
                let data = all_metadata[i][0].to_string();
                new_xmp.push_str(&data);
                new_xmp.push('\n');
            }
        }
        i += 1;
    }

    // fs::write("metadata/test.xmp", new_xmp)?;
    fs::write(file_name, new_xmp)?;
    Ok(())
}