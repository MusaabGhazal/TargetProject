package server

import (
	"log"
	"net/http"

	"example/test/models"

	"github.com/gin-gonic/gin"
)

func (s *Server) BookingsGet(ctx *gin.Context) {

	var result []struct {
		models.Bookings
		models.BookingDatesUnCommon
	}
	ret := s.DB.
		Table("bookings").
		Select("bookings.*, booking_dates.*").
		Joins("JOIN booking_dates ON bookings.booking_date_id = booking_dates.id").
		Find(&result)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, result)
}

func (s *Server) BookingsAdd(ctx *gin.Context) {
	var bookings models.Bookings

	err := ctx.BindJSON(&bookings)

	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	bookings.IsConfirmed = false
	//bookings.IsPaid = false
	bookings.IsCancelled = false

	r := s.DB.Create(&bookings)

	if r.Error != nil {
		log.Fatal(r.Error)
	}

	s.DB.Save(&bookings)

	ctx.JSON(http.StatusOK, &bookings)
}

func (s *Server) BookingsGetById(ctx *gin.Context) {
	userID := ctx.Param("user_id")
	bookings := []*models.Bookings{}

	ret := s.DB.Where("user_id = ?", userID).Find(&bookings)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, bookings)
}

func (s *Server) BookingsDelete(ctx *gin.Context) {
	bookingID := ctx.Param("id")

	// Check if the booking ID is valid
	if bookingID == "" {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// Delete the booking from the database based on the BookingDateID foreign key
	ret := s.DB.Where("booking_date_id = ?", bookingID).Delete(&models.Bookings{})
	if ret.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, ret.Error)
		return
	}

	// Check if the booking was found and deleted
	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	ctx.Status(http.StatusNoContent)
}
