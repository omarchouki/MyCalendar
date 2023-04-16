from database import db

class Reservation(db.Model):
  """
  table reservation
  """ 
  id = db.Column('reservation_id', db.Integer, primary_key=True)
  date = db.Column(db.Date())
  start_time = db.Column(db.String(5))
  end_time = db.Column(db.String(5))
  description = db.Column(db.String(300))
  email = db.Column(db.String(50))
  pin = db.Column(db.String(7))

  def __init__(self, date, start_time, end_time, description, email, pin):
    self.date = date
    self.start_time = start_time
    self.end_time = end_time
    self.description = description
    self.email = email
    self.pin = pin
