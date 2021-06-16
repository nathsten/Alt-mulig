use actix_web::{get, web, App, HttpServer, HttpRequest, HttpResponse, Responder, Result};
use actix_web::http::{StatusCode};
use tokio_postgres::NoTls;
use dotenv::dotenv;
use deadpool_postgres;
use deadpool_postgres::{Client};
use serde::{Deserialize, Serialize};
use config::{ConfigError};
use tokio_pg_mapper::{FromTokioPostgresRow};
use tokio_pg_mapper_derive::PostgresMapper;

#[get("/")]
async fn home() -> Result<HttpResponse> {
    Ok(HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../public/index.html")))
}

#[get("/newUser/{username}/{pwd}")]
async fn new_user(web::Path((username, pwd)): web::Path<(String, String)>) -> impl Responder {
    format!("username: {}, password: {}", username, pwd)
}

async fn with_param(req: HttpRequest, web::Path((name,)): web::Path<(String,)>,) -> HttpResponse {
    println!("{:?}", req);

    HttpResponse::Ok()
        .content_type("text/plain")
        .body(format!("Hello {}!", name))
}

#[derive(Deserialize)]
struct ServerConfig{
    pub host: String,
    pub port: i32
}

#[derive(Deserialize)]
struct Config{
    pub server: ServerConfig,
    pub pg: deadpool_postgres::Config 
}

impl Config{
    pub fn from_env() -> Result<Self, ConfigError>{
        let mut cfg = config::Config::new();
        cfg.merge(config::Environment::new())?;
        cfg.try_into()
    }
}

#[derive(Serialize, serde::Deserialize, PostgresMapper)]
#[pg_mapper(table = "todos")]
struct Todo{
    pub id: i32,
    pub name: String,
    pub checked: bool
}

/**
  thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: missing field `pg`', src/main.rs:46:35
  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
  Panic in Arbiter thread.
*/


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    
    dotenv().ok();

    let cnfg = Config::from_env().unwrap();

    let pool = cnfg.pg.create_pool(NoTls).unwrap();

    let client: Client = pool.get().await.expect("No db");

    let state = client.prepare("SELECT * FROM todos;").await.unwrap();
    let todos = client.query(&state, &[]).await.expect("No todos");
    // .collect::<Vec<Todo>>();
    println!("{:?}", todos);

    HttpServer::new(||App::new()
        .service(home)
        .service(web::resource("user/{name}").route(web::get().to(with_param)))
        // static folder.
        // .service(fs::Files::new("../public", "static").show_files_listing())
        )
        .bind(format!("{}:{}", cnfg.server.host, cnfg.server.port))?
        .run()
        .await
}