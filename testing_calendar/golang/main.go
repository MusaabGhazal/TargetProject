package main

import (
	"log"
	"os"

	"example/test/server"
	"example/test/storage"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	//"github.com/stripe/stripe-go/v74"
)

func main() {

	//stripe code
	//stripe.Key = "sk_test_51NRC1TJGJmuvZtnTtz2jOyiJzjIxIDltIAXkiKeYB9JxQW787Fl6tmE3d4sO5QwqdGaD6xQhmUJm4DiGD3TAz0lQ00vwB2n8u0"

	err := godotenv.Load()

	if err != nil {
		log.Fatal(err)
	}

	srv := server.Server{}
	dsn := os.Getenv("DB_DSN")

	db := storage.InitDb(dsn)

	srv.DB = db

	srv.InitGin()

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowHeaders = []string{"Authorization", "Content-Type"}
	//config.AllowAllOrigins = true
	config.AllowOrigins = []string{"*", "localhost:3000/*"}
	r.Use(cors.New(config))

	srv.RegisterRoutes(r)

	srv.Start(":8050", r)

}
