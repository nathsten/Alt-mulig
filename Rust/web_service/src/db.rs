use crate::mods::{Todo};
use deadpool_postgres::Client;
use tokio_pg_mapper::FromTokioPostgresRow;
use std::io;

pub async fn get_todos(client: &Client) -> Result<Vec<Todo>, io::Error> {
    let statement = client.prepare("SELECT * FROM todos").await.unwrap();

    let todos = client.query(&statement, &[])
    .await
    .expect("Error getting todos")
    .iter()
    .map(|row| Todo::from_row_ref(row).unwrap())
    .collect::<Vec<Todo>>();

    Ok(todos )
}

// pub async fn get_items(client: &Client, list_id: i32) -> Vec<Todo>, io::Error{
//     let statement = client.prepare("SELECT * FROM todos where list_id = $1 order by id").await.unwrap();

//     let item = client.query(&statement, &[list_id])
//     .await
//     .expect("Error getting todos")
//     .iter()
//     .map(|row| Todo::from_row_ref(row).unwrap())
//     .collect::<Vec<Todo>>();

//     Ok(item )
// }