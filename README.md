
## Instalation 
To get started, follow these steps:
`git clone https://github.com/fozuzip/booking-utilities.git`

### To start the server: (by default running on port 8000)

1. `cd ./booking-api`

2. Create a `.env` file and copy-paste the contents of  .env.example
```
PUSHER_APP_ID  =
PUSHER_KEY  =
PUSHER_SECRET  =
PUSHER_CLUSTER  =
```
3. `npm install`
4. `npm run dev`  

### To start the dashboard: (by default running on port 3000)

1. `cd ./booking-dashboard`
2.  Create a `.env` file and copy-paste the contents of  .env.example
```
VITE_PUSHER_KEY  =
VITE_PUSHER_CLUSTER  =
```
3. `npm install`
4. `npm run dev`

### To start the widget: (by default running on port 4000)

1. `cd ./booking-widget`
2. `npm install`
3. `npm run dev`

### How to see real-time notifications
* Open 2 different tabs one on `http://localhost:3000/` (dashboard) and one on `http://localhost:4000/`(widget)

* Make a booking using the widget
* Watch the notification pop-up in the dashboard

### How to clear all bookings
Inside `./booking-api` :
* Stop the server from running  
* delete the `db.json` file
* Restart the server