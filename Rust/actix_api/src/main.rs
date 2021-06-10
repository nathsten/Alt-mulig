use actix_web::{get, web, App, Error, HttpServer, HttpRequest, HttpResponse, Responder, Result};
use actix_web::http::{StatusCode};
use actix_web::http::header::{ContentDisposition, DispositionType};
use actix_files as fs;

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

// fix this
#[get("/{filename:.*}")]
async fn index(req: HttpRequest) -> Result<fs::NamedFile, Error> {
    let path: std::path::PathBuf = req.match_info().query("../public").parse().unwrap();
    let file = fs::NamedFile::open(path)?;
    Ok(file
        .use_last_modified(true)
        .set_content_disposition(ContentDisposition {
            disposition: DispositionType::Attachment,
            parameters: vec![],
        }))
}

async fn with_param(req: HttpRequest, web::Path((name,)): web::Path<(String,)>,) -> HttpResponse {
    println!("{:?}", req);

    HttpResponse::Ok()
        .content_type("text/plain")
        .body(format!("Hello {}!", name))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
        .service(index)
        .service(home)
        .service(web::resource("user/{name}").route(web::get().to(with_param)))
        // static folder.
        // .service(fs::Files::new("../public", "static").show_files_listing())
        )
        .bind("127.0.0.1:8080")?
        .run()
        .await
}