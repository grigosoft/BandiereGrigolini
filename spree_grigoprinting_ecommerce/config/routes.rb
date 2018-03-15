Spree::Core::Engine.add_routes do
  # Add your extension routes here
  post "/price_flag" => "price#calcola_bandiera" , as: "calcola_bandiera"

  resources :uploads

  # pagine statiche
  get "home" => "static#home"
  get "contatti" => "static#contatti"
  get "fedelta" => "static#fedelta"
  get "home" => "static#home"
  get "privacy" => "static#privacy"
  get "tec" => "static#tec"

end
