package models

type User struct {
	Id       int     `gorm:"primary key;autoIncrement" json:"id"`
	Username *string `json:"username"`
	Pass     *string `json:"pass"`
	Role     *string `json:"role"`
}
