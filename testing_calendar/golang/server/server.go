package server

import (
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	DB  *gorm.DB
	Gin *gin.Engine
}

func (s *Server) Start(ep string, r *gin.Engine) error {
	if !s.Ready() {
		return errors.New("server isn't ready - make sure to init db and gin")
	}

	if err := http.ListenAndServe(ep, r); err != nil {
		log.Fatal(err, "musaab")
	}

	return nil
}

func (s *Server) InitGin() *Server {
	g := gin.Default()
	s.Gin = g

	return s
}

func (s *Server) Ready() bool {
	return s.DB != nil && s.Gin != nil
}
