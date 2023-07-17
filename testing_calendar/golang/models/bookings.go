package models

type Bookings struct {
	Id            int  `gorm:"primary key;autoIncrement" json:"id"`
	BookingDateID int  `json:"booking_date_id"`
	UserId        int  `json:"user_id"`
	IsConfirmed   bool `json:"is_confirmed"`
	IsPaid        bool `json:"is_paid"`
	IsCancelled   bool `json:"is_cancelled"`
}
