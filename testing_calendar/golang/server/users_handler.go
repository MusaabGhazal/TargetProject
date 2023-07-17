package server

import (
	"log"
	"net/http"

	"example/test/models"
	"example/test/token"

	"github.com/gin-gonic/gin"
)

func (s *Server) HandleAddUser(ctx *gin.Context) {
	var user models.User

	err := ctx.BindJSON(&user)

	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	role := "USER"
	user.Role = &role

	r := s.DB.Create(&user)

	if r.Error != nil {
		log.Fatal(r.Error)
	}

	s.DB.Save(&user)

	ctx.JSON(http.StatusOK, &user)
}

func (s *Server) HandleGetByID(ctx *gin.Context) {
	var user models.User
	id := ctx.Param("id")

	ret := s.DB.First(&user, "id = ?", id)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func (s *Server) HandleLoginUser(ctx *gin.Context) {
	var loginData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	err := ctx.BindJSON(&loginData)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// Check if the username and password match a user in the database
	var user models.User
	result := s.DB.Where("username = ?", loginData.Username).First(&user)
	if result.Error != nil {
		ctx.AbortWithError(http.StatusUnauthorized, result.Error)
		return
	}

	// Validate the password
	if user.Pass == nil || *user.Pass != loginData.Password {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	token, err := token.GenerateToken(uint(user.Id))

	if err != nil {
		ctx.AbortWithError(http.StatusUnauthorized, result.Error)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token,
		"message": "Login successful",
		"id":      user.Id,
		"role":    *user.Role})
}

func (s *Server) HandleGet(ctx *gin.Context) {

	user_id, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	print(user_id)

	users := &[]models.User{}

	ret := s.DB.Find(users)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, users)
}
