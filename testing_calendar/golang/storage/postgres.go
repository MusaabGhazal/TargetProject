package storage

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDb(dsn string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Fatal(err)
	}

	return db
}
