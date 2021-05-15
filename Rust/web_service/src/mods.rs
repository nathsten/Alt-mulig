// Importing actix_web libraries. 
use actix_web::{Responder, HttpResponse, Result, web};
use actix_web::http::{StatusCode};
use serde::Serialize;
use tokio_pg_mapper_derive::PostgresMapper;

use deadpool_postgres::{Client, Pool};
use crate::db;

#[derive(Serialize)]
pub struct Status {
    pub status: String
}

pub async fn say_hello() -> impl Responder{
    return "{\"Saying:\": \"Hello!!\"}";
}

pub async fn welcome() -> Result<HttpResponse>{
    Ok(HttpResponse::build(StatusCode::OK)
    .content_type("text/html; charset=utf-8")
    .body(include_str!("../public/index.html")))
}

#[derive(Serialize)]
pub struct Todos {
    pub todos: Vec<String>
}

impl Todos{
    fn construct_todos(t: Vec<&str>) -> Todos {
        // Just to test out &str vs String vector
        let mut news: Vec<String> = vec![];
        for t in t.iter(){
            news.push(t.to_string());
        }
        Todos{
            todos: news
        }
    } 
} 

// Sending JSON data to client
pub async fn send_data() -> impl Responder{
    let todos: Vec<&str> = vec!["Work on this", "Make it better", "Become a pro!"];
    let list = Todos::construct_todos(todos);
    return web::HttpResponse::Ok()
        .json(list);
}

#[derive(Serialize, serde::Deserialize, PostgresMapper)]
#[pg_mapper(table = "todos")]
pub struct Todo{
    pub id: i32,
    pub name: String,
    pub checked: bool
}

pub async fn get_todos(db_pool: web::Data<Pool>) -> impl Responder{
    let client: Client = 
        db_pool.get().await.expect("no get todods...");

    let result = db::get_todos(&client).await;

    match result{
        Ok(todos) => HttpResponse::Ok().json(todos),
        Err(_) => HttpResponse::InternalServerError().into()
    }

}