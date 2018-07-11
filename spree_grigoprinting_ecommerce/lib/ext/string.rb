class String
  def to_bool
    self == 't' || self == 'true' || self == 0
  end
end
