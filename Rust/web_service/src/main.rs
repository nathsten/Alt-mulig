use actix_web::{HttpServer, App, web, Responder};
use std::io;
use dotenv::dotenv;
mod mods;
mod config;

async fn status() -> impl Responder{
    web::HttpResponse::Ok()
        .json(mods::Status{ status: "I'm Alive!".to_string() })
}

#[actix_rt::main]
async fn main() -> io::Result<()>{

    dotenv().ok();

    let cnfg = crate::config::Config::from_env().unwrap();

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(status))
            .route("/hello",web::get().to(mods::say_hello))
            .route("/welcome", web::get().to(mods::welcome))
            .route("/getData", web::get().to(mods::send_data))
    })
    .bind(format!("{}:{}", cnfg.server.host, cnfg.server.port))?
    .run()
    .await
}
