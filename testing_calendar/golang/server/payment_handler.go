package server

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	stripe "github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/checkout/session"
)

func (s *Server) HandlePayments(ctx *gin.Context) {

	prodId := ctx.Query("prod_id")

	if prodId == "" {
		ctx.JSON(http.StatusBadRequest, prodId)
	}

	stripe.Key = "sk_test_51NRC1TJGJmuvZtnTtz2jOyiJzjIxIDltIAXkiKeYB9JxQW787Fl6tmE3d4sO5QwqdGaD6xQhmUJm4DiGD3TAz0lQ00vwB2n8u0"

	domain := "http://localhost:3000"

	params := &stripe.CheckoutSessionParams{
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			//&stripe.CheckoutSessionLineItemParams
			{
				Price:    &prodId,
				Quantity: stripe.Int64(1),
			},
		},
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String(domain + "/html/success.html"),
		CancelURL:  stripe.String(domain + "/cancel.html"),
	}

	session, err := session.New(params)

	if err != nil {
		log.Printf("session.New: %v", err)
		ctx.JSON(http.StatusBadRequest, err)
	}

	ctx.JSON(200, gin.H{
		"url": session.URL,
	})
}
