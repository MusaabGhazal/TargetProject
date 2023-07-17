package middlewares

import (
	"net/http"

	"example/test/token"

	"github.com/gin-gonic/gin"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := token.TokenValid(c)
		if err != nil {
			c.String(http.StatusUnauthorized, "Unauthorized mate")
			c.Abort()
			return
		}
		c.Next()
	}
}
