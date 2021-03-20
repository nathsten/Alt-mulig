use actix_web::{HttpServer, App, web, Responder};
use std::io;
mod mods;

async fn status() -> impl Responder{
    "{\"status\": \"I'm alive!!\"}"
}

#[actix_rt::main]
async fn main() -> io::Result<()>{
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(status))
            .route("/hello",web::get().to(mods::say_hello))
            .route("/welcome", web::get().to(mods::welcome))
            .route("/getData", web::get().to(mods::send_data))
    })
    .bind("127.0.0.1:5000")?
    .run()
    .await
}
