package server

import (
	"example/test/middlewares"

	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes(r *gin.Engine) {

	r.POST("/login", s.HandleLoginUser)

	protected := r.Group("/api")
	protected.Use(middlewares.JwtAuthMiddleware())

	protected.GET("/users", s.HandleGet)
	protected.GET("/users/:id", s.HandleGetByID)
	protected.POST("/users", s.HandleAddUser)

	protected.GET("/booking_dates", s.BookingDatesGet)
	protected.GET("/booking_dates/:id", s.BookingDatesGetById)
	protected.GET("/booking_dates_available", s.BookingDatesGetAvailable)
	protected.GET("/booking_dates_picked", s.BookingDatesGetPicked)
	protected.GET("/booking_dates/user/:user_id", s.BookingDatesGetByUserID)
	protected.POST("/booking_dates", s.BookingDatesAdd)
	protected.DELETE("/booking_dates/:id", s.BookingDatesDelete)
	protected.PUT("/booking_dates/:id", s.BookingDatesPutNotPicked)
	protected.PUT("/booking_dates/pick/:id", s.BookingDatesPutIsPicked)

	protected.GET("/bookings", s.BookingsGet)
	protected.GET("/bookings/:user_id", s.BookingsGetById)
	protected.POST("/bookings", s.BookingsAdd)
	protected.DELETE("/bookings/:id", s.BookingsDelete)

	protected.GET("/payment", s.HandlePayments)
}
