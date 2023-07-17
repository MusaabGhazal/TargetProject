package server

import (
	"log"
	"net/http"

	"example/test/models"

	"github.com/gin-gonic/gin"

	stripe "github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/price"
	"github.com/stripe/stripe-go/v74/product"
)

func (s *Server) BookingDatesGet(ctx *gin.Context) {
	bookingDates := []*models.BookingDates{}

	ret := s.DB.Find(&bookingDates)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, bookingDates)
}

func (s *Server) BookingDatesAdd(ctx *gin.Context) {

	var booking_dates models.BookingDates
	err := ctx.BindJSON(&booking_dates)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	stripe.Key = "sk_test_51NRC1TJGJmuvZtnTtz2jOyiJzjIxIDltIAXkiKeYB9JxQW787Fl6tmE3d4sO5QwqdGaD6xQhmUJm4DiGD3TAz0lQ00vwB2n8u0"

	params := &stripe.ProductParams{
		Name: stripe.String("A prodcut at:" + booking_dates.BookingDate.String()),
	}
	p, _ := product.New(params)

	paramsP := &stripe.PriceParams{
		Currency:   stripe.String(string(stripe.CurrencyUSD)),
		Product:    stripe.String(p.ID),
		UnitAmount: stripe.Int64(int64(booking_dates.Price) * 100),
	}
	pP, _ := price.New(paramsP)

	booking_dates.ProdId = pP.ID
	r := s.DB.Create(&booking_dates)
	if r.Error != nil {
		log.Fatal(r.Error)
	}

	s.DB.Save(&booking_dates)

	ctx.JSON(http.StatusOK, &booking_dates)
}

func (s *Server) BookingDatesGetById(ctx *gin.Context) {
	var bookingDates models.BookingDates
	id := ctx.Param("id")

	ret := s.DB.First(&bookingDates, "id = ?", id)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, bookingDates)
}

func (s *Server) BookingDatesGetAvailable(ctx *gin.Context) {

	bookingDates := []*models.BookingDates{}

	// Modify the query to select records where is_picked is false
	ret := s.DB.Where("is_picked = ?", false).Find(&bookingDates)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, bookingDates)
}

func (s *Server) BookingDatesGetPicked(ctx *gin.Context) {
	bookingDates := []*models.BookingDates{}

	// Modify the query to select records where is_picked is false
	ret := s.DB.Where("is_picked = ?", true).Find(&bookingDates)

	if ret.RowsAffected == 0 {
		ctx.JSON(http.StatusNoContent, bookingDates)
		//ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, bookingDates)
}

func (s *Server) BookingDatesDelete(ctx *gin.Context) {
	id := ctx.Param("id")

	// Check if the ID is valid
	if id == "" {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// Delete the booking date from the database
	ret := s.DB.Delete(&models.BookingDates{}, id)
	if ret.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, ret.Error)
		return
	}

	// Check if the booking date was found and deleted
	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	ctx.Status(http.StatusNoContent)
}

func (s *Server) BookingDatesPutNotPicked(ctx *gin.Context) {
	id := ctx.Param("id")

	// Check if the ID is valid
	if id == "" {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// Retrieve the booking date from the database
	bookingDate := &models.BookingDates{}
	ret := s.DB.First(bookingDate, id)
	if ret.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, ret.Error)
		return
	}

	// Check if the booking date was found
	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	// Update the is_picked field to false
	bookingDate.IsPicked = false

	// Save the updated booking date back to the database
	ret = s.DB.Save(bookingDate)
	if ret.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, ret.Error)
		return
	}

	ctx.Status(http.StatusNoContent)
}

func (s *Server) BookingDatesPutIsPicked(ctx *gin.Context) {
	id := ctx.Param("id")

	// Check if the ID is valid
	if id == "" {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// Retrieve the booking date from the database
	bookingDate := &models.BookingDates{}
	ret := s.DB.First(bookingDate, id)
	if ret.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, ret.Error)
		return
	}

	// Check if the booking date was found
	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	// Update the is_picked field to false
	bookingDate.IsPicked = true

	// Save the updated booking date back to the database
	ret = s.DB.Save(bookingDate)
	if ret.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, ret.Error)
		return
	}

	ctx.Status(http.StatusNoContent)
}

func (s *Server) BookingDatesGetByUserID(ctx *gin.Context) {
	userID := ctx.Param("user_id")
	bookingDates := []*models.BookingDates{}

	// Modify the query to select records where user_id matches
	ret := s.DB.Where("user_id = ? AND is_picked = ?", userID, true).Find(&bookingDates)

	if ret.RowsAffected == 0 {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	if ret.Error != nil {
		ctx.AbortWithError(http.StatusBadRequest, ret.Error)
		return
	}

	ctx.JSON(http.StatusOK, bookingDates)
}
