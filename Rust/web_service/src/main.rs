use actix_web::{HttpServer, App, web, Responder};
use std::io;
use dotenv::dotenv;
use tokio_postgres::NoTls;
mod mods;
mod config;
mod db;

async fn status() -> impl Responder{
    web::HttpResponse::Ok()
        .json(mods::Status{ status: "I'm Alive!".to_string() })
}

#[actix_rt::main]
async fn main() -> io::Result<()>{

    dotenv().ok();

    let cnfg = crate::config::Config::from_env().unwrap();

    let pool = cnfg.pg.create_pool(NoTls).unwrap();

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .route("/", web::get().to(status))
            .route("/hello",web::get().to(mods::say_hello))
            .route("/welcome", web::get().to(mods::welcome))
            .route("/getData", web::get().to(mods::send_data))
            .route("/todos{_:/?}", web::get().to(mods::get_todos))
    })
    .bind(format!("{}:{}", cnfg.server.host, cnfg.server.port))?
    .run()
    .await
}
