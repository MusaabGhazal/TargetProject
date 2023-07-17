package models

import "time"

//Edit number 1: change the date here somehow so that it is accepted

type BookingDates struct {
	Id            int       `gorm:"primary key;autoIncrement" json:"id"`
	ProdId        string    `gorm:"primary key" json:"prod_id"`
	BookingDate   time.Time `json:"booking_date"`
	Price         float32   `json:"price"`
	ShouldConfirm bool      `json:"should_confirm"`
	ShouldPay     bool      `json:"should_pay"`
	IsPicked      bool      `json:"is_picked"`
	UserId        int       `json:"user_id"`
}

type BookingDatesUnCommon struct {
	BookingDate   time.Time `json:"booking_date"`
	Price         float32   `json:"price"`
	ShouldConfirm bool      `json:"should_confirm"`
	ShouldPay     bool      `json:"should_pay"`
	IsPicked      bool      `json:"is_picked"`
}
