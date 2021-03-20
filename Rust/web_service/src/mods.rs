// Importing actix_web libraries. 
use actix_web::{Responder, HttpResponse, Result};
use actix_web::http::{StatusCode};

pub async fn say_hello() -> impl Responder{
    return "{\"Saying:\": \"Hello!!\"}";
}

pub async fn welcome() -> Result<HttpResponse>{
    Ok(HttpResponse::build(StatusCode::OK)
    .content_type("text/html; charset=utf-8")
    .body(include_str!("../public/index.html")))
}

// Sending JSON data to client
pub async fn send_data() -> impl Responder{
    "{\"todo1:\": \"Work on this\",\"todo2:\": \"Make it better\",\"todo3:\": \"Become a pro\"}"
}