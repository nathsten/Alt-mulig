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